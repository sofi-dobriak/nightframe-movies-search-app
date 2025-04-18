import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { fetchMovieById } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import defaultImage from '../../assets/images/image-not-found.png';
import { IoMdArrowRoundBack } from 'react-icons/io';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const goBackRef = useRef(location.state ?? '/movies');
    console.log(location);

    useEffect(() => {
        const getMovieById = async () => {
            setIsLoading(true);
            try {
                const movie = await fetchMovieById(movieId);
                setMovie(movie);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getMovieById();
    }, [movieId]);

    return (
        <div>
            {isLoading && <Loader />}

            {!isLoading && (
                <>
                    <div className={styles.goBackLinkContainer}>
                        <Link to={goBackRef.current} className={styles.goBackLink}>
                            <IoMdArrowRoundBack />
                            Go back to movies
                        </Link>
                    </div>
                    <div className={styles.movieContainer}>
                        <img
                            className={styles.moviePoster}
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : defaultImage
                            }
                            alt={movie.title}
                        />
                        <div className={styles.movieTextContainer}>
                            <p className={styles.movieTitle}>
                                <span>Title</span>: {movie.title}
                            </p>

                            {movie.overview && (
                                <p className={styles.movieOverview}>
                                    <span>Overview</span>: {movie.overview}
                                </p>
                            )}

                            {!movie.overview && (
                                <p className={styles.movieOverview}>
                                    <span>Overview</span>: -
                                </p>
                            )}

                            <p className={styles.movieAverage}>
                                <span>Average vote:</span> {movie.vote_average}
                            </p>

                            {movie.genres && (
                                <p className={styles.movieGenres}>
                                    <span>Genres:</span>{' '}
                                    {movie.genres.map(genre => genre.name).join(', ')}
                                </p>
                            )}
                        </div>
                    </div>

                    <p className={styles.additionalTitle}>Additional information:</p>
                    <nav className={styles.additionalLinks}>
                        <NavLink to='cast' className={styles.castLink}>
                            Cast
                        </NavLink>
                        <NavLink to='reviews' className={styles.reviewLink}>
                            Review
                        </NavLink>
                    </nav>

                    <Outlet />
                </>
            )}
        </div>
    );
};

export default MovieDetailsPage;
