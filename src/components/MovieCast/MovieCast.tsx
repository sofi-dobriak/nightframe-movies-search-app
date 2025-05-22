import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCastById } from '../../services/api';
import Loader from '../Loader/Loader';
import defaultImage from '../../assets/images/image-not-found.png';
import MovieModal from '../MovieModal/MovieModal';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import { CastMember, RouteParams } from '../../types/MovieType';

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
          <div className='mb-2.5'>
            <ul className='flex items-start justify-center flex-wrap gap-5'>
              {cast &&
                cast.map(item => (
                  <li
                    key={item.id}
                    className='p-2 border border-[var(--card-border-color)] rounded-sm min-w-[216px] transition-all duration-300 ease-in-out cursor-pointer hover:border-[var(--hover-color)] hover:scale-103 focus:border-[var(--hover-color)] focus:scale-103'
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
                      className='max-w-[200px] h-[300px] rounded-sm m-auto mb-2.5 object-cover'
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                          : defaultImage
                      }
                      alt={item.name}
                    />
                    <p className='text-sm max-w-[200px] text-nowrap overflow-hidden text-ellipsis'>
                      An actor: {item.original_name}
                    </p>
                    <p className='text-sm max-w-[200px] text-nowrap overflow-hidden text-ellipsis'>
                      Character: {item.character}
                    </p>
                  </li>
                ))}
            </ul>

            {!isLoading && cast.length === 0 && <p>We don't have any cast list for this movie</p>}

            <MovieModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
              {modalSrc && (
                <img
                  src={modalSrc}
                  alt={modalAlt}
                  className='w-full max-w-[280px] h-auto m-auto mb-2.5 rounded-sm'
                />
              )}
              <p className='text-black'>An actor: {actor}</p>
              <p className='text-black'>Character: {character}</p>
            </MovieModal>

            <ScrollToTopButton />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCast;
