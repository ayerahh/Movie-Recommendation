import React, { useState, useEffect, useRef } from 'react';
import { useMovies } from '../contexts/MovieContext';
import { useTheme } from '../contexts/ThemeContext';
import { Movie } from '../types';
import { searchMovies } from '../services/movieService';
import { Search, X } from 'lucide-react';

const MovieSearch: React.FC = () => {
  const { setSelectedMovie, getRecommendations } = useMovies();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add click outside handler
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchMovies(searchTerm);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);
    
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchTerm(movie.title);
    setShowResults(false);
    getRecommendations(movie.id);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className={`flex items-center rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } px-4 py-3 mb-2`}>
        <Search size={20} className="mr-3 opacity-50" />
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          className={`flex-1 outline-none ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
          aria-label="Search for a movie"
        />
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className={`absolute z-10 w-full rounded-lg shadow-xl overflow-hidden mt-1 max-h-96 overflow-y-auto ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {searchResults.map((movie) => (
            <div 
              key={movie.id}
              className={`px-4 py-3 cursor-pointer flex items-center hover:${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              } transition-colors duration-150`}
              onClick={() => handleSelectMovie(movie)}
            >
              <div className="w-12 h-16 flex-shrink-0 mr-3">
                {movie.posterPath ? (
                  <img 
                    src={movie.posterPath}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/48x64?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">{movie.title}</div>
                {movie.releaseDate && (
                  <div className="text-sm opacity-70">
                    {new Date(movie.releaseDate).getFullYear()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isSearching && (
        <div className="text-center py-2 text-sm opacity-70">Searching...</div>
      )}
      
      {showResults && searchTerm && searchResults.length === 0 && !isSearching && (
        <div className={`text-center py-3 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow mt-1`}>
          No movies found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default MovieSearch;