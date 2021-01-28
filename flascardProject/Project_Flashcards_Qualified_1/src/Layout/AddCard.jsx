import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { listDecks } from "../utils/api"

export default function AddCard() {
  const [selectedDeck, setSelectedDeck] = useState([])
  const { deckId } = useParams()
  const [front, setFront] = useState("")
  const [back, setBack] = useState("")
  const handleFrontChange = (event) => setFront(event.target.value)
  const handleBackChange = (event) => setBack(event.target.value)

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((decks) => {
        return decks.find((d) => d.id === parseInt(deckId));
      })
      .then(setSelectedDeck)

    return () => abortController.abort();
  }, [deckId]);

    return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page"><Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <h3>{selectedDeck.name + ": Add Card"}</h3>
      <form>
        <label htmlFor="name">Front</label> <br />
          <textarea
            id="name"
            type="text"
            name="name"
            placeholder="Front side of card"
            onChange={handleFrontChange}
            style={{ width: "100%", height: "150px" }}
            value={front}
          /> <br />
          <br />
        <label htmlFor="description">Back</label><br />
          <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Back side of card"
          onChange={handleBackChange}
          style={{ width: "100%", height: "150px" }}
          value={back}
          /> <br />
      </form>
      <div style={{ justifyContent: "flex-start"}}>
        <button type="submit" class="btn btn-secondary" style={{ marginLeft: "5px" }}>Done</button>
        <Link to={`/decks/${selectedDeck.id}`}>
          <button type="button" class="btn btn-primary" style={{ marginLeft : "5px" }}>Save</button>
        </Link>
      </div>
    </div>
  );
}