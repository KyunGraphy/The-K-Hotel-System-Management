"use strict";
import nodemailer from 'nodemailer';

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
                background: url(https://scontent.xx.fbcdn.net/v/t1.15752-9/409963123_399921459061779_6508682817760566410_n.png?_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_ohc=ItfQXpC9H9gAX-Q5-dw&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdT91CG1WruBHhjI9fRNdpff_wo1DEVfPSOsa1IyphMzcw&oe=65B63984) no-repeat;
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
        <h3 style='font-weight: bold; width: 180px; color: #384e71'>Payment Method:</h3>
        <p>${reservation.payment.method}</p>
        </div>
        <hr>
        <div style='display: flex'>
          <h3 style='font-weight: bold; width: 180px; color: #384e71'>Expense:</h3>
          <p>${reservation.singleRoom * 30 + reservation.doubleRoom * 50}$</p>
        </div>
        <div style='display: flex'>
          <h3 style='font-weight: bold; width: 180px; color: #384e71'>Tax:</h3>
          <p>${(reservation.singleRoom * 30 + reservation.doubleRoom * 50) * 0.1}$</p>
        </div>
        <div style='display: flex'>
          <h1 style='font-weight: bold; width: 180px; color: red'>Total fee:</h1>
          <h1 style='font-weight: bold'>${(reservation.singleRoom * 30 + reservation.doubleRoom * 50) + (reservation.singleRoom * 30 + reservation.doubleRoom * 50) * 0.1}$</h1>
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
    // to: 'kientrung1388@gmail.com',
    to: reservation.email,
    subject: 'The K Hotel - Booking Successfully', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // async..await is not allowed in global scope, must use a wrapper
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        layout: false,
        title: "Something went wrong",
        msg: 'Error... Please do it again'
      });
    } else {
      res.json({
        layout: false,
        title: "Forgot Password",
        msg: 'Booking successfully... Please check your email address'
      });
    }
  });
};
