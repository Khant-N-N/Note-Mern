import mongoose from "mongoose";
import "dotenv/config";
import env from "./utils/validEnv";
import app from "./app";
const port = env.PORT;

mongoose
  .connect(env.MONGO)
  .then(() => {
    app.listen(port, () => {
      console.log("server is running on port: ", port);
    });
    console.log("Connected to mongodb");
  })
  .catch(console.error);
