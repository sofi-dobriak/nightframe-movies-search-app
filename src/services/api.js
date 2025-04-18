import axios from 'axios';

const fetchMoviesData = async (endpoint, params = {}) => {
    const url = `https://api.themoviedb.org/3${endpoint}`;

    const options = {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWUwNDVhZWE0MjNiNjExZTliODA1YTE0NDk3NTc0NiIsIm5iZiI6MTc0NDIwNTMwNy40NjQsInN1YiI6IjY3ZjY3NWZiMWJjNjM5NTY2YWQ5MWE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mGWPQrZmQzRhD36GndZZ4ljLv9L6c7ko4MdnQ6dwB4E',
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

export const fetchTrandMovies = page => {
    return fetchMoviesData('/trending/movie/day', { page });
};

export const fetchMoviesByKeyWords = (query, page = 1) => {
    return fetchMoviesData('/search/movie', { query, page });
};

export const fetchMovieById = movie_id => {
    return fetchMoviesData(`/movie/${movie_id}`);
};

export const fetchMovieCastById = movie_id => {
    return fetchMoviesData(`/movie/${movie_id}/credits`);
};

export const fetchMovieReviewsById = movie_id => {
    return fetchMoviesData(`/movie/${movie_id}/reviews`);
};
