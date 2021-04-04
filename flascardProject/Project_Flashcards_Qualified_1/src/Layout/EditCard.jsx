import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const [selectedDeck, setSelectedDeck] = useState([]);
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
      readCard(cardId, abortController.signal).then(setForm);
    });
  }, [deckId, cardId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(form).then(() => history.push(`/decks/${deckId}`));
  };

  const handleCancel = (event) => {
    event.preventDefault()
    history.push(`/decks/${selectedDeck.id}`) 
  }

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
