import express from "express";
import * as UserControllers from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserControllers.AuthenticatedUser);
router.post("/signup", UserControllers.SignUp);
router.post("/signin", UserControllers.SignIn);
router.post("/signout", UserControllers.SignOut);

export default router;
