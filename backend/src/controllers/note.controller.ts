import { RequestHandler } from "express";
import NoteModel from "../models/note.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    if (!mongoose.isValidObjectId(noteID))
      throw createHttpError(400, "Invalid Note ID");

    const getNote = await NoteModel.findById(noteID).exec();

    if (!getNote) throw createHttpError(404, "note does not exist.");
    res.status(200).json(getNote);
  } catch (error) {
    next(error);
  }
};

interface createNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  createNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) throw createHttpError(400, "Title must not empty");

    const createdNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(createdNote);
  } catch (error) {
    next(error);
  }
};

interface noteUpdateParams {
  id: string;
}

interface noteUpdateBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  noteUpdateParams,
  unknown,
  noteUpdateBody,
  unknown
> = async (req, res, next) => {
  const noteID = req.params.id;
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!mongoose.isValidObjectId(noteID))
      throw createHttpError(400, "Invalid Note ID");

    if (!title) throw createHttpError(400, "Title must not empty.");

    const note = await NoteModel.findById(noteID).exec();
    if (!note) throw createHttpError(404, "Note not found!");

    note.title = title;
    note.text = text;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.id;
  try {
    if (!mongoose.isValidObjectId(noteID))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(noteID).exec();
    if (!note) throw createHttpError(404, "Note not found!");
    await NoteModel.findByIdAndDelete(noteID);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
