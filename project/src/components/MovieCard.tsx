import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Recommendation } from '../types';

interface MovieCardProps {
  movie: Recommendation;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="aspect-[2/3] relative bg-gray-200 dark:bg-gray-700">
        {movie.posterPath && !imageError ? (
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{movie.title}</h3>
        {movie.voteAverage && (
          <div className="text-sm opacity-75">
            Rating: {movie.voteAverage.toFixed(1)}/10
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;