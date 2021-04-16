import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ userLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn === false ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
