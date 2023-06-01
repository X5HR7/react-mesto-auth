import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import MainPage from './MainPage';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/Auth';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUser()
      .then(user => setCurrentUser(user))
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then(data => {
        if (data) {
          setLoggedIn(true);
          navigate('/', { replace: true });
          console.log('navigated')
          setEmail(data.data.email);
        }
      });
    }
  }, [loggedIn, navigate]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleQuit = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Routes>
          <Route path='/sign-up' element={<Register />} />
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
          <Route path='*' element={<ProtectedRoute element={MainPage} loggedIn={loggedIn} email={email} handleQuit={handleQuit} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
