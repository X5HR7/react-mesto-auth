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

const MainPage = ({
  email,
  handleQuit,
  handleUserUpdate,
  handleAvatarUpdate,
  closeAllPopups,
  popupsState,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick,
  selectedCard,
}) => {
  const [cards, setCards] = React.useState([]);
  const { isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen } = popupsState;
  const currentUser = React.useContext(CurrentUserContext);

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
        setCards(state => state.filter(item => item._id !== card._id));
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
    <div className='root'>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUserUpdate} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleAddPlaceSubmit} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} />

      <PopupWithForm name='confirm' title='Вы уверены?' isOpen={false} onClose={closeAllPopups} buttonText='Да' />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Header>
        <p className='header__account-name'>{email || ''}</p>
        <p className='header__quit-link' onClick={handleQuit}>
          Выйти
        </p>
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
  );
};

export default MainPage;
