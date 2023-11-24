import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { NoteType } from "../models/note";

interface newNoteProps {
  onNoteSave: (note: NoteType) => void;
  onDismiss: () => void;
}
const AddNewNote = ({ onDismiss, onNoteSave }: newNoteProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  console.log(formData);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("api/notes/create", formData);
      onNoteSave(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
  };
  return (
    <Modal show onHide={onDismiss} className="bg-secondary">
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="py-3 px-2" id="addNewNote">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              placeholder="Enter Title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Note text</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              as="textarea"
              rows={4}
              placeholder="Enter Note"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="w-100 btn btn-primary text-light"
          type="submit"
          form="addNewNote"
          disabled={loading}
        >
          {loading ? "Saving" : "Save"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewNote;
