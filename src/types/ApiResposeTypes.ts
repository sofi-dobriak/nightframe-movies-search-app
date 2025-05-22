import { Movie, CastMember, Review } from './MovieType';

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type MovieDetailsRespose = Movie;

export interface CastRespose {
  id: number;
  cast: CastMember[];
}

export interface ReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}
