import { useEffect, useState } from 'react';
import { fetchTrandMovies } from '../../services/api';
import MoviesList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import MoviesListTitle from '../../components/MoviesListTitle/MoviesListTitle';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getTrandingMovies = async () => {
            try {
                setIsLoading(true);

                const response = await fetchTrandMovies();
                setMovies(response.results);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getTrandingMovies();
    }, []);

    return (
        <>
            <MoviesListTitle />
            {isLoading && <p>Loading....</p>}
            {error && <p>Someting went wrong</p>}
            <MoviesList movies={movies} />
        </>
    );
};

export default HomePage;
