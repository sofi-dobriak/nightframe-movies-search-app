import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateId = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(navigateId);
  }, [navigate]);

  return <p className='text-[var(--error-color)] text-center'>Not Found Page</p>;
};

export default NotFoundPage;
