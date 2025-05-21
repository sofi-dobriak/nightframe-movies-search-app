import PuffLoader from 'react-spinners/PuffLoader';

const override = {
  display: 'block',
  margin: '0 auto',
};

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <>
      <PuffLoader
        color='#6979f8'
        loading={isLoading}
        cssOverride={override}
        size={50}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </>
  );
};

export default Loader;
