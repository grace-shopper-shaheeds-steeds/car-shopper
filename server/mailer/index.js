var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fsa.grace.hopper@gmail.com',
    pass: 'Free-Grace-H00per'
  }
});

var mailOptions = {
  from: 'fsa.grace.hopper@gmail.com',
  to: 'minhski@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy! Signing off from FSA Grace Shopper Land'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

const mailCallBack = (err, info) => {
  console.log ('Mail Error - ' + err + info )
}

const graceShopperMail = (mailMessage) =>{
  transporter.sendMail(mailMessage, mailCallBack )
}

export default graceShopperMail
