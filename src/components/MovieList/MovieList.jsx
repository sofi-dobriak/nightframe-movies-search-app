import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    return (
        <ul className={styles.movieList}>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                        <img
                            className={styles.moviePoster}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <>{movie.title}</>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
