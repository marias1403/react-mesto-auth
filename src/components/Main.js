import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content page__content">
      <section className="profile section content__section">
        <div onClick={props.onEditAvatar} className="profile__avatar-overlay">
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватарка"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} className="profile__edit-button edit-button button"
                  type="button"></button>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button add-button button" type="button"></button>
      </section>

      <section className="section content__section">
        <ul className="elements page__elements">
          {props.cards.map((card) => <Card key={card.idCard} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)}
        </ul>
      </section>
    </main>
);
}

export default Main;
