import { useState, useEffect } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import { fetchMoviesByKeyWords } from '../../services/api';
import MoviesList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [searchMovies, setSearchMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    return (
        <>
            <SearchForm />
            {isLoading && <p>Loading....</p>}
            {error && <p>Someting went wrong</p>}
            {searchMovies.length > 0 && <MoviesList movies={searchMovies} />}
        </>
    );
};

export default MoviesPage;
