import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import { listDecks } from "../utils/api"

export default function EditDeck() {
  const [selectedDeck, setSelectedDeck] = useState([])
  const { deckId } = useParams()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("") 
  const handleNameChange = (event) => setName(event.target.value)
  const handleDescriptionChange = (event) => setDescription(event.target.value)

  useEffect(() => {
    const abortController = new AbortController()
    listDecks(abortController.signal).then(decks => {
      return decks.find(d => d.id === parseInt(deckId))
    })
    .then(setSelectedDeck)
  }, [deckId])

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">{selectedDeck.name}</li>
          <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form>
        <label htmlFor="name">Name</label> <br />
          <input
            id="name"
            type="text"
            name="name"
            placeholder={`${selectedDeck.name}`}
            onChange={handleNameChange}
            style={{ width: "100%" }}
            value={name}
          /> <br />
          <br />
        <label htmlFor="description">Description</label><br />
          <textarea
          id="description"
          type="text"
          name="description"
          placeholder={`${selectedDeck.description}`}
          onChange={handleDescriptionChange}
          style={{ width: "100%", height: "150px" }}
          value={description}
          /> <br />
      </form>
      <div style={{ justifyContent: "flex-start"}}>
        <Link to={`/decks/${selectedDeck.id}`}>
          <button type="button" class="btn btn-secondary" style={{ marginLeft : "5px" }}>Cancel</button>
        </Link>
        <button type="submit" class="btn btn-primary" style={{ marginLeft: "5px" }}>Submit</button>
      </div>
    </div>
  );
}