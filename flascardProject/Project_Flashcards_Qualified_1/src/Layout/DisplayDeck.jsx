import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { listDecks, readDeck } from "../utils/api"

export default function DisplayDeck() {
  const [displayDeck, setDisplayDeck] = useState([])
  const { deckId } = useParams()

  useEffect(() => {
    const abortController = new AbortController()
    listDecks().then(decks => {
      return decks.find(d => d.id === parseInt(deckId))
    })
    .then(deck => {
      readDeck(deck.id, abortController.signal).then(setDisplayDeck)

    })
    return () => abortController.abort()
  }, [deckId])

  const cardList = displayDeck && displayDeck.cards 
  const validCards = cardList && cardList.filter(card => !card.cards)

  const validCardList = validCards && validCards.map(card => (
        <div class="card">
          <div class="card-body">
            <div style={{ float: "left", width: "50%" }}>
              <p className="text-muted">{card.front}</p>
            </div>
            <div style={{ float: "right", width: "50%" }}>
              <p className="text-muted" style={{ float: "right" }}>{card.back}</p>
            </div>
            <br />
              <div>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  style={{ float: "right", marginLeft: "5px" }}
                  onClick
                  >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  style={{ float: "right"}}
                  >
                  Delete
                </button>
              </div>
          </div>
        </div>
  ))

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">{displayDeck.name}</li>
        </ol>
      </nav>
      <div>
        <h3>{displayDeck.name}</h3>
        <p>{displayDeck.description}</p>
      </div>
      <div>
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick
          >
          Edit
        </button>
        <Link to={`/decks/${displayDeck.id}/study`}>
          <button 
            type="button" 
            className="btn btn-primary" 
            style={{ marginLeft: "5px"}}
            onClick
            >
            Study
          </button>
        </Link>
        <Link to={`/decks/${displayDeck.id}/cards/new`}>
          <button 
            type="button" 
            className="btn btn-primary" 
            style={{ marginLeft: "5px"}}
            >
            Add Cards
          </button>
        </Link>
        <button 
          type="button" 
          className="btn btn-danger"
          style={{ float: "right" }}
          >
          Delete
        </button>
      </div>
      <br />
      <div>
        <h2>Cards</h2>
        <section className="column">{validCardList}</section>
      </div>
    </div>
  )
}