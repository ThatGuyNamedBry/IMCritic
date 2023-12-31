import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomeLandingPage from "./components/HomeLandingPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import CreateMovieForm from "./components/CreateMovieForm";
import AllMoviesPage from './components/AllMoviesPage';
import Footer from "./components/Footer";
import ActorsPage from "./components/ActorsPage";
import CreateActorForm from "./components/CreateActorForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className="content-container">
        <Switch>
          <Route exact path="/" component={HomeLandingPage} />
          <Route exact path="/login" ><LoginFormPage /></Route>
          <Route exact path="/signup"><SignupFormPage /></Route>
          <Route exact path="/movies" component={AllMoviesPage} />
          <Route exact path="/movies/new" component={CreateMovieForm} />
          <Route exact path="/movies/:movieId" component={MovieDetailsPage} />
          <Route exact path="/actors/new" component={CreateActorForm} />
          <Route exact path="/actors/:actorId" component={ActorsPage} />
        </Switch>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
