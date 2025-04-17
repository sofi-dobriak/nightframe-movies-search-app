import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieCastById } from '../../services/api';
import Loader from '../Loader/Loader';
import defaultImage from '../../assets/images/image-not-found.png';
import MovieModal from '../../components/MovieModal/MovieModal';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalSrc, setModalSrc] = useState('');
    const [modalAlt, setModalAlt] = useState('');
    const [actor, setActor] = useState('');
    const [character, setCharacter] = useState('');

    useEffect(() => {
        const getMovieCast = async () => {
            setIsLoading(true);
            try {
                const movieCastData = await fetchMovieCastById(movieId);
                setCast(movieCastData.cast);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        getMovieCast();
    }, [movieId]);

    const openModal = (src, alt, actor, character) => {
        setModalIsOpen(true);
        setModalSrc(src);
        setModalAlt(alt);
        setActor(actor);
        setCharacter(character);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalSrc('');
        setModalAlt('');
        setActor('');
        setCharacter('');
    };

    return (
        <div>
            {isLoading && <Loader />}
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
                                        <p className={styles.castActor}>
                                            An actor: {item.original_name}
                                        </p>
                                        <p className={styles.castCharacter}>
                                            Character: {item.character}
                                        </p>
                                    </li>
                                ))}
                        </ul>

                        {!isLoading && cast.length === 0 && (
                            <p>We don't have any cast list for this movie</p>
                        )}

                        <MovieModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
                            {modalSrc && (
                                <img src={modalSrc} alt={modalAlt} className={styles.modalImage} />
                            )}
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
