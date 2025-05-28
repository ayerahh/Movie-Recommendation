import React, { createContext, useState, useContext } from "react";
import { Movie, Recommendation } from "../types";
import { fetchMovieRecommendations } from "../services/movieService";

interface MovieContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  recommendations: Recommendation[];
  isLoading: boolean;
  error: string | null;
  getRecommendations: (movieId: number) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (movieId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMovieRecommendations(movieId);
      setRecommendations(data);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        recommendations,
        isLoading,
        error,
        getRecommendations,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
