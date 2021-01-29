import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { createCard, readDeck } from "../utils/api";

export default function AddCard() {
  const [selectedDeck, setSelectedDeck] = useState([]);
  const { deckId } = useParams();
  const [form, setForm] = useState({
    front: "",
    back: "",
  })
  const handleFrontChange = (event) => pushVar({ front: event.target.value });
  const handleBackChange = (event) => pushVar({ back: event.target.value });
  const history = useHistory()


  const pushVar = (values) => {
    setForm({ ...form, ...values })
  }

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setSelectedDeck)

    return () => abortController.abort();
  }, [deckId]);

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
  );
}
