import streamlit as st
import pandas as pd
import requests
import pickle
import logging
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the processed data and similarity matrix
try:
    with open('movie_data.pkl', 'rb') as file:
        movies, cosine_sim = pickle.load(file)
    logger.info("Successfully loaded movie data")
except FileNotFoundError:
    logger.error("movie_data.pkl file not found!")
    raise
except Exception as e:
    logger.error(f"Error loading pickle file: {e}")
    raise

# Function to get movie recommendations
def get_recommendations(query, by_id=False, cosine_sim=cosine_sim):
    try:
        if by_id:
            idx = movies[movies['movie_id'] == int(query)].index[0]
        else:
            idx = movies[movies['title'] == query].index[0]
    except IndexError:
        logger.warning(f"Movie {'ID' if by_id else 'title'} not found: {query}")
        return []
    except ValueError:
        logger.warning(f"Invalid movie ID format: {query}")
        return []
    
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]  # Get top 10 similar movies
    movie_indices = [i[0] for i in sim_scores]
    return movies[['title', 'movie_id', 'overview']].iloc[movie_indices].to_dict('records')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

# API Routes
@app.route('/api/movies/search', methods=['GET'])
def search_movies():
    query = request.args.get('query', '')
    if not query:
        return jsonify([])
    
    matching_movies = movies[movies['title'].str.contains(query, case=False)]
    return jsonify(matching_movies[['movie_id', 'title']].to_dict('records'))

@app.route('/api/movies/recommendations', methods=['GET'])
def get_movie_recommendations():
    movie_id = request.args.get('id')
    title = request.args.get('title')
    
    if movie_id:
        recommendations = get_recommendations(movie_id, by_id=True)
    elif title:
        recommendations = get_recommendations(title, by_id=False)
    else:
        return jsonify({"error": "Either movie ID or title is required"}), 400
    
    return jsonify(recommendations)

@app.route('/api/movies/<int:movie_id>/poster', methods=['GET'])
def get_movie_poster(movie_id):
    api_key = os.getenv('TMDB_API_KEY')
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}'

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        poster_path = data.get('poster_path')
        if poster_path:
            poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}"
            return jsonify({"poster_url": poster_url})
        return jsonify({"poster_url": None})
    except requests.RequestException as e:
        logger.error(f"TMDB API error: {str(e)}")
        return jsonify({"error": "Failed to fetch movie poster"}), 500

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie_details(movie_id):
    try:
        movie = movies[movies['movie_id'] == movie_id].iloc[0]
        return jsonify({
            'movie_id': int(movie['movie_id']),
            'title': movie['title'],
            'overview': movie['overview']
        })
    except (IndexError, KeyError):
        return jsonify({"error": "Movie not found"}), 404

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', debug=True, port=port)

