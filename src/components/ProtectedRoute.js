import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  console.log(props.isLoggedIn);

  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props.childProps} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
