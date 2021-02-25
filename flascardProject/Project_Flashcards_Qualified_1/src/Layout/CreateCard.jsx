import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { createCard, readCard, readDeck, updateCard } from "../utils/api";

export default function CreateCard(props) {
  const { edit } = props
  const [selectedDeck, setSelectedDeck] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const { deckId, cardId } = useParams();
  const [form, setForm] = useState({
    front: "",
    back: "",
  });
  const handleFrontChange = (event) => setVar({ front: event.target.value });
  const handleBackChange = (event) => setVar({ back: event.target.value });
  const history = useHistory()

  const setVar = (values) => {
    setForm({ ...form, ...values });
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (edit === "true") {
      setVar({id: cardId, deckId: parseInt(deckId)})
      readDeck(deckId, abortController.signal).then((deck) => {
        setSelectedDeck(deck);
        readCard(cardId, abortController.signal).then(setSelectedCard);
      });
    }
    readDeck(deckId, abortController.signal).then((deck) => setSelectedDeck(deck))
    console.log(deckId, selectedDeck)
  }, [deckId, cardId, edit]);

  return edit === "true" ? (
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
  ) : (
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
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{selectedDeck.name + ": Add Card"}</h3>
      <form onSubmit={() => {
        createCard(deckId, form)
        history.push(`/decks/${selectedDeck.id}`)
      }}>
        <label htmlFor="name">Front</label> <br />
        <textarea
          id="name"
          type="text"
          name="name"
          placeholder="Front side of card"
          onChange={handleFrontChange}
          style={{ width: "100%", height: "150px" }}
          value={form.front}
        />{" "}
        <br />
        <br />
        <label htmlFor="description">Back</label>
        <br />
        <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Back side of card"
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
  )
}
