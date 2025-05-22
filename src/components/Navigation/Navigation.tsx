import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  isActive: boolean;
}

const Navigation = () => {
  const setActiveClass = ({ isActive }: NavigationProps) => {
    return clsx(
      'duration-300 ease-in-out hover:text-[var(--hover-color)] focus:text-[var(--hover-color)]',
      isActive && 'text-[var(--active-color)]'
    );
  };
  return (
    <nav className='flex items-center gap-7.5 m-0 mt-5 mb-5'>
      <NavLink to='/' className={setActiveClass}>
        Home
      </NavLink>
      <NavLink to='/movies' className={setActiveClass}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
