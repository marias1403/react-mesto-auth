import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  const [image, setImage] = React.useState('');

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  React.useEffect(() => {
    setTitle('');
    setImage('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: title,
      link: image,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'add-card'}
      title={'Новое место'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={'Создать'}
    >
      <input
        id="title"
        type="text"
        name="title"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_image-title"
        placeholder="Название"
        required
        aria-label="Название"
        value={title || ''}
        onChange={handleChangeTitle}
      />
      <span id="title-error" className="popup__error" />
      <input
        id="link"
        type="url"
        name="link"
        className="popup__input popup__input_type_image-link"
        placeholder="Ссылка на картинку"
        required
        aria-label="Ссылка"
        value={image || ''}
        onChange={handleChangeImage}
      />
      <span id="link-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
