import Form from './Form';
import Header from './Header';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

const Register = () => {
  const handleSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <>
    <InfoTooltip name='infoTooltip' isFailed={true} isOpen={false} />
      <Header accountName='' link='/sign-in' linkText='Войти' />
      <div className='register'>
        <h1 className='register__title'>Регистрация</h1>
        <Form name='register' buttonText='Зарегистрироваться' onSubmit={handleSubmit}>
          <input type='email' className='form__input' placeholder='Email' required />
          <input type='password' className='form__input' placeholder='Пароль' required />
        </Form>
        <Link to='/sign-in' className='register__link'>
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;
