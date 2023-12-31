import { Card } from "react-bootstrap";
import { NoteType } from "../models/note";
import "../styles/noteCard.css";
import { convertDate } from "../utils/convertDate";
import { IoTrash } from "react-icons/io5";
import { ImPencil } from "react-icons/im";
import { useState } from "react";
import axios from "axios";

interface noteProps {
  onNoteEdit: (note: NoteType) => void;
  note: NoteType;
  setNoteData: (id: string) => void;
}
const Note = ({ note, onNoteEdit, setNoteData }: noteProps) => {
  const { _id, title, text, createdAt, updatedAt } = note;
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const createUpdateDate: string =
    createdAt === updatedAt
      ? "Created at " + convertDate(createdAt)
      : "Updated at " + convertDate(updatedAt);

  const deleteNote = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`/api/notes/delete/${id}`);

      setNoteData(id);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card className="cardContainer z-1">
      <div
        className="position-absolute d-flex gap-2 end-0 top-0 p-2 z-2"
        style={{ fontSize: "1.1rem", backgroundColor: "rgba(41, 37, 29, .8)" }}
      >
        {!isDelete && (
          <ImPencil onClick={() => onNoteEdit(note)} className="icons" />
        )}
        {!isDelete && (
          <IoTrash className="icons" onClick={() => setIsDelete(true)} />
        )}
        {isDelete && (
          <p className="bg-secondary text-light text-center py-3 px-1 rounded">
            Please confirm to delete your note <br />{" "}
            <button
              disabled={loading}
              style={{ border: "none" }}
              className="bg-secondary-subtle px-3 py-2 icons rounded mt-2"
              onClick={() => setIsDelete(false)}
            >
              Cancel
            </button>{" "}
            <button
              disabled={loading}
              onClick={() => deleteNote(_id)}
              style={{ border: "none" }}
              className="bg-danger px-3 py-2 icons rounded mt-2 ms-1"
            >
              Delete
            </button>
          </p>
        )}
      </div>
      <Card.Body className="cardBody">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="cardText">{text}</Card.Text>
        <span className="cover-tranparent" />
      </Card.Body>
      <Card.Footer className="text-secondary">{createUpdateDate}</Card.Footer>
    </Card>
  );
};

export default Note;
