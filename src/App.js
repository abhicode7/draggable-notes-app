import './App.css';
import { useEffect, useState } from 'react';
import Notes from './components/Notes';
import notesData from './data/notesData';

function App() {

  const [notes, setNotes] = useState(localStorage.getItem("localnotes") ? JSON.parse(localStorage.getItem("localnotes")) : notesData);

  const onClick = () => {
    setNotes([...notes, { id: Date.now(), text: "New Note"}])
  }
 
  return (
    <div className="">
      <button onClick={onClick} className='absolute top-0 right-1/2 translate-x-1/2 bg-gradient-to-r from-[#C7FF50] to-[#1FC39C] opacity-100 hover:opacity-80 duration-300 active:scale-95 active:opacity-50  px-8 py-3 text-[#073929] font-medium mt-4 rounded z-10'>ADD NOTE 📝</button>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
