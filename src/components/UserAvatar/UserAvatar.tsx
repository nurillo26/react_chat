import styles from './UserAvatar.module.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const UserAvatar = () => {
  const loggedInUser = useSelector((state: RootState) => state.userData.loggedInUser);

  return (
    <div className={styles.avatar_wrap}>
      {loggedInUser?.photoURL ? (
        <img style={{ width: '100%', height: '100%' }} src={loggedInUser.photoURL} alt="ava" />
      ) : (
        <img style={{ width: '100%', height: '100%' }} src="/menu-icons/avatar.svg" alt="ava" />
      )}
    </div>
  );
};

export default UserAvatar;
