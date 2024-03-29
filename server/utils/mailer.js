"use strict";
import nodemailer from 'nodemailer';
import { HTTPStatus } from '../constants/Constants.js';
import { createError } from './error.js';

export const bookingSuccessMailer = (reservation) => {
  const output = `
        <div style='
          min-width: 100%;
          height: 80px;
          background-color: #384e71;
        '>
          <div style='
            width: 80%;
            padding: 10px 40px;
            display: flex;
            text-align: center;
          '>
            <a href='http://localhost:3000/'>
              <span style="
                display: block;
                font-weight: bold;
                font-size: 20px;
                cursor: pointer;
                width: 60px;
                height: 60px;
                background: url(https://st2.depositphotos.com/3096625/8105/v/450/depositphotos_81057362-stock-illustration-k-letter-mockup-logo.jpg) no-repeat;
                background-size: cover;
                background-position: center;
                border-radius: 15px 32px;
              "></span>
            </a>
            <div style='color: white; padding: 10px 0 10px 240px; text-align: right;'>
              <span style='display: block'><b>Email:</b> kientrung1387@gmail.com</span>
              <span style='display: block'><b>Phone number:</b> 0933592344</span>
            </div>
          </div>
        </div>
        <h3 style='marginY: 8px'>✅ Thanks ${reservation.name}. Your Booking is Successfully!</h3>
        <h2 style='color: #384e71; text-transform: uppercase;'>${reservation.department}</h2>
        <div style='display: flex'>
          <h3 style='font-weight: bold; width: 180px; color: #384e71'>Your reservation:</h3>
          <p>${reservation.singleRoom} Single Room - ${reservation.doubleRoom} Double Room</p>
        </div>
        <hr>
        <div style='display: flex'>
        <h3 style='font-weight: bold; width: 180px; color: #384e71'>The Number of Guests:</h3>
        <p>${reservation.adult} Adult - ${reservation.children} Children</p>
        </div>
        <div style='display: flex'>
        <h3 style='font-weight: bold; width: 180px; color: #384e71'>Check In Date:</h3>
        <p>${(new Date(reservation.checkInDate)).toString()}</p>
        </div>
        <div style='display: flex'>
        <h3 style='font-weight: bold; width: 180px; color: #384e71'>Check Out Date:</h3>
        <p>${(new Date(reservation.checkOutDate)).toString()}</p>
        </div>
        <div style='display: flex'>
        <h3 style='font-weight: bold; width: 180px; color: #384e71'>Night:</h3>
        <p>${reservation.night}</p>
        </div>
        <div style='display: flex'>
        <h3 style='font-weight: bold; width: 180px; color: #384e71'>Payment Method:</h3>
        <p>${reservation.payment.method}</p>
        </div>
        <hr>
        <div style='display: flex'>
          <h3 style='font-weight: bold; width: 180px; color: #384e71'>Expense:</h3>
          <p>${reservation.price}$</p>
        </div>
        <div style='display: flex'>
          <h3 style='font-weight: bold; width: 180px; color: #384e71'>Tax:</h3>
          <p>${reservation.price * 0.1}$</p>
        </div>
        <div style='display: flex'>
          <h1 style='font-weight: bold; width: 180px; color: red'>Total fee:</h1>
          <h1 style='font-weight: bold'>${reservation.price + reservation.price * 0.1}$</h1>
        </div>
        <button style='
          border-radius: 4px; 
          border: 1px solid #384e71;
          padding: 5px 15px;
          background: #384e71
        '>
          <a 
          href='http://localhost:3000/reservation' 
          style='
            text-decoration: none; 
            color: #fff; 
            font-size: 16px; 
            font-weight: 700
          '>
            View Your Reservations
          </a>
        </button>
      `

  sendEmail('The K Hotel - Booking Successfully', output, reservation.email)
};

export const sendOTPMailer = (user, OTP, receiver) => {
  const output = `
        <div style='
          min-width: 100%;
          height: 80px;
          background-color: #384e71;
        '>
          <div style='
            width: 80%;
            padding: 10px 40px;
            display: flex;
            text-align: center;
          '>
            <a href='http://localhost:3000/'>
              <span style="
                display: block;
                font-weight: bold;
                font-size: 20px;
                cursor: pointer;
                width: 60px;
                height: 60px;
                background: url(https://st2.depositphotos.com/3096625/8105/v/450/depositphotos_81057362-stock-illustration-k-letter-mockup-logo.jpg) no-repeat;
                background-size: cover;
                background-position: center;
                border-radius: 15px 32px;
              "></span>
            </a>
            <div style='color: white; padding: 10px 0 10px 240px; text-align: right;'>
              <span style='display: block'><b>Email:</b> kientrung1387@gmail.com</span>
              <span style='display: block'><b>Phone number:</b> 0933592344</span>
            </div>
          </div>
        </div>
        <h3 style='marginY: 8px'>✅ Hi ${user.name}!</h3>
        <h3 style='text-transform: uppercase;'>The OTP code below is used to authenticate the user in recovering the password.</h3>
        <h3 style='text-transform: uppercase;'>Please keep it confidential and do not share it with anyone.</h3>
        <h1 style='color: #384e71'>${OTP}</h1>
      `

  sendEmail('The K Hotel - Recover account OTP', output, receiver)
}

// HANDLE SEND EMAIL
function sendEmail(emailTitle, emailContent, receiver) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secureConnection: false,
    // requireTLC: true,
    // requireTLS: true,
    auth: {
      user: 'kientrung1387@gmail.com',
      pass: 'hzrryherepsksipc'
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });

  // setup email data with unicode symbols
  var mailOptions = {
    from: '"The K Hotel" <kientrung1387@gmail.com>', // sender address
    to: receiver,
    subject: emailTitle, // Subject line
    text: 'Hello world?', // plain text body
    html: emailContent // html body
  };

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(createError(HTTPStatus.NOT_ACCEPT, 'Something went wrong'))
    }
    return next()
  });
}
