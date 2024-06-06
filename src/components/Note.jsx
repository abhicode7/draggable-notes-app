import React, { useState, useRef, forwardRef, useEffect } from 'react';

const Note = ({ newRef, editingRef, content, setNotes, notes, note, initialPosition = { x: 0, y: 0 }, ...props }, ref) => {
  const [isEditing, setIsEditing] = useState(false); // State to track if the note is being edited
  const [noteContent, setNoteContent] = useState(content); // State to track the content of the note
  const inputRef = useRef(null);

  useEffect(() => {
    editingRef.current = isEditing;
  }, [isEditing, editingRef]);
  
  // Function to handle double-click event to enable editing
  const handleDoubleClick = () => {
    setIsEditing(true);
    
    // Focus the input field after setting it to editable
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  // Function to handle change in the input field
  const handleChange = (event) => {
    setNoteContent(event.target.value);
    
  };

  // Function to handle blur event to disable editing
  const handleBlur = () => {
    setIsEditing(false);
    

    const newNotes = notes.map((n) => 
      n.id === note.id ? { ...n, text: noteContent } : n
    );
    setNotes(newNotes);
    localStorage.setItem("localnotes", JSON.stringify(newNotes));
    // console.log(localStorage.getItem("localnotes"));

  };

  return (
    <div
      ref={newRef}
      className="absolute border-[2px] border-black cursor-move select-none p-4 w-[300px] bg-yellow-300 text-xl"
      style={{ top: initialPosition.y, left: initialPosition.x }}
      onDoubleClick={handleDoubleClick} // Enable editing on double-click
      {...props}
    >
      📌 
      {isEditing ? (
        <input
          ref={inputRef}
          value={noteContent}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full bg-yellow-300 border-none outline-none text-xl"
        />
      ) : (
        noteContent
      )}
    </div>
  );
};

export default Note;
