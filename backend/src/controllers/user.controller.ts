import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const AuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    if (!authenticatedUserId) throw createHttpError(401, "Unauthorized");
    const user = await UserModel.findById(authenticatedUserId);
    if (!user) throw createHttpError(404, "user not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpType {
  email?: string;
  username?: string;
  password?: string;
}
export const SignUp: RequestHandler<unknown, unknown, SignUpType> = async (
  req,
  res,
  next
) => {
  const email = req.body.email;
  const username = req.body.username;
  const passwordRaw = req.body.password;
  try {
    if (!email) throw createHttpError(400, "Email is required");
    if (!username) throw createHttpError(400, "Username is required");
    if (!passwordRaw) throw createHttpError(400, "Password is required");

    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) throw createHttpError(409, "Email already exist.");

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    const CreateUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json(CreateUser);
  } catch (error) {
    next(error);
  }
};

interface LogInBody {
  email: string;
  password: string;
}

export const SignIn: RequestHandler<unknown, unknown, LogInBody> = async (
  req,
  res,
  next
) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!email) throw createHttpError(400, "Email is required");
    if (!passwordRaw) throw createHttpError(400, "Password is required");

    const user = await UserModel.findOne({ email: email })
      .select("+password")
      .exec();
    if (!user) throw createHttpError(401, "Invalid Credentials");

    const passwordMatch = await bcrypt.compare(passwordRaw, user.password);
    if (!passwordMatch) throw createHttpError(401, "Invalid Credential");

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const SignOut: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => (error ? next(error) : res.sendStatus(200)));
};
