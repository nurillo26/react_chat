import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../../redux/userDataSlice';

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app, db, databaseRef, databaseSet, databaseUpdate } from '../../firebase';

import styles from './Form.module.css';
import FormInput from '../FormInput/FormInput';

const auth = getAuth(app);

export interface FormData {
  fullName: string;
  email: string;
  password: string;
}

// Данные для инпутов в зависимости от pathname
const loginInputs = [
  {
    label: 'Email',
    inputType: 'email',
    inputName: 'email',
    iconPath: 'form-icons/email_icon.svg',
    placeholder: 'Enter your email',
  },
  {
    label: 'Password',
    inputType: 'password',
    inputName: 'password',
    iconPath: 'form-icons/password_icon.svg',
    placeholder: 'Enter password',
    eyeIcon: { open: 'form-icons/eye.svg', close: 'form-icons/eye-slash.svg' },
  },
];
const registerInputs = [
  {
    label: 'Full Name',
    inputType: 'text',
    inputName: 'fullName',
    iconPath: 'form-icons/user.svg',
    placeholder: 'John Doe',
  },
  {
    label: 'Email',
    inputType: 'email',
    inputName: 'email',
    iconPath: 'form-icons/email_icon.svg',
    placeholder: 'example@site.com',
  },
  {
    label: 'Choose Password',
    inputType: 'password',
    inputName: 'password',
    iconPath: 'form-icons/password_icon.svg',
    placeholder: 'Minimum 8 characters',
    eyeIcon: { open: 'form-icons/eye.svg', close: 'form-icons/eye-slash.svg' },
  },
];

const Form = () => {
  const dispatch = useDispatch();
  const [authErrors, setAuthErrors] = useState<Partial<FormData>>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  // Авторизация firebase
  const authUser = async (userData: FormData) => {
    const { email, password } = userData;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(
        setLoggedInUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
      );

      const userRef = databaseRef(db, `users/${user.uid}`);
      databaseUpdate(userRef, { online: true });
      navigate('/app');
    } catch (error) {
      setAuthErrors({
        email: 'Неправильный email',
        password: 'Неправильный пароль',
      });
    }
  };

  // Регистрация firebase
  const registerUser = async (userData: FormData) => {
    const { email, password } = userData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userData.fullName,
        photoURL: null,
      });

      dispatch(
        setLoggedInUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
      );

      const photoUrlToSave = user.photoURL ? user.photoURL : '';

      const userRef = databaseRef(db, `users/${user.uid}`);
      databaseSet(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: photoUrlToSave,
      });
      databaseUpdate(userRef, { online: true });

      navigate('/app');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setAuthErrors({ email: 'Этот email уже используется' });
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (pathname === '/signin') {
      authUser(formData);
    } else if (pathname === '/signup') {
      registerUser(formData);
    }
    setAuthErrors(undefined);
  };

  return (
    <form className={styles.form_wrap} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.form_title}>Велком ту machat</h1>

      {pathname === '/signin' && (
        <>
          {loginInputs.map((inputDescrip, i) => (
            <FormInput
              key={i}
              {...inputDescrip}
              register={register}
              errors={errors}
              authErrors={authErrors}
            />
          ))}

          <button type="submit" className={styles.form_submit_btn}>
            Sign In
          </button>

          <Link className={styles.change_form_link} to={'/signup'}>
            Зарегистроватся
          </Link>
        </>
      )}

      {pathname === '/signup' && (
        <>
          {registerInputs.map((inputDescrip, i) => (
            <FormInput
              key={i}
              {...inputDescrip}
              register={register}
              errors={errors}
              authErrors={authErrors}
            />
          ))}

          <button type="submit" className={styles.form_submit_btn}>
            Sign Up
          </button>

          <Link className={styles.change_form_link} to={'/signin'}>
            Авторизоваться
          </Link>
        </>
      )}
    </form>
  );
};

export default Form;
