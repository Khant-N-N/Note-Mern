import { Card } from "react-bootstrap";
import { NoteType } from "../models/note";
import "../styles/noteCard.css";
import { convertDate } from "../utils/convertDate";

interface noteProps {
  note: NoteType;
}
const Note = ({ note }: noteProps) => {
  const { _id, title, text, createdAt, updatedAt } = note;

  const createUpdateDate: string =
    createdAt < updatedAt
      ? "Created at " + convertDate(createdAt)
      : "Updated at " + convertDate(updatedAt);

  return (
    <Card style={{ width: "20rem" }} className="cardContainer">
      <Card.Body
        style={{ maskImage: "linear-gradient(180deg, #000 60%, transparent)" }}
        className="cardBody"
      >
        <Card.Title>{title}</Card.Title>
        <Card.Text className="cardText">{text}</Card.Text>
        <span className="cover-tranparent" />
      </Card.Body>
      <Card.Footer>{createUpdateDate}</Card.Footer>
    </Card>
  );
};

export default Note;
