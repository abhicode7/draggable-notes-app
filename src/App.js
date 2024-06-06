import './App.css';
import { useEffect, useState } from 'react';
import Notes from './components/Notes';
import notesData from './data/notesData';

function App() {

  const [notes, setNotes] = useState(localStorage.getItem("localnotes") ? JSON.parse(localStorage.getItem("localnotes")) : notesData);
 
  return (
    <div className="">
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
