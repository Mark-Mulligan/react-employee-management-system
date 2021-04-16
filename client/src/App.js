import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import LandingPage from "./pages/LandingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import "./App.css";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  const checkForLoggedInUser = async () => {
    try {
      const response = await axios.get("/api/auth/user");
      if (response.data) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('use effect in app ran');
    checkForLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LandingPage
              {...props}
              userLoggedIn={userLoggedIn}
              setUserLoggedIn={setUserLoggedIn}
            />
          )}
        />
        {userLoggedIn === false ? (
          <Redirect to="/" />
        ) : (
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <AnalyticsPage
                {...props}
                userLoggedIn={userLoggedIn}
                setUserLoggedIn={setUserLoggedIn}
              />
            )}
          />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
