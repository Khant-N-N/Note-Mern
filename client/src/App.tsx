import { useEffect, useState } from "react";
import { NoteType } from "./models/note";
import axios from "axios";
import Note from "./components/Note";
import Navbar from "./components/Navbar";

const App = () => {
  const [noteData, setNoteData] = useState<NoteType[]>([]);
  useEffect(() => {
    const getNoteData = async () => {
      try {
        const response = await axios.get("/api/notes/get-notes");
        setNoteData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getNoteData();
  }, []);
  return (
    <main>
      <Navbar />
      <section className="container-fluid gap-4 row py-5 d-flex justify-content-center">
        {noteData?.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </section>
    </main>
  );
};

export default App;
