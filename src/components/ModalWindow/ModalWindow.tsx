import styles from './ModalWindow.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setModalIsOpen } from '../../redux/chatSlise';
import { RootState } from '../../redux/store';
import ModalListItem from '../ModalListItems/ModalListItem';

interface UserData {
  displayName: string;
  email: string;
  online: boolean;
  photoURL: string;
  uid: string;
}

const ModalWindow = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector((state: RootState) => state.chatSlise.allUsers);

  return (
    <div className={styles.modal_wrap}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3>Список всех пользователей чата</h3>
          <button
            className={styles.modal_header_close_btn}
            onClick={() => dispatch(setModalIsOpen(false))}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.4267 25.4267C20.1949 30.4797 11.8789 30.4074 6.73575 25.2643C1.59263 20.1212 1.52037 11.8051 6.57333 6.57339C11.8051 1.52043 20.1211 1.59269 25.2642 6.73581C30.4074 11.8789 30.4796 20.195 25.4267 25.4267ZM21.68 12.2134L17.88 16.0001L21.68 19.7867C21.9324 20.0371 22.0744 20.3779 22.0744 20.7334C22.0744 21.0889 21.9324 21.4297 21.68 21.6801C21.4284 21.9296 21.0877 22.0688 20.7333 22.0667C20.3789 22.0688 20.0383 21.9296 19.7867 21.6801L16 17.8801L12.2133 21.6801C11.9617 21.9296 11.6211 22.0688 11.2667 22.0667C10.9123 22.0688 10.5716 21.9296 10.32 21.6801C10.0676 21.4297 9.9256 21.0889 9.9256 20.7334C9.9256 20.3779 10.0676 20.0371 10.32 19.7867L14.12 16.0001L10.32 12.2134C9.98179 11.8752 9.8497 11.3822 9.97349 10.9202C10.0973 10.4582 10.4582 10.0974 10.9202 9.97356C11.3822 9.84976 11.8751 9.98185 12.2133 10.3201L16 14.1201L19.7867 10.3201C20.1249 9.98185 20.6178 9.84976 21.0798 9.97356C21.5418 10.0974 21.9027 10.4582 22.0265 10.9202C22.1503 11.3822 22.0182 11.8752 21.68 12.2134ZM8.46452 8.45899C12.6282 4.29371 19.3799 4.29121 23.5467 8.45339C25.5661 10.4453 26.703 13.1635 26.703 16.0001C26.703 18.8366 25.5661 21.5548 23.5467 23.5467C19.3799 27.7089 12.6282 27.7064 8.46452 23.5411C4.30079 19.3759 4.30079 12.6243 8.46452 8.45899Z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>

        <div className={styles.modal_search_block}>
          <div className={styles.input_wrap}>тут будет поиск</div>
        </div>

        <div className={styles.modal_list_wrap}>
          {allUsers.map((user: UserData) => (
            <ModalListItem key={user.uid} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
