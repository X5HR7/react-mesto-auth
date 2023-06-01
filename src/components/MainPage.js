import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

const MainPage = props => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfileOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUser()
      .then(user => setCurrentUser(user))
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(cards => {
        setCards(cards);
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpened(true);
  };

  const handleEditProfileClick = () => {
    setEditProfileOpened(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpened(true);
  };

  const closeAllPopups = () => {
    setEditProfileOpened(false);
    setEditAvatarPopupOpened(false);
    setAddPlacePopupOpened(false);
    setSelectedCard(null);
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  };

  const handleCardDelete = card => {
    api
      .deleteCard(card._id)
      .then(res => {
        setCards(cards.filter(i => i._id !== card._id));
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  };

  const handleUserUpdate = ({ name, about }) => {
    api
      .editUserInfo(name, about)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  };

  const handleAvatarUpdate = ({ avatar }) => {
    api
      .changeAvatar(avatar)
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  };

  const handleAddPlaceSubmit = ({ title, url }) => {
    api
      .addNewCard(title, url)
      .then(card => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка: ${err.status}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUserUpdate} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} />

        <PopupWithForm name='confirm' title='Вы уверены?' isOpen={false} onClose={closeAllPopups} buttonText='Да' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Header>
          <p className='header__account-name'>{props.email || ''}</p>
          <p className='header__quit-link' onClick={props.handleQuit}>Выйти</p>
        </Header>

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default MainPage;
