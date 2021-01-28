import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { listDecks } from "../utils/api";
import Deck from "./Deck";

export default function DeckList() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDeckList);

    return () => abortController.abort();
  }, []);

  const deckCardList =
    deckList && deckList.map((deck) => <Deck key={deck.id} deck={deck} />);

  return (
    <main className="container">
      <Link to="decks/new">
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          style={{ margin: "5px" }}
        >
          Create Deck
        </button>
      </Link>
      <section className="column">{deckCardList}</section>
    </main>
  );
}
