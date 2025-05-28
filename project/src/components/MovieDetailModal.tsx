import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Recommendation } from '../types';
import { X, Calendar, Star, Clock, Tag } from 'lucide-react';

interface MovieDetailModalProps {
  movie: Recommendation;
  onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose }) => {
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      
      // Restore body scroll
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn">
      <div 
        ref={modalRef}
        className={`relative max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden animate-scaleIn ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-detail-title"
      >
        <button
          onClick={onClose}
          className={`absolute right-3 top-3 z-10 p-2 rounded-full ${
            theme === 'dark' ? 'bg-gray-900/70 text-white' : 'bg-white/70 text-gray-800'
          } hover:bg-opacity-100 transition-colors`}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 aspect-[2/3] bg-gray-300 dark:bg-gray-700 relative">
            {movie.posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Image';
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 p-6 overflow-y-auto max-h-[80vh] md:max-h-[600px]">
            <h2 id="movie-detail-title" className="text-2xl font-bold mb-2">{movie.title}</h2>
            
            <div className="flex flex-wrap gap-4 mb-6 mt-3">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span>{movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A'}</span>
              </div>
              {movie.releaseDate && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 opacity-70" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
              )}
              {movie.runtime && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 opacity-70" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex items-center">
                  <Tag size={16} className="mr-1 opacity-70" />
                  <span>{movie.genres.join(', ')}</span>
                </div>
              )}
            </div>
            
            {movie.overview && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="leading-relaxed opacity-90">{movie.overview}</p>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2 rounded-full transition-colors ${
                  theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                View on TMDB
              </a>
              <a
                href={`https://www.imdb.com/find/?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2 rounded-full transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                Find on IMDb
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;