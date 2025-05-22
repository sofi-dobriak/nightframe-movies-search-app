import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MovieReviews.module.css';
import { fetchMovieReviewsById } from '../../services/api';
import Loader from '../Loader/Loader';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import MovieModal from '../MovieModal/MovieModal';
import { Review, RouteParams } from '../../types/MovieType';

const MovieReviews = () => {
  const { movieId } = useParams<RouteParams>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>('');
  const [review, setReview] = useState<string>('');

  useEffect(() => {
    const id = Number(movieId);
    if (!id) return;

    const getMovieReviews = async () => {
      setIsLoading(true);
      try {
        const movieReviewsData = await fetchMovieReviewsById(id);
        setReviews(movieReviewsData.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  const openModal = (author: string, review: string): void => {
    setModalIsOpen(true);
    setAuthor(author);
    setReview(review);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setAuthor('');
    setReview('');
  };

  return (
    <div>
      {isLoading && <Loader isLoading={true} />}
      {!isLoading && (
        <>
          <div className='mb-10'>
            <ul className='flex xl:flex-row flex-wrap gap-5'>
              {reviews &&
                reviews.map(item => (
                  <li
                    key={item.id}
                    className='min-w-[300px] md:min-w-0 md:max-w-[350px] rounded-sm p-2 border border-[var(--card-border-color)] cursor-pointer duration-300 ease-in-out hover:border-[var(--hover-color)] hover:scale-103 focus:border-[var(--hover-color)] focus:scale-103'
                    onClick={() => openModal(item.author, item.content)}
                  >
                    <p className='mb-1.5 font-bold'>{item.author}</p>
                    <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
                      {item.content}
                    </p>
                  </li>
                ))}
            </ul>

            {!isLoading && reviews.length === 0 && <p>We don't have any reviews for this movie</p>}

            <MovieModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
              <p className='text-black font-bold mb-2'>{author}</p>
              <p className='text-black mb-2'>{review}</p>
            </MovieModal>

            <ScrollToTopButton />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
