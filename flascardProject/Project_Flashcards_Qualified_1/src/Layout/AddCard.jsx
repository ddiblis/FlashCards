import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const [selectedDeck, setSelectedDeck] = useState([]);
  const { deckId } = useParams();
  const [form, setForm] = useState({
    front: "",
    back: "",
  });
  const handleFrontChange = (event) => pushVar({ front: event.target.value });
  const handleBackChange = (event) => pushVar({ back: event.target.value });
  const history = useHistory();

  const pushVar = (values) => {
    setForm({ ...form, ...values });
  };

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setSelectedDeck);

    return () => abortController.abort();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, form).then(() =>
      history.push(`/decks/${selectedDeck.id}`)
    );
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${selectedDeck.id}`);
  };

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
      <CardForm
        handleBackChange={handleBackChange}
        handleCancel={handleCancel}
        handleFrontChange={handleFrontChange}
        handleSubmit={handleSubmit}
        form={form}
      />
    </div>
  );
}
