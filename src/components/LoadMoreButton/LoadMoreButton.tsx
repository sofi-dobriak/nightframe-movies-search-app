import styles from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  handleLoadMore: () => void;
}

const LoadMoreButton = ({ handleLoadMore }: LoadMoreButtonProps) => {
  return (
    <button onClick={handleLoadMore} className={styles.loadMoreButton}>
      Load more
    </button>
  );
};

export default LoadMoreButton;
