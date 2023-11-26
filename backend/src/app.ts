import express, { NextFunction, Request, Response } from "express";
import noteRoute from "./routes/note.route";
import userRoute from "./routes/user.route";
import morgan from "morgan"; //to show different api endpoints that runs on server
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import validEnv from "./utils/validEnv";
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: validEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: validEnv.MONGO,
    }),
  })
);

app.use("/api/notes", noteRoute);
app.use("/api/user", userRoute);

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
