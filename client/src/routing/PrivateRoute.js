import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  userLoggedIn,
  setUserLoggedIn,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn === false ? (
          <Redirect to="/" />
        ) : (
          <Component
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            {...props}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
