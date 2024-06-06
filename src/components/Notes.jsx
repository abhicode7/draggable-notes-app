import React, { createRef, useEffect, useRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], setNotes = () => {} }) =>  {

  useEffect(() => {
    // Load saved notes from localStorage (if any)
    // localStorage.setItem("localnotes", JSON.stringify(notes));
    const savedNotes = JSON.parse(localStorage.getItem("localnotes"));

    const updatedNotes = notes.map((note) => {
      // Check if a saved version of the note exists
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote && savedNote.position) {
        // If a saved note exists, use it (extend this part to actually use saved data)
        return {...savedNote, position: savedNote.position};
      } else {
        // If no saved note exists, determine a new position
        const position = determinePosition();
        console.log(position);
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("localnotes", JSON.stringify(updatedNotes));
  }, [notes.length]); // Add setNotes to the dependency array


  const noteRefs = useRef([]);


  const determinePosition = () => {
    const maxWidth = window.innerWidth - 350;
    const maxHeight = window.innerHeight - 350;
    return {
      x: Math.floor(Math.random()*maxWidth),
      y: Math.floor(Math.random()*maxHeight),
    };
  };


  const handleDragStart = (e, note) => {
    const noteRef = noteRefs.current[note.id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPosition = note.position;

    console.log(offsetX, offsetY);
    // console.log(rect);

    const handleMouseMove = (e) => {

      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.top = `${newY}px`;
      noteRef.style.left = `${newX}px`;
    };

    const handleMouseUp = (e) => {
     document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = {
        x: finalRect.left,
        y: finalRect.top
      }; 

      if (checkForOverlap(note)) {
        // Check if the note is out of bounds

        noteRef.style.top = `${startPosition.y}px`;
      noteRef.style.left = `${startPosition.x}px`;
      // updatedNotePosition(note.id, startPosition);

      } else {
        updatedNotePosition(note.id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

  }

  const checkForOverlap = (note) => {
    // Check for overlap
    const currentNoteRef = noteRefs.current[note.id].current;
    const currentRect = currentNoteRef.getBoundingClientRect();

    return notes.some((n) => {
      if (n.id === note.id) {
        return false;
      }
      const otherNoteRef = noteRefs.current[n.id].current;
      const otherRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(currentRect.right < otherRect.left || 
        otherRect.right < currentRect.left || 
        currentRect.bottom < otherRect.top || 
        otherRect.bottom < currentRect.top);

      return overlap;
    });

      

  }

  const updatedNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, position: newPosition };
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
    localStorage.setItem("localnotes", JSON.stringify(updatedNotes));
  }

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note key={note.id} initialPosition={note.position} content={note.text} newRef={noteRefs.current[note.id]?noteRefs.current[note.id]:(noteRefs.current[note.id]=createRef())} 
        onMouseDown={(e)=> handleDragStart(e, note)}
        />
      ))}
    </div>
  );
};

export default Notes;
