import React, { Fragment, useEffect, useState } from "react";
import { Switch, Route, Link, useHistory, useParams } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import DisplayDeck from "./DisplayDeck";
import StudyDeck from "./StudyDeck"
import AddCard from "./AddCard"
import { listDecks, readDeck, listCards } from "../utils/api";


// function EditDeck() {
//   const [selectedDeck, setSelectedDeck] = useState([])
//   const { deckId } = useParams()
  

// }

function Layout() {
  return (
    <Fragment>
      <Link to="/"></Link>
      <Link to="/decks/new"></Link>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path={`/decks/:deckId`}>
            <DisplayDeck />
          </Route>
          <Route exact path={`/decks/:deckId/study`}>
            <StudyDeck />
          </Route>
          <Route exact path={`/decks/:deckId/cards/new`}>
            <AddCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
