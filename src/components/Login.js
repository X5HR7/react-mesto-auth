import Form from './Form';
import Header from './Header';

const Login = () => {
  const handleSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <>
      <Header accountName='' link='/sign-up' linkText='Регистрация' />
      <div className='login'>
        <h1 className='login__title'>Вход</h1>
        <Form name='login' buttonText='Войти' onSubmit={handleSubmit}>
          <input type='email' className='form__input' placeholder='Email' required />
          <input type='password' className='form__input' placeholder='Пароль' required />
        </Form>
      </div>
    </>
  );
};

export default Login;
