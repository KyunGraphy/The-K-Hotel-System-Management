import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import hotelRoute from "./routes/hotel.route.js";
import roomRoute from "./routes/room.route.js";

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
app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    methods: ["GET", "POST"]
  })
);
app.use(cookieParser());
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/hotel', hotelRoute)
app.use('/api/room', roomRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
})

app.listen(8800, () => {
  connect();
  console.log('Connecting to server')
});
