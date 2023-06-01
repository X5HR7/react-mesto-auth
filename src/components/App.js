import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import api from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import MainPage from './MainPage';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false); 
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUser()
      .then(user => setCurrentUser(user))
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Routes>
          <Route path='/sign-up' element={<Register />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='*' element={<ProtectedRoute element={MainPage} loggedIn={loggedIn} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
