import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  const [form, setForm] = useState({
    name: "",
    description: ""
  })
  const handleNameChange = (event) => pushVar({ name: event.target.value });
  const handleDescriptionChange = (event) => pushVar({ description: event.target.value });
  const history = useHistory();

  const pushVar = (values) => {
    setForm({ ...form, ...values })
  }



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
      <form onSubmit={() => {
        createDeck(form)
        history.push("/")
      }}>
        <label htmlFor="name">Name</label> <br />
        <input
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
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
          >
            Submit
          </button>
          <Link to="/">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginLeft: "5px" }}
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
