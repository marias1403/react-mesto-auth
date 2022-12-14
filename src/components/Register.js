import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Register(props) {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(data.email, data.password);
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <div className="auth__input-wrapper">
          <input
            id="registerEmail"
            type="email"
            name="email"
            className="auth__input"
            placeholder="Email"
            required
            aria-label="email"
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            className="auth__input"
            placeholder="Пароль"
            required
            aria-label="password"
            onChange={handleChange}
          />
        </div>
        <div className="auth__button-wrapper">
          <button type="submit" className="auth__submit-button button">Зарегистрироваться</button>
          <p className="auth__link">Уже зарегистрированы? <NavLink to="/sign-in" className="auth__link">Войти</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default Register;
