import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { NoteType } from "../models/note";

interface newNoteProps {
  formID: string;
  noteToEdit?: NoteType | null;
  onNoteSave: (note: NoteType) => void;
  onDismiss: () => void;
}
const AddEditNewNote = ({
  formID,
  noteToEdit,
  onDismiss,
  onNoteSave,
}: newNoteProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: noteToEdit?.title || "",
    text: noteToEdit?.text || "",
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let res;
      if (noteToEdit) {
        res = await axios.patch(
          `/api/notes/update/${noteToEdit._id}`,
          formData
        );
      } else {
        res = await axios.post("/api/notes/create", formData);
      }
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
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="py-3 px-2" id={formID}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
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
              value={formData.text}
              as="textarea"
              rows={4}
              placeholder="Enter Note"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="w-100 btn btn-dark text-light"
          type="submit"
          form={formID}
          disabled={loading}
        >
          {loading ? "Saving" : "Save"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNewNote;
