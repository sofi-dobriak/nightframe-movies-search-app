import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieCastById } from '../../services/api';
import Loader from '../Loader/Loader';
import defaultImage from '../../assets/images/image-not-found.png';
import MovieModal from '../MovieModal/MovieModal';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import { CastMember, RouteParams } from '../types/MovieType';

const MovieCast = () => {
  const { movieId } = useParams<RouteParams>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string>('');
  const [modalAlt, setModalAlt] = useState<string>('');
  const [actor, setActor] = useState<string>('');
  const [character, setCharacter] = useState<string>('');

  useEffect(() => {
    const id = Number(movieId);
    if (!id) return;

    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        const movieCastData = await fetchMovieCastById(id);
        setCast(movieCastData.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCast();
  }, [movieId]);

  const openModal = (src: string, alt: string, actor: string, character: string): void => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setActor(actor);
    setCharacter(character);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
    setActor('');
    setCharacter('');
  };

  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading && (
        <>
          <div className={styles.castContainer}>
            <ul className={styles.castList}>
              {cast &&
                cast.map(item => (
                  <li
                    key={item.id}
                    className={styles.castItem}
                    onClick={() =>
                      openModal(
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                          : defaultImage,
                        item.name,
                        item.original_name,
                        item.character
                      )
                    }
                  >
                    <img
                      className={styles.castImage}
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                          : defaultImage
                      }
                      alt={item.name}
                    />
                    <p className={styles.castActor}>An actor: {item.original_name}</p>
                    <p className={styles.castCharacter}>Character: {item.character}</p>
                  </li>
                ))}
            </ul>

            {!isLoading && cast.length === 0 && <p>We don't have any cast list for this movie</p>}

            <MovieModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
              {modalSrc && <img src={modalSrc} alt={modalAlt} className={styles.modalImage} />}
              <p className={styles.modalText}>An actor: {actor}</p>
              <p className={styles.modalText}>Character: {character}</p>
            </MovieModal>

            <ScrollToTopButton />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCast;
