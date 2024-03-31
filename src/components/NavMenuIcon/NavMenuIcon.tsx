import { FC } from 'react';
import styles from './NavMenuIcon.module.css';
import { NavLink } from 'react-router-dom';

interface INavMenuIconProps {
  iconName: string;
}

const NavMenuIcon: FC<INavMenuIconProps> = ({ iconName }) => {
  return (
    <NavLink to={iconName} className={({ isActive }) => (isActive ? styles.menu_link_active : '')}>
      <div className={styles.menu_icon_wrap}>
        <img src={`/menu-icons/${iconName}.svg`} alt="" />
      </div>
    </NavLink>
  );
};

export default NavMenuIcon;
