import mongoose from 'mongoose';
import { assertENV } from '../lib/utils/typechecks';
import { config } from 'dotenv';

config();

const MONGO_URL = assertENV(process.env.MONGO_URL, {
  message: 'Please add the MONGO_URL variable to your .env file',
});

export async function connectDB() {
  return mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to db successfully'))
  .catch(err => console.log('Error connecting to db', err));
}
