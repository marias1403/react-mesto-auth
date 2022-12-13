import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

function Footer() {
  return (
    <Switch>
      <Route exact path="/">
        <footer className="footer section page__footer">
          <p className="footer__copyright">&#169; 2022 Mesto Russia</p>
        </footer>
      </Route>
      <Route path="/sign-in">
      </Route>
      <Route path="/sign-up">
      </Route>
    </Switch>
  );
}

export default Footer;
