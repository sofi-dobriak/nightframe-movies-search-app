import clsx from 'clsx';
import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const setActiveClass = ({ isActive }) => {
        return clsx(styles.link, isActive && styles.active);
    };
    return (
        <nav className={styles.navigation}>
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
