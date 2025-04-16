import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MovieReviews.module.css';
import { fetchMovieReviewsById } from '../../services/api';
import Loader from '../../components/Loader/Loader';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMovieReviews = async () => {
            setIsLoading(true);
            try {
                const movieReviewsData = await fetchMovieReviewsById(movieId);
                setReviews(movieReviewsData.results);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getMovieReviews();
    }, [movieId]);

    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && (
                <>
                    <div className={styles.reviewsContainer}>
                        <ul className={styles.reviewsList}>
                            {reviews &&
                                reviews.map(item => (
                                    <li key={item.id} className={styles.reviewsItem}>
                                        <p className={styles.reviewsAuthor}>{item.author}</p>
                                        <p className={styles.reviewsText}>{item.content}</p>
                                    </li>
                                ))}
                        </ul>

                        {!isLoading && reviews.length === 0 && (
                            <p>We don't have any reviews for this movie</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieReviews;
