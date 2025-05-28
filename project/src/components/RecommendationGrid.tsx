import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Recommendation } from '../types';
import MovieCard from './MovieCard';
import MovieDetailModal from './MovieDetailModal';

interface RecommendationGridProps {
  recommendations: Recommendation[];
}

const RecommendationGrid: React.FC<RecommendationGridProps> = ({ recommendations }) => {
  const { theme } = useTheme();
  const [selectedMovie, setSelectedMovie] = useState<Recommendation | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const handleShowMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 8, recommendations.length));
  };

  const handleOpenDetail = (movie: Recommendation) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {recommendations.slice(0, visibleCount).map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={() => handleOpenDetail(movie)}
          />
        ))}
      </div>

      {visibleCount < recommendations.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Load More
          </button>
        </div>
      )}

      {selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default RecommendationGrid;