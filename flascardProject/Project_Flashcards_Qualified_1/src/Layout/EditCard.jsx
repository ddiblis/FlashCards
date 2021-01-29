import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readCard, readDeck, updateCard } from "../utils/api";

export default function EditCard() {
  const [selectedDeck, setSelectedDeck] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const { deckId, cardId } = useParams();
  const [form, setForm] = useState({
    front: "",
    back: "",
    id: cardId,
    deckId: parseInt(deckId),
  });
  const handleFrontChange = (event) => setVar({ front: event.target.value });
  const handleBackChange = (event) => setVar({ back: event.target.value });
  const history = useHistory();

  const setVar = (values) => {
    setForm({ ...form, ...values });
  };

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
      <form
        onSubmit={() => {
          updateCard(form);
          history.push(`/decks/${deckId}`);
        }}
      >
        <label htmlFor="front">Front</label> <br />
        <textarea
          id="front"
          type="text"
          name="front"
          defaultValue={selectedCard.front}
          onChange={handleFrontChange}
          style={{ width: "100%", height: "150px" }}
          value={form.front}
        />{" "}
        <br />
        <br />
        <label htmlFor="back">Back</label>
        <br />
        <textarea
          id="back"
          type="text"
          name="back"
          defaultValue={selectedCard.back}
          onChange={handleBackChange}
          style={{ width: "100%", height: "150px" }}
          value={form.back}
        />{" "}
        <br />
        <div style={{ justifyContent: "flex-start" }}>
          <Link to={`/decks/${selectedDeck.id}`}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginLeft: "5px" }}
            >
              Done
            </button>
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
