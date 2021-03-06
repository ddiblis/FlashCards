import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { createDeck, readDeck, updateDeck } from "../utils/api";

export default function CreateDeck(props) {
  const { edit } = props
  const [selectedDeck, setSelectedDeck] = useState([]);
  const { deckId } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
  })
  const handleNameChange = (event) => pushVar({ name: event.target.value});
  const handleDescriptionChange = (event) => pushVar({ description: event.target.value});
  const history = useHistory()


  const pushVar = (values) => {
    setForm({ ...form, ...values })
  }

  useEffect(() => {
    if(edit === "true") { 
      pushVar({id: deckId})
      const abortController = new AbortController();
      readDeck(deckId, abortController.signal).then(setSelectedDeck);

      return () => abortController.abort();
    }
  }, [deckId, edit]);  


  return edit === "true" ? (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deckId}`}>{selectedDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={() => {
        updateDeck(form)
        history.push(`/decks/${deckId}`)
      }}>
        <label htmlFor="name">Name</label> <br />
        <textarea
          id="name"
          type="text"
          name="name"
          onChange={handleNameChange}
          defaultValue={selectedDeck.name}
          style={{ width: "100%" }}
          value={form.name}
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
          value={form.description}
        />{" "}
        <br />
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
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={() => {
        createDeck(form)
        history.push(`/`)
      }}>
        <label htmlFor="name">Name</label> <br />
        <textarea
          id="name"
          type="text"
          name="name"
          placeholder="Deck Name"
          onChange={handleNameChange}
          style={{ width: "100%" }}
          value={form.name}
        />{" "}
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Brief description of the deck"
          onChange={handleDescriptionChange}
          style={{ width: "100%", height: "150px" }}
          value={form.description}
        />{" "}
        <br />
        <div style={{ justifyContent: "flex-start" }}>
          <Link to={`/`}>
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
      </form>
    </div>
  )
}
