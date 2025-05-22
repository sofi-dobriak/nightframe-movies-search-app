import axios from 'axios';
import {
  CastRespose,
  MovieDetailsRespose,
  MovieListResponse,
  ReviewsResponse,
} from '../types/ApiResposeTypes';

const fetchMoviesData = async <T>(endpoint: string, params = {}): Promise<T> => {
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const ACCESS_KEY = import.meta.env.VITE_TMDb_KEY;

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_KEY}`,
    },
    params: { language: 'en-US', ...params },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchTrandMovies = (page: number): Promise<MovieListResponse> => {
  return fetchMoviesData('/trending/movie/day', { page });
};

export const fetchMoviesByKeyWords = (
  query: string,
  page: number = 1
): Promise<MovieListResponse> => {
  return fetchMoviesData('/search/movie', { query, page });
};

export const fetchMovieById = (movie_id: number): Promise<MovieDetailsRespose> => {
  return fetchMoviesData(`/movie/${movie_id}`);
};

export const fetchMovieCastById = (movie_id: number): Promise<CastRespose> => {
  return fetchMoviesData(`/movie/${movie_id}/credits`);
};

export const fetchMovieReviewsById = (movie_id: number): Promise<ReviewsResponse> => {
  return fetchMoviesData(`/movie/${movie_id}/reviews`);
};
