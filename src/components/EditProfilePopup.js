import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = React.useState('');

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'profile'}
      title={'Редактировать профиль'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        id="name"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_name"
        placeholder="Ваше имя"
        required
        aria-label="Имя"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span id="name-error" className="popup__error" />
      <input
        id="status"
        type="text"
        name="status"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_type_status"
        placeholder="Ваша должность"
        required
        aria-label="Статус"
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span id="status-error" className="popup__error"/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
