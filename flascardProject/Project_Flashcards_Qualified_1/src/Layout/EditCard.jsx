import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import {listDecks, readCard } from "../utils/api"

export default function EditCard() {
    const [selectedDeck, setSelectedDeck] = useState([])
    const [selectedCard, setSelectedCard] = useState([])
    const { deckId, cardId } = useParams()
    const [front, setFront] = useState("")
    const [back, setBack] = useState("")
    const handleFrontChange = (event) => setFront(event.target.value)
    const handleBackChange = (event) => setBack(event.target.value)
    useEffect(() => {
      const abortController = new AbortController()
      listDecks(abortController.signal).then(decks => {
        return decks.find(deck => deck.id === parseInt(deckId))
      })
      .then(deck => {
        setSelectedDeck(deck)
        readCard(cardId, abortController.signal).then(setSelectedCard)
      })
    }, [deckId,cardId])
    
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page"><Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{"Edit Card " + cardId}</li>
          </ol>
        </nav>
        <h3>Edit Card</h3>
        <form>
          <label htmlFor="name">Front</label> <br />
            <textarea
              id="name"
              type="text"
              name="name"
              placeholder={`${selectedCard.front}`}
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
              placeholder={`${selectedCard.back}`}
              onChange={handleBackChange}
              style={{ width: "100%", height: "150px" }}
              value={back}
              /> <br />
          </form>
          <div style={{ justifyContent: "flex-start"}}>
            <button type="submit" className="btn btn-secondary" style={{ marginLeft: "5px" }}>Done</button>
            <Link to={`/decks/${selectedDeck.id}`}>
              <button type="button" className="btn btn-primary" style={{ marginLeft : "5px" }}>Save</button>
            </Link>
          </div>
        </div>
      );
     }
        