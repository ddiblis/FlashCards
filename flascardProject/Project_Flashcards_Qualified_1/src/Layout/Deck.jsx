import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import {listDecks } from "../utils/api"

export default function Deck({ deck }) {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
      listDecks().then(d => {
        const cards = d.find(d2 => d2.id === deck.id).cards
        setCardList(cards)
      })
  }, [deck.id])

  const noOfCards = cardList && cardList.filter((card) => !card.cards).length;

  return (
    <div className="card" style={{ margin: "5px" }}>
      <div className="card-body">
        <div style={{ justifyContent: "space-between" }}>
          <p className="text-muted" style={{ float: "right" }}>{noOfCards + " cards"}</p>
          <h5 className="card-title">{deck.name}</h5>
        </div>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`}>
            <button 
            type="button" 
            className="btn btn-secondary" 
            >
            View
            </button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button 
          type="button" 
          className="btn btn-primary" 
          style={{ marginLeft: "5px"}}
          >
          Study
          </button>
        </Link>
        <button 
        type="button" 
        className="btn btn-danger"
        style={{ float: "right" }}
        // onClick={() => deleteDeck(deck.id)}
        >
        Delete
        </button>
      </div>
    </div>
  );
}