import './App.css';
import { useEffect, useState } from 'react';
import Notes from './components/Notes';
import notesData from './data/notesData';

function App() {
  // const [notes, setNotes] = useState([
  //   {
  //     id: 1,
  //     text: "Link in bio for my Frontend Interview Prep Course",
  //   },
  //   {
  //     id: 2,
  //     text: "Like this Video and Subscribe to Roadside Coder",
  //   },
  // ]);

  const [notes, setNotes] = useState(notesData);
 
  return (
    <div className="">
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
