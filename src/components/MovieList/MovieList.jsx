import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import defaultImage from '../../assets/images/image-not-found.png';

const MovieList = ({ movies }) => {
    return (
        <ul className={styles.movieList}>
            {movies.map(movie => (
                <li key={movie.id} className={styles.movieItem}>
                    <Link to={`/movies/${movie.id}`}>
                        <img
                            className={styles.moviePoster}
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : defaultImage
                            }
                            alt={movie.title}
                        />
                        <p className={styles.movieTitle}>{movie.title}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
