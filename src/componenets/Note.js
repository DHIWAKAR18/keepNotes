import { Button } from "@mui/material";
import React, { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import "../styles/note.css";

function Note({
  title,
  content,
  id,
  delNote,
  dragStart,
  dragEnter,
  index,
  drop,
  notes,
  setNotes,
}) {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const editRef = useRef("");
  const updateRef = useRef("");
  

  function clickHandler() {
    delNote(id);
  }
  function handleEdit() {
    titleRef.current.setAttribute("contenteditable", "true");
    contentRef.current.setAttribute("contenteditable", "true");
    editRef.current.style.display = "none";
    updateRef.current.style.display = "inline-flex";
    console.log(id);
  }
  function handleUpdate() {
    titleRef.current.setAttribute("contenteditable", "false");
    contentRef.current.setAttribute("contenteditable", "false");
    updateRef.current.style.display = "none";
    editRef.current.style.display = "inline-flex";
    let notesArr = [...notes];

    notesArr.forEach((e, index) => {
      if (id === index) {
        e.title = titleRef.current.innerHTML;
        e.content = contentRef.current.innerHTML;
      }
    });
    setNotes(notesArr);
        localStorage.removeItem("notes");
        localStorage.setItem("notes", JSON.stringify(notesArr));
  }
  return (
    <div
      className="note"
      draggable={true}
      onDragStart={(e) => {
        dragStart(e, index);
      }}
      onDragEnter={(e) => dragEnter(e, index)}
      onDragEnd={drop}
    >
      <h1  ref={titleRef}>{title}</h1>
      <p  ref={contentRef}>{content}</p>
      <Button ref={editRef} onClick={handleEdit}>
        <EditIcon/>
      </Button>
      <Button
        style={{ display: "none" }}
        ref={updateRef}
        onClick={handleUpdate}
      >
       <DoneIcon/>
      </Button>
      <Button onClick={clickHandler} style={{ marginLeft: "120px" }}>
        <DeleteIcon style={{ color: "red" }} />
      </Button>
    </div>
  );
}

export default Note;
