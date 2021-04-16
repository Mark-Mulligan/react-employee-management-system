import { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

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
    </Switch>
  </BrowserRouter>
  );
}

export default App;
