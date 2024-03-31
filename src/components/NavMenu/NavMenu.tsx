import { NavLink } from 'react-router-dom';
import NavMenuIcon from '../NavMenuIcon/NavMenuIcon';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './NavMenu.module.css';
import { getAuth } from 'firebase/auth';
import { databaseRef, databaseUpdate, db } from '../../firebase';

const menuIconNames = ['chats', 'search', 'settings'];

const NavMenu = () => {
  const updateOnlineStatus = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = databaseRef(db, `users/${user.uid}`);
      databaseUpdate(userRef, { online: false });
    }
  };

  return (
    <div className={styles.nav_menu_wrap}>
      <div className={styles.nav_menu_top}>
        <NavLink to="/app">
          <div className={styles.nav_menu_top_logo}>
            <img src="/logo.svg" alt="logo" />
          </div>
        </NavLink>

        <div className={styles.nav_menu}>
          {menuIconNames.map((iconName: string) => (
            <NavMenuIcon key={iconName} iconName={iconName} />
          ))}
        </div>
      </div>

      <div className={styles.nav_menu_bot}>
        <div className={styles.logout_block}>
          <NavLink to="/signin" onClick={updateOnlineStatus}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 25.3333V21.3333C24 20.5969 23.403 20 22.6667 20C21.9303 20 21.3333 20.5969 21.3333 21.3333V25.3333C21.3333 26.0697 20.7364 26.6666 20 26.6666H6.66666C5.93028 26.6666 5.33332 26.0697 5.33332 25.3333V6.66663C5.33332 5.93025 5.93028 5.33329 6.66666 5.33329H20C20.7364 5.33329 21.3333 5.93025 21.3333 6.66663V10.6666C21.3333 11.403 21.9303 12 22.6667 12C23.403 12 24 11.403 24 10.6666V6.66663C24 4.45749 22.2091 2.66663 20 2.66663H6.66666C4.45752 2.66663 2.66666 4.45749 2.66666 6.66663V25.3333C2.66666 27.5424 4.45752 29.3333 6.66666 29.3333H20C22.2091 29.3333 24 27.5424 24 25.3333ZM26.28 12.3866L28.9467 15.0533C29.1991 15.3036 29.3411 15.6444 29.3411 16C29.3411 16.3555 29.1991 16.6963 28.9467 16.9466L26.28 19.6133C26.0296 19.8657 25.6888 20.0077 25.3333 20.0077C24.9778 20.0077 24.637 19.8657 24.3867 19.6133C24.1342 19.3629 23.9923 19.0221 23.9923 18.6666C23.9923 18.3111 24.1342 17.9703 24.3867 17.72L24.7867 17.3333H16C15.2636 17.3333 14.6667 16.7363 14.6667 16C14.6667 15.2636 15.2636 14.6666 16 14.6666H24.7867L24.3867 14.28C23.8638 13.7571 23.8638 12.9095 24.3867 12.3866C24.9095 11.8638 25.7572 11.8638 26.28 12.3866Z"
                fill="#fff"
              />
            </svg>
          </NavLink>
        </div>

        <div className={styles.nav_menu_bot_user}>
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
