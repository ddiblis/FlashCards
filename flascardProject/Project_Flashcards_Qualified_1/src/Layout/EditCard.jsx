import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { readCard, readDeck } from "../utils/api";

export default function EditCard() {
  const [selectedDeck, setSelectedDeck] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const { deckId, cardId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const handleFrontChange = (event) => setFront(event.target.value);
  const handleBackChange = (event) => setBack(event.target.value);
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then((deck) => {
      setSelectedDeck(deck);
      readCard(cardId, abortController.signal).then(setSelectedCard);
    });
  }, [deckId, cardId]);

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {"Edit Card " + cardId}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>
      <form>
        <label htmlFor="name">Front</label> <br />
        <textarea
          id="name"
          type="text"
          name="name"
          defaultValue={selectedCard.front}
          onChange={handleFrontChange}
          style={{ width: "100%", height: "150px" }}
          value={front}
        />{" "}
        <br />
        <br />
        <label htmlFor="description">Back</label>
        <br />
        <textarea
          id="description"
          type="text"
          name="description"
          defaultValue={selectedCard.back}
          onChange={handleBackChange}
          style={{ width: "100%", height: "150px" }}
          value={back}
        />{" "}
        <br />
      </form>
      <div style={{ justifyContent: "flex-start" }}>
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ marginLeft: "5px" }}
        >
          Done
        </button>
        <Link to={`/decks/${selectedDeck.id}`}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
          >
            Save
          </button>
        </Link>
      </div>
    </div>
  );
}
