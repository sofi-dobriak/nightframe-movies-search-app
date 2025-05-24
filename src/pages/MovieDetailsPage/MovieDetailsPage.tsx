import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchMovieById } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import defaultImage from '../../assets/images/image-not-found.png';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Movie, RouteParams } from '../../types/MovieType';

const MovieDetailsPage = () => {
  const { movieId } = useParams<RouteParams>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    const id = Number(movieId);
    if (!movieId) return;

    const getMovieById = async () => {
      setIsLoading(true);
      try {
        const movie = await fetchMovieById(id);
        setMovie(movie);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieById();
  }, [movieId]);

  if (isLoading) return <Loader isLoading={true} />;
  if (!movie) return null;

  return (
    <div>
      {!isLoading && (
        <>
          <div className='mb-[20px]'>
            <Link
              to={goBackRef.current}
              className='flex items-center gap-2 duration-300ms transition ease-in-out hover:text-[var(--hover-color)] focus:text-[var(--hover-color)]'
            >
              <IoMdArrowRoundBack />
              Go back
            </Link>
          </div>
          <div className='flex gap-4 flex-col md:flex-row'>
            <img
              className='border border-[var(--card-border-color)] rounded-sm max-w-[200px] h-[300px] object-cover mb-[10px] text-sm md:text-base m-auto'
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImage
              }
              alt={movie.title}
            />
            <div>
              <p className='mb-[10px] text-sm md:text-base'>
                <span className='font-bold'>Title</span>: {movie.title}
              </p>

              {movie.overview && (
                <p className='mb-[10px] text-sm md:text-base'>
                  <span className='font-bold'>Overview</span>: {movie.overview}
                </p>
              )}

              {!movie.overview && (
                <p className='mb-[10px] text-sm md:text-base'>
                  <span className='font-bold'>Overview</span>: -
                </p>
              )}

              <p className='mb-[10px] text-sm md:text-base'>
                <span className='font-bold'>Average vote:</span> {movie.vote_average}
              </p>

              {movie.genres && (
                <p>
                  <span className='font-bold text-sm md:text-base '>Genres:</span>{' '}
                  {movie.genres.map(genre => genre.name).join(', ')}
                </p>
              )}
            </div>
          </div>

          <p className='font-bold mb-[10px] text-sm md:text-base'>Additional information:</p>
          <nav className='flex gap-[16px] mb-[20px]'>
            <NavLink
              to='cast'
              className='flex items-center justify-center rounded-[4px] bg-[var(--button-bg-color)] min-w-[100px] h-[30px] transition duration-300ms ease-in-out hover:bg-[var(--hover-color)] focus:bg-[var(--hover-color)]'
            >
              Cast
            </NavLink>
            <NavLink
              to='reviews'
              className='flex items-center justify-center rounded-[4px] bg-[var(--button-bg-color)] min-w-[100px] h-[30px] transition duration-300ms ease-in-out hover:bg-[var(--hover-color)] focus:bg-[var(--hover-color)]'
            >
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
