function ImagePopup(props) {
  let openClass = '';
  let image = '';
  let title = '';

  if (props.card) {
    openClass = 'popup_opened';
    image = props.card.image;
    title = props.card.title;
  }

  return (
    <div onClick={props.onClose} className={`popup popup_type_image ${openClass}`}>
      <figure className="popup__figure">
        <button onClick={props.onClose} className="popup__close-button popup__close-button_type_image button" type="button"></button>
        <img className="popup__image" src={image} alt={title} />
        <figcaption className="popup__figcaption">{title}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
