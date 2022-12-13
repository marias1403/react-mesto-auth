import React, {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipPopupSuccess, setIsInfoTooltipPopupSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('jwt') !== null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    api.getInitialsCards()
      .then(data => {
        setCards(data.map((cardData) => (mapCardDataToState(cardData))))
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      auth.getUserData(localStorage.getItem('jwt'))
        .then((userData) => {
          if (userData) {
            setUserData(userData);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card.idCard, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c.idCard === card.idCard ? mapCardDataToState(newCard) : c));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;
    api.deleteCard(card.idCard, isOwn).then(() => {
      setCards((state) => state.filter((c) => c.idCard !== card.idCard));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function mapCardDataToState(card) {
    return {
      idCard: card._id,
      image: card.link,
      title: card.name,
      likes: card.likes,
      owner: card.owner._id,
    }
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name: name, link: link })
      .then((newCard) => {
        setCards([mapCardDataToState(newCard), ...cards]);
        closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    api.getUserInfo()
      .then(user => setCurrentUser(user))
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleRegisterSubmit(isSuccess) {
    setIsInfoTooltipPopupOpen(true);
    setIsInfoTooltipPopupSuccess(isSuccess);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ avatar: avatar })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogin(token) {
    setIsLoggedIn(true);
    auth.getUserData(token).then((userData) => {
      setUserData(userData);
    })
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <div className="page__container">
          <Header
            userData={userData}
          />
          <Switch>
            <Route path="/sign-in">
              <Login
                handleLogin={handleLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegisterSubmit}
              />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={isLoggedIn}
              component={Main}
              childProps={{
                "cards": cards,
                "onCardLike": handleCardLike,
                "onCardDelete": handleCardDelete,
                "onEditProfile": handleEditProfileClick,
                "onAddPlace": handleAddPlaceClick,
                "onEditAvatar": handleEditAvatarClick,
                "onCardClick": handleCardClick
              }}
            />
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isInfoTooltipPopupSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
