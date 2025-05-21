import { Route, Routes } from 'react-router-dom';
import Container from './components/Container/Container';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Movies = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MoviesDetails = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {
  return (
    <>
      <Container>
        <Navigation />

        <Suspense fallback={<Loader isLoading={true} />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movies/:movieId' element={<MoviesDetails />}>
              <Route path='cast' element={<MovieCast />} />
              <Route path='reviews' element={<MovieReviews />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
