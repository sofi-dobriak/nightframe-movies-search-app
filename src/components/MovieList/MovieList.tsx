import { Movie } from '../../types/MovieType';
import { Link, useLocation } from 'react-router-dom';
import defaultImage from '../../assets/images/image-not-found.png';

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const location = useLocation();

  return (
    <ul className='flex items-start justify-center gap-5 flex-wrap mb-10'>
      {movies.map(movie => (
        <li
          key={movie.id}
          className='min-w-[216px] p-2 border border-[var(--card-border-color)] rounded-sm duration-300 ease-in-out hover:border-[var(--hover-color)] hover:scale-103 focus:border-[var(--hover-color)] focus:scale-103'
        >
          <Link state={location} to={`/movies/${movie.id}`}>
            <img
              className='rounded-sm max-w-[200px] h-[300px] object-cover mb-2.5'
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImage
              }
              alt={movie.title}
            />
            <p className='max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis'>
              {movie.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
