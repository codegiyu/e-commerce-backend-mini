import express, { Router } from 'express';
import { sayHello } from '../../controllers/test';

export const router: Router = express.Router();

router.get('/', sayHello);