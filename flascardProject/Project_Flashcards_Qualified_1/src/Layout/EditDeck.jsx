import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { readDeck } from "../utils/api";

export default function EditDeck() {
  const [selectedDeck, setSelectedDeck] = useState([]);
  const { deckId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleNameChange = (event) => setName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setSelectedDeck);

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
            {selectedDeck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form>
        <label htmlFor="name">Name</label> <br />
        <textarea
          id="name"
          type="text"
          name="name"
          onChange={handleNameChange}
          defaultValue={`${selectedDeck.name}`}
          style={{ width: "100%" }}
          value={name}
        />{" "}
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          type="text"
          name="description"
          defaultValue={selectedDeck.description}
          onChange={handleDescriptionChange}
          style={{ width: "100%", height: "150px" }}
          value={description}
        />{" "}
        <br />
      </form>
      <div style={{ justifyContent: "flex-start" }}>
        <Link to={`/decks/${selectedDeck.id}`}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "5px" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
