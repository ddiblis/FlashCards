import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export default function CreateDeck() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const handleNameChange = (event) => pushVar({ name: event.target.value });
  const handleDescriptionChange = (event) =>
    pushVar({ description: event.target.value });
  const history = useHistory();

  const pushVar = (values) => {
    setForm({ ...form, ...values });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(form).then(() => history.push());
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1> Create Deck</h1>
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
