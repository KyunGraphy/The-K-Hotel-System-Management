import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB.');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log('mongodb disconnected');
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json())

app.listen(8800, () => {
  connect();
  console.log('Connecting to server')
});
