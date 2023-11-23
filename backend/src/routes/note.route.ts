import express from "express";
import * as noteControllers from "../controllers/note.controller";
// const app = express(); //d lo m lok bu nauk htet server ta khu m lo chin loh

const router = express.Router();

router.get("/get-notes", noteControllers.getNotes);
router.get("/get-note/:id", noteControllers.getNote);
router.post("/create", noteControllers.createNote);
router.patch("/update/:id", noteControllers.updateNote);
router.delete("/delete/:id", noteControllers.deleteNote);

export default router;
