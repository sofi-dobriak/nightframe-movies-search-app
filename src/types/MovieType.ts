export type RouteParams = {
  movieId: string;
};

interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  genres: Genre[];
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
}

export interface Review {
  id: string;
  author: string;
  content: string;
}
