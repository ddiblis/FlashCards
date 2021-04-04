import React from 'react'

export default function DeckForm(props) {
  const { handleSubmit, handleNameChange, form, handleDescriptionChange, handleCancel } = props

  return (
      <form onSubmit={handleSubmit}>
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
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginLeft: "5px" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
        </div>
      </form>
  )
}