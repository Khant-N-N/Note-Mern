import { useEffect, useState } from "react";
import { NoteType } from "./models/note";
import axios from "axios";
import Note from "./components/Note";
import Navbar from "./components/Navbar";
import AddEditNewNote from "./components/AddEditNewNote";

const App = () => {
  const [noteData, setNoteData] = useState<NoteType[]>([]);
  const [isAddNote, setIsAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNoteData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/notes/get-notes");
        setNoteData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert(error);
        setLoading(false);
      }
    };
    getNoteData();
  }, []);
  return (
    <main>
      <Navbar />
      <section className="container-fluid d-flex mt-3 justify-content-center">
        <button
          onClick={() => setIsAddNote(true)}
          style={{ width: "9rem", border: "none" }}
          className="py-2 rounded icons"
        >
          + New Note
        </button>
        {isAddNote && (
          <AddEditNewNote
            formID="NewForm"
            onNoteSave={(newNote) => {
              setIsAddNote(false);
              setNoteData([...noteData, newNote]);
            }}
            onDismiss={() => {
              setIsAddNote(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddEditNewNote
            formID="EditForm"
            noteToEdit={noteToEdit}
            onNoteSave={(newNote) => {
              setIsAddNote(false);
              setNoteData(() =>
                noteData.map((note) =>
                  note._id === newNote._id ? newNote : note
                )
              );
              setNoteToEdit(null);
            }}
            onDismiss={() => {
              setIsAddNote(false);
              setNoteToEdit(null);
            }}
          />
        )}
      </section>
      <section
        style={{ maxWidth: "1300px" }}
        className="container-fluid gap-4 row py-5 d-flex justify-content-center mx-auto"
      >
        {noteData?.length === 0 && (
          <div className="text-center">You don't have any note yet.</div>
        )}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          noteData?.map((note) => (
            <Note
              onNoteEdit={(note) => {
                setNoteToEdit(note);
                setIsAddNote(true);
              }}
              setNoteData={(id) =>
                setNoteData(noteData.filter((note) => note._id !== id))
              }
              note={note}
              key={note._id}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default App;
