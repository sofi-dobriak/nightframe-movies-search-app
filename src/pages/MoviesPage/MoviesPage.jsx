import { useState, useEffect } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import { fetchMoviesByKeyWords } from '../../services/api';
import MoviesList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [searchMovies, setSearchMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isVisibleMovies, setIsVisibleMovies] = useState(false);

    useEffect(() => {
        if (!query) return;

        const getMovie = async query => {
            setIsLoading(true);

            try {
                const { results, total_pages, total_results } = await fetchMoviesByKeyWords(
                    query,
                    page
                );

                if (!results || results.length === 0 || total_results === 0) {
                    return setIsEmpty(true);
                }

                if (page === 1) {
                    setSearchMovies(results);
                } else {
                    setSearchMovies(prev => [...prev, ...results]);
                }

                setIsVisibleMovies(page < total_pages);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getMovie(query);
    }, [query, page]);

    const handleSearchSubmit = newQuery => {
        setQuery(newQuery);
        setSearchMovies([]);
        setError(false);
        setIsEmpty(false);
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <>
            <SearchForm handleSearchSubmit={handleSearchSubmit} />
            {isLoading && <Loader />}
            {error && <p>Someting went wrong</p>}
            {isEmpty && !isLoading && <p>No movie with such title</p>}
            {searchMovies.length > 0 && <MoviesList movies={searchMovies} />}
            {!isEmpty && isVisibleMovies && !isLoading && (
                <LoadMoreButton handleLoadMore={handleLoadMore} />
            )}
        </>
    );
};

export default MoviesPage;
