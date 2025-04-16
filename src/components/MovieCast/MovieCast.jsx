import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieCastById } from '../../services/api';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getMovieCast = async () => {
            try {
                const movieCastData = await fetchMovieCastById(movieId);
                setCast(movieCastData.cast);
            } catch (error) {
                console.log(error);
            }
        };
        getMovieCast();
    }, [movieId]);

    return (
        <div>
            <h2>Cast {movieId}</h2>
            <ul>
                {cast.map(item => (
                    <li key={item.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                            alt={item.name}
                        />
                        <p>{item.original_name}</p>
                        <p>{item.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;
