import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.css';
import { FaArrowUpLong } from 'react-icons/fa6';
import clsx from 'clsx';

const ScrollToTopButton = () => {
  const [visible, setIsVisible] = useState<boolean>(false);

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

  const scrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollTop}
      className={clsx(
        'fixed z-100 bottom-5 right-5 p-3 rounded-sm text-base text-[var(--color)] bg-[var(--button-bg-color)] border-none flex items-center justify-center cursor-pointer opacity-0 transition-all duration-300 ease hover:bg-[var(--hover-color)] hover:scale-103',
        visible && 'opacity-100'
      )}
    >
      <FaArrowUpLong />
    </button>
  );
};

export default ScrollToTopButton;
