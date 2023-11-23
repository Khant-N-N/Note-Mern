import express, { NextFunction, Request, Response } from "express";
import noteRoute from "./routes/note.route";
import morgan from "morgan"; //to show different api endpoints that runs on server
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/notes", noteRoute);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
});

export default app;
