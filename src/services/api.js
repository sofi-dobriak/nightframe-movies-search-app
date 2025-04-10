import axios from 'axios';

export const fetchTrandMovies = () => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

    const options = {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWUwNDVhZWE0MjNiNjExZTliODA1YTE0NDk3NTc0NiIsIm5iZiI6MTc0NDIwNTMwNy40NjQsInN1YiI6IjY3ZjY3NWZiMWJjNjM5NTY2YWQ5MWE4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mGWPQrZmQzRhD36GndZZ4ljLv9L6c7ko4MdnQ6dwB4E',
        },
    };

    return axios.get(url, options).then(response => response.data);
};
