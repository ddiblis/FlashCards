import React from "react"

export default function CardForm(props){
  const { handleBackChange, handleCancel, handleFrontChange, handleSubmit, form } = props

  return (
      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Front</label> <br />
        <textarea
          id="name"
          type="text"
          name="name"
          placeholder="Front side of card"
          onChange={handleFrontChange}
          style={{ width: "100%", height: "150px" }}
          value={form.front}
        />{" "}
        <br />
        <br />
        <label htmlFor="description">Back</label>
        <br />
        <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Back side of card"
          onChange={handleBackChange}
          style={{ width: "100%", height: "150px" }}
          value={form.back}
        />{" "}
        <br />
        <div style={{ justifyContent: "flex-start" }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginLeft: "5px" }}
              onClick={handleCancel}
            >
              Done
            </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: "5px" }}
          >
            Save
          </button>
        </div>
      </form>
  )
}