import React, { useEffect, useState, Fragment } from "react"
import { useHistory, useParams, Link } from "react-router-dom"

import { listDecks, listCards } from "../utils/api"

export default function StudyDeck() {
  const [selectedDeck, setSelectedDeck] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const { deckId } = useParams();
  const history = useHistory()

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((decks) => {
        return decks.find((d) => d.id === parseInt(deckId));
      })
      .then((deck) => {
        setSelectedDeck(deck);
        listCards(deck.id, abortController.signal).then(setCardList);
      });
    return () => abortController.abort();
  }, [deckId]);

  if (cardList.length === 0) return <Fragment />;
  const validCards = cardList.filter((card) => !card.cards);

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page"><Link to={`/decks/${selectedDeck.id}`}>{selectedDeck.name}</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <h1> {"Study: " + selectedDeck.name}</h1>
      {validCards.length > 2 ? (
        <Fragment>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {selectedCard + 1 + " of " + validCards.length}
            </h5>
            {!flipped ? (
              <Fragment>
                <p class="card-text">{validCards[selectedCard].front}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ float: "left" }}
                  onClick={() => setFlipped(true)}
                >
                  Flip
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <p class="card-text">{validCards[selectedCard].back}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ float: "left" }}
                  onClick={() => setFlipped(false)}
                >
                  Flip
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ float: "left", marginLeft: "5px" }}
                  onClick={() => {
                    const nextCard = selectedCard + 1
                    if(validCards[nextCard]) {
                    setSelectedCard(nextCard)
                    setFlipped(false)
                    }
                    else if (window.confirm("Restart Cards?")) {
                      setSelectedCard(0)
                      setFlipped(false)
                    }
                    else {
                      history.push("/")
                    }
                  }}
                >
                  Next
                </button>
              </Fragment>
            )}
        </div>
      </div>
        </Fragment>
      ) : (
        <Fragment>
          <h3>Not enough cards.</h3>
          <p>{"You need at least 3 cards to study. There are " + validCards.length + " cards in the deck."} </p>
          <Link to={`/decks/${selectedDeck.id}/cards/new`}>
            <button 
                type="button" 
                className="btn btn-primary" 
                style={{ marginLeft: "5px"}}
                onClick
                >
                Add Cards
            </button>
          </Link>
        </Fragment>
      )}
    </div>
  );
}