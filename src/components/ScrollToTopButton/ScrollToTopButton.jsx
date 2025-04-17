import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.css';
import { FaArrowUpLong } from 'react-icons/fa6';

const ScrollToTopButton = () => {
    const [visible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollTop}
            className={`${styles.scrollToTop} ${visible ? styles.visible : ''}`}
        >
            <FaArrowUpLong />
        </button>
    );
};

export default ScrollToTopButton;
