import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? 'elements__delete_visible' : 'elements__delete_hidden'}`
  );

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : 'elements__like_inactive'}`
  );

  return (
    <li className="elements__element">
      <button onClick={handleDeleteClick} className={"elements__delete button " + (cardDeleteButtonClassName)}  type="button"></button>
      <img onClick={handleClick} className="elements__image" src={props.card.image} alt={props.card.title} />
        <div className="elements__description">
          <h2 className="elements__title">{props.card.title}</h2>
          <div className="elements__like-wrapper">
            <button onClick={handleLikeClick} className={"elements__like button " + (cardLikeButtonClassName)} type="button"></button>
            <p className="elements__like-counter">{props.card.likes.length}</p>
          </div>
        </div>
    </li>
  );
}

export default Card;
