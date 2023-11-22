import { RequestHandler } from "express";
import NoteModel from "../models/note.model";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.id;
  try {
    const getNote = await NoteModel.findById(noteID);
    res.status(200).json(getNote);
  } catch (error) {
    next(error);
  }
};

export const createNote: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    const createdNote = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(createdNote);
  } catch (error) {
    next(error);
  }
};
