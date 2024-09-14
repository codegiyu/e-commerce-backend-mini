import express, { Router } from 'express';
import { getSession, signup, login } from '../../controllers/auth';

export const router: Router = express.Router();

router.get('/get-session', getSession);
// TODO: Come up with a way to handle validating data coming in
// The figma link is in the readme so check it out and see the required 
// inputs and stuctures of different things around the app
router.post('/signup', signup);
router.post('/login', login);

// Create the controller and GET endpoint for a refresh request. It's purpose is to refresh the access token.
// The frontend can fire this request if no authenticated request has been made from the user in a while and the access token is about to expire.
// They can't read the tokens in cookies, but counting the time from the last authenticated request, they should be able to tell when the access token will expire.