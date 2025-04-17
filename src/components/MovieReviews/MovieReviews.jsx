import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MovieReviews.module.css';
import { fetchMovieReviewsById } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import MovieModal from '../MovieModal/MovieModal';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');

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

    const openModal = (author, review) => {
        setModalIsOpen(true);
        setAuthor(author);
        setReview(review);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setAuthor('');
        setReview('');
    };

    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && (
                <>
                    <div className={styles.reviewsContainer}>
                        <ul className={styles.reviewsList}>
                            {reviews &&
                                reviews.map(item => (
                                    <li
                                        key={item.id}
                                        className={styles.reviewsItem}
                                        onClick={() => openModal(item.author, item.content)}
                                    >
                                        <p className={styles.reviewsAuthor}>{item.author}</p>
                                        <p className={styles.reviewsText}>{item.content}</p>
                                    </li>
                                ))}
                        </ul>

                        {!isLoading && reviews.length === 0 && (
                            <p>We don't have any reviews for this movie</p>
                        )}

                        <MovieModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                            <p className={`${styles.modalText} ${styles.modalAuthor}`}>{author}</p>
                            <p className={styles.modalText}>{review}</p>
                        </MovieModal>

                        <ScrollToTopButton />
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieReviews;
