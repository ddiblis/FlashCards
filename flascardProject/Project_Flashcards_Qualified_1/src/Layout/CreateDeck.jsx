import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"

export default function CreateDeck() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("") 
  const handleNameChange = (event) => setName(event.target.value)
  const handleDescriptionChange = (event) => setDescription(event.target.value)
  const history = useHistory()

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1> Create Deck</h1>
      <form>
        <label htmlFor="name">Name</label> <br />
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Deck Name"
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
          placeholder="Brief description of the deck"
          onChange={handleDescriptionChange}
          style={{ width: "100%", height: "150px" }}
          value={description}
          /> <br />
      </form>
      <div style={{ justifyContent: "flex-start"}}>
        <button type="submit" class="btn btn-primary" style={{ marginLeft: "5px" }}>Submit</button>
        <button type="button" class="btn btn-secondary" style={{ marginLeft : "5px" }} onClick={() => history.push("/")}>Cancel</button>
      </div>
    </div>
  );
}