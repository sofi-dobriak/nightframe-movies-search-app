import { useEffect, useState } from 'react';
import { fetchTrandMovies } from '../../services/api';
import MoviesList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import MoviesListTitle from '../../components/MoviesListTitle/MoviesListTitle';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import Loader from '../../components/Loader/Loader';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isVisibleMovies, setIsVisibleMovies] = useState(false);

    useEffect(() => {
        const getTrandingMovies = async () => {
            try {
                setIsLoading(true);

                const { results, total_pages, total_results } = await fetchTrandMovies(page);

                if (!results || results.length === 0 || total_results === 0) {
                    return setIsEmpty(true);
                }

                if (page === 1) {
                    setMovies(results);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...results]);
                }

                setIsVisibleMovies(page < total_pages);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getTrandingMovies();
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <MoviesListTitle />
            {error && <p>Someting went wrong</p>}
            <MoviesList movies={movies} />
            {isLoading && <Loader />}
            {!isEmpty && isVisibleMovies && !isLoading && (
                <LoadMoreButton handleLoadMore={handleLoadMore} />
            )}
        </>
    );
};

export default HomePage;
