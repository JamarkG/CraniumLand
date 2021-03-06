import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DeckList from "./components/DeckList";
import User from "./components/User";
import LandingPage from "./components/LandingPage"
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import DeckForm from "./components/DeckForm"
import CardForm from "./components/CardForm"
import StudyHall from "./components/StudyHall"
import Search from "./components/Search"
import Creators from "./components/Creators"


function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  // let searchTerm =

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/login" exact={true}>
        </Route>
        <Route path="/sign-up" exact={true}>
        </Route>
        <Route path="/decks" exact={true} >
          <DeckList />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <LandingPage/>
        </Route>
        <Route path="/decks/:deckId" exact={true}>
          <CardForm />
        </Route>
        <Route path="/decks/:deckId/study" exact={true}>
          <StudyHall />
        </Route>
        <Route path="/search/:searchTerm" exact={true}>
          <Search />
        </Route>
      </Switch>
      <Creators />
    </BrowserRouter>
  );
}

export default App;
