import React from 'react';
import styles from './LoadMoreButton.module.css';

const LoadMoreButton = ({ handleLoadMore }) => {
    return (
        <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load more
        </button>
    );
};

export default LoadMoreButton;
