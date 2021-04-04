import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
  const { deckId } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    id: deckId,
  });
  const handleNameChange = (event) => pushVar({ name: event.target.value });
  const handleDescriptionChange = (event) =>
    pushVar({ description: event.target.value });
  const history = useHistory();

  const pushVar = (values) => {
    setForm({ ...form, ...values });
  };

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setForm);

    return () => abortController.abort();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(form).then(() => history.push(`/decks/${deckId}`));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${form.id}`);
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {form.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm
        handleDescriptionChange={handleDescriptionChange}
        handleNameChange={handleNameChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        form={form}
      />
    </div>
  );
}
