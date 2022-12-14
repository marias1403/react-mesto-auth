import successImage from "../images/info-tool-tip_success.svg";
import failImage from "../images/info-tool-tip_fail.svg";

function InfoTooltip(props) {
  const isOpen = props.isOpen ? 'popup_opened' : '';
  const img = props.isSuccess ? successImage : failImage;

  return (
    <div onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        props.onClose()
      }
    }} className={`popup ${isOpen}`}>
      <div className="popup__container popup__container_type_info">
        <button onMouseDown={props.onClose} className="popup__close-button button"></button>
        <img className="popup__image-info" src={img} alt={props.isSuccess ? props.successText : props.failText}/>
        <h2 className="popup__heading popup__heading_type_info">
          {
            props.isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        </h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
