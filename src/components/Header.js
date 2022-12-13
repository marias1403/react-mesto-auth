import logoMesto from "../images/logo.svg";
import React from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/login');
  }

  return (
    <header className="header page__header section">
      <img className="header__logo" alt="Логотип проекта Mesto" src={logoMesto} />
      <Switch>
        <Route exact path="/">
          <div className="header__link-wrapper">
            <p className="header__link">{props.userData ? props.userData.email : ''}</p>
            <NavLink onClick={signOut} to="/sign-in" className="header__link header__link_type_grey">Выйти</NavLink>
          </div>
        </Route>
        <Route path="/sign-in">
          <NavLink to="/sign-up" className="header__link">Регистрация</NavLink>
        </Route>
        <Route path="/sign-up">
          <NavLink to="/sign-in" className="header__link">Войти</NavLink>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
