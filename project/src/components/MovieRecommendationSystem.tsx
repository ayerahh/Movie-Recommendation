import React from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieSearch from './MovieSearch';
import RecommendationGrid from './RecommendationGrid';
import ErrorMessage from './common/ErrorMessage';
import LoadingSpinner from './common/LoadingSpinner';

const MovieRecommendationSystem: React.FC = () => {
  const { selectedMovie, recommendations, isLoading, error } = useMovies();

  return (
    <div className="space-y-8">
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Find Your Next Favorite Movie</h2>
        <p className="text-center mb-8 text-lg opacity-75">
          Discover personalized movie recommendations based on your preferences
        </p>
        <MovieSearch />
      </section>

      {selectedMovie && (
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">
            {recommendations.length > 0 
              ? `Because you like "${selectedMovie.title}"`
              : isLoading 
                ? "Finding recommendations..."
                : "Select a movie to get recommendations"}
          </h3>

          {isLoading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
          
          {!isLoading && !error && recommendations.length > 0 && (
            <RecommendationGrid recommendations={recommendations} />
          )}

          {!isLoading && !error && recommendations.length === 0 && selectedMovie && (
            <div className="text-center py-12">
              <p className="text-xl">No recommendations found for this movie.</p>
              <p className="mt-2 opacity-75">Try selecting a different movie.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default MovieRecommendationSystem;