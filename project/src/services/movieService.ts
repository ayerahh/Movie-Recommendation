import { Movie, Recommendation } from '../types';

const API_URL = 'http://localhost:5000/api';
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/movies/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Fetch poster for each search result
    const moviesWithPosters = await Promise.all(
      data.map(async (movie: any) => {
        try {
          const posterResponse = await fetch(`${API_URL}/movies/${movie.movie_id}/poster`);
          const posterData = await posterResponse.json();
          return {
            id: movie.movie_id,
            title: movie.title,
            posterPath: posterData.poster_url || null,
            releaseDate: null
          };
        } catch (error) {
          console.error(`Error fetching poster for movie ${movie.title}:`, error);
          return {
            id: movie.movie_id,
            title: movie.title,
            posterPath: null,
            releaseDate: null
          };
        }
      })
    );
    
    return moviesWithPosters;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieRecommendations = async (movieId: number): Promise<Recommendation[]> => {
  try {
    const response = await fetch(`${API_URL}/movies/recommendations?id=${movieId}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Fetch posters for each recommendation
    const recommendationsWithPosters = await Promise.all(
      data.map(async (movie: any) => {
        try {
          const posterResponse = await fetch(`${API_URL}/movies/${movie.movie_id}/poster`);
          const posterData = await posterResponse.json();
          
          return {
            id: movie.movie_id,
            title: movie.title,
            posterPath: posterData.poster_url || null,
            overview: movie.overview,
            releaseDate: null,
            voteAverage: null
          };
        } catch (error) {
          console.error(`Error fetching poster for movie ${movie.title}:`, error);
          return {
            id: movie.movie_id,
            title: movie.title,
            posterPath: null,
            overview: movie.overview,
            releaseDate: null,
            voteAverage: null
          };
        }
      })
    );
    
    return recommendationsWithPosters;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};