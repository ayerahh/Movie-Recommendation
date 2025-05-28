export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
}

export interface Recommendation extends Movie {
  voteAverage?: number;
  overview?: string;
  runtime?: number;
  genres?: string[];
}