import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    return (
        <ul className={styles.movieList}>
            {movies.map(movie => (
                <li key={movie.id}>
                    <a>
                        <img
                            className={styles.moviePoster}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <>{movie.title}</>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
