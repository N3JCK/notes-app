import { useEffect, useState, useRef } from 'react';
import './App.css';


function App() {

  type Note = {
    title: String;
    content: String;
  };

  const [notes, setNotes] = useState<Note[]>([]);

  // On load retrieves notes from local storage
  useEffect(() => {
    const notesJson = localStorage.getItem("notes");
    if (notesJson) {
      setNotes(JSON.parse(notesJson));
    }
  }, []);

  // Update notes in local storage
  useEffect(() => {
    console.log(notes)
    const notesJson = JSON.stringify(notes);
    localStorage.setItem("notes", notesJson);
  }, [notes]);
  
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputContentRef = useRef<HTMLTextAreaElement>(null);

  function addNote() {
    if (inputTitleRef.current && inputContentRef.current) {
      setNotes(prevNotes => [...prevNotes, {
        title: inputTitleRef.current?.value ?? '', 
        content: inputContentRef.current?.value ?? ''
      }]);
    }
  }

  function deleteNote(targetNote:Note) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note !== targetNote)
    })
  }


  return (
    <div id="app">
      <div className="container">
        <div className="add-note">
          <p>New Note</p>
          <input type="text" id="input-note-title" ref={inputTitleRef}/>
          <textarea id="input-note-content" ref={inputContentRef}/>
          <button onClick={addNote}>Add</button>
        </div>
        <div className="notes">
          {notes.length === 0 && <p>No notes found.</p>}
          {notes.reverse().map((note) => (
            <div className="note">
              <div className="note-title">
                <h5>{note.title}</h5>
                <button onClick={() => deleteNote(note)}>Delete</button>
              </div>
              <div className="note-content">{note.content}</div>
              <hr/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
