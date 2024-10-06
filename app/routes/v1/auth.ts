import express, { Router } from "express";
import {
  getSession,
  signup,
  login,
  refreshAccessToken,
} from "../../controllers/user/auth";

export const router: Router = express.Router();

router.get("/get-session", getSession);
// TODO: Come up with a way to handle validating data coming in
// The figma link is in the readme so check it out and see the required
// inputs and stuctures of different things around the app
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
