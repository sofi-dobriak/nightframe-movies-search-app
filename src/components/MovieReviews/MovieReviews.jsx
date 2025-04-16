import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MovieReviews.module.css';
import { fetchMovieReviewsById } from '../../services/api';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getMovieReviews = async () => {
            try {
                const movieReviewsData = await fetchMovieReviewsById(movieId);
                setReviews(movieReviewsData.results);
            } catch (error) {
                console.log(error);
            }
        };
        getMovieReviews();
    }, [movieId]);

    return (
        <div>
            <ul>
                {reviews.map(item => (
                    <li key={item.id}>
                        <p>{item.author}</p>
                        <p>{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieReviews;
