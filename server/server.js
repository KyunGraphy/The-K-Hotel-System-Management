import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import hotelRoute from "./routes/hotel.route.js";
import roomRoute from "./routes/room.route.js";
import commentRoute from "./routes/comment.route.js";
import reservationRoute from "./routes/reservation.route.js";
import facilityRoute from "./routes/facility.route.js";
import serviceRoute from "./routes/service.route.js";
import requestRoute from "./routes/request.route.js";

const app = express();

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
app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/hotel', hotelRoute)
app.use('/api/room', roomRoute)
app.use('/api/comment', commentRoute)
app.use('/api/reservation', reservationRoute)
app.use('/api/facility', facilityRoute)
app.use('/api/service', serviceRoute)
app.use('/api/request', requestRoute)

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
  console.log(`Connecting to server port ${8800}`);
});
