import React, { Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import DisplayDeck from "./DisplayDeck";
import StudyDeck from "./StudyDeck"
import AddCard from "./AddCard"
import EditCard from "./EditCard"
import EditDeck from "./EditDeck"


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
          <Route exact path={`/decks/:deckId/edit`}>
           <EditDeck />
         </Route>
          <Route exact path={`/decks/:deckId/cards/:cardId`}>
           <EditCard />
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
