import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import { useEffect } from 'react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateId = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(navigateId);
  }, [navigate]);

  return <p className={styles.notFoundPage}>Not Found Page</p>;
};

export default NotFoundPage;
