import { useEffect, useState } from "react";
import { NoteType } from "./models/note";
import axios from "axios";

const App = () => {
  const [noteData, setNoteData] = useState<NoteType[]>([]);
  useEffect(() => {
    const getNoteData = async () => {
      try {
        const response = await axios.get("/api/notes/get-notes");

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getNoteData();
  }, []);
  return <></>;
};

export default App;
