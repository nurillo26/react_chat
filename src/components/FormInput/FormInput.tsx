import { FC, useState } from 'react';
import styles from './FormInput.module.css';
import { DeepMap, FieldValues, FieldError } from 'react-hook-form';

interface IFormInputProps {
  label: string;
  inputType: string;
  inputName: string;
  iconPath: string;
  placeholder: string;
  eyeIcon?: {
    open: string;
    close: string;
  };
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
  authErrors: any;
}

const FormInput: FC<IFormInputProps> = ({
  label,
  inputType,
  inputName,
  iconPath,
  placeholder,
  eyeIcon,
  register,
  errors,
  authErrors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getValidationRules = (type: string) => {
    switch (type) {
      case 'email':
        return {
          required: 'Введите email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Неправильный формат email',
          },
        };
      case 'password':
        return {
          required: 'Введите пароль',
          minLength: {
            value: 8,
            message: 'Пароль должен быть не менее 8 символов',
          },
        };
      default:
        return { required: 'Заполните поле' };
    }
  };

  return (
    <div className={styles.inputBlock}>
      <span className={styles.inputTitle}>{label}</span>

      <div className={styles.inputWrapper}>
        <div className={`${styles.inputIcon} ${styles.inputTypeIcon}`}>
          <img src={iconPath} alt="icon" />
        </div>

        <input
          type={inputType === 'password' ? (showPassword ? 'text' : 'password') : inputType}
          placeholder={placeholder}
          {...register(inputName, getValidationRules(inputType))}
        />
        {inputType === 'password' && (
          <div
            className={`${styles.inputIcon} ${styles.passwordEyeIcon}`}
            onClick={() => {
              setShowPassword((prevShowPassword) => !prevShowPassword);
            }}>
            <img src={showPassword ? eyeIcon?.close : eyeIcon?.open} alt="eye" />
          </div>
        )}
      </div>
      {errors[inputName] && <span className={styles.error_block}>{errors[inputName].message}</span>}
      {authErrors && authErrors[inputName] && (
        <span className={styles.error_block}>{authErrors[inputName]}</span>
      )}
    </div>
  );
};

export default FormInput;
