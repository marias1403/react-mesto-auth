function PopupWithForm(props) {
  const isOpen = props.isOpen ? 'popup_opened' : '';
  return (
    <div onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        props.onClose()
      }
    }} className={`popup popup_type_${props.name} ${isOpen}`}>
      <div className="popup__container">
        <button onMouseDown={props.onClose} className="popup__close-button button" type="button"></button>
        <h2 className={`popup__heading popup__heading_type_${props.name}`}>{props.title}</h2>
        <form onSubmit={props.onSubmit} action="#" className="popup__form" name={props.name}>
          {props.children}
          <button className={`popup__submit-button popup__submit-button_type_${props.name} button`} type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
