import { ChangeEvent, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setLoggedInUser } from '../../redux/userDataSlice';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { app, db, databaseRef, databaseUpdate } from '../../firebase';

import styles from './SettingsBlock.module.css';

const SettingsBlock = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.userData.loggedInUser);
  const storage = getStorage();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Выбор файла
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Отправка файла в firebase storage и обновление профиля юзверя
  const handleFileUpload = () => {
    if (selectedFile) {
      const fileRef = ref(storage, selectedFile.name);

      // Загрузка файла в firebase
      uploadBytes(fileRef, selectedFile)
        .then((_snapshot) => {
          // Получение ссылки на файл в firebase storage
          getDownloadURL(fileRef)
            .then((url) => {
              const auth = getAuth(app);
              const user = auth.currentUser;
              if (user) {
                // Сохранение ссылки на файл в базе данных
                const userRef = databaseRef(db, `users/${user.uid}`);
                databaseUpdate(userRef, { photoURL: url });

                // Обновление профайла юзера
                updateProfile(user, { photoURL: url })
                  .then(() => {
                    dispatch(
                      setLoggedInUser({
                        ...loggedInUser,
                        photoURL: url,
                      }),
                    );

                    // Обновление localStorage
                    const updatedUser = { ...loggedInUser, photoURL: url };
                    const currentUser = JSON.stringify(updatedUser);
                    localStorage.setItem('user', currentUser);
                  })
                  .catch((error) => {
                    console.error('Error updating profile:', error);
                  });
              } else {
                console.error('No user signed in.');
              }
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });

      setSelectedFile(null);
    }
  };

  return (
    <div className={styles.settings_block_wrap}>
      <h2 className={styles.title}>Настройки:</h2>

      <div className={styles.user_info}>
        <div>{loggedInUser.displayName}</div>
        <div>{loggedInUser.email}</div>

        <div className={styles.user_ava_wrap}>
          <div className={styles.ava_img}>
            <img src={loggedInUser.photoURL || '/menu-icons/avatar.svg'} alt="ava" />
          </div>

          <label style={{ cursor: 'pointer' }}>
            Изменить фото
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          <button
            disabled={!selectedFile}
            className={`${styles.save_avatar_btn} ${!selectedFile && styles.disabled_btn}`}
            onClick={handleFileUpload}>
            Загрузить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsBlock;
