import { NavLink, Outlet, useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieById } from '../../services/api';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const getMovieById = async () => {
            try {
                const movie = await fetchMovieById(movieId);
                setMovie(movie);
            } catch (error) {
                console.log(error);
            }
        };
        getMovieById();
    }, [movieId]);

    return (
        <div>
            <img
                className={styles.moviePoster}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <>{movie.title}</>
            <nav>
                <NavLink to='cast'>Cast</NavLink>
                <NavLink to='reviews'>Review</NavLink>
            </nav>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;
