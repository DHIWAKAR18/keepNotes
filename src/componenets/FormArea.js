import { Fab, TextField } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import "../styles/formarea.css";

function FormArea({ addNote }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  function clickHandler() {
    console.log(note);
    if (note.content === "" && note.title === "") return;
    addNote(note);

    setNote({
      title: "",
      content: "",
    });
    let values = JSON.parse(localStorage.getItem("notes"));
    values.push(note);
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(values));
  }
  function changeHandler(event) {
    // console.log(event.target.value)
    const { name, value } = event.target;
    setNote((preValues) => {
      return {
        ...preValues,
        [name]: value,
      };
    });
  }

  return (
    <div className="formArea">
      <form className="form">
        <TextField
          onChange={changeHandler}
          name="title"
          fullWidth
          value={note.title}
          label="Title"
          autoComplete="off"
          id="text"
        />
        <TextField
          onChange={changeHandler}
          name="content"
          value={note.content}
          id="text"
          label="Content"
          multiline
          rows={4}
          fullWidth
          autoComplete="off"
        />
        <button onClick={clickHandler}>
          <AddIcon />
          Add
        </button>
      </form>
    </div>
  );
}

export default FormArea;
