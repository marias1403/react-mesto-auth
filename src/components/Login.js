import React, { useState } from "react";

function Login(props) {
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
    props.onLogin(data.email, data.password);
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <div className="auth__input-wrapper">
          <input
            id="loginEmail"
            type="email"
            name="email"
            className="auth__input"
            placeholder="Email"
            required
            aria-label="loginEmail"
            onChange={handleChange}
          />
          <input
            id="loginPassword"
            type="password"
            name="password"
            className="auth__input"
            placeholder="Пароль"
            required
            aria-label="loginPassword"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth__submit-button button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
