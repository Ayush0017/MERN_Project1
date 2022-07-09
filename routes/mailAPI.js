var nodemailer = require('nodemailer');

function sendMail(email,password)
{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'batchcontent2020@gmail.com',
    pass: '123@@123'
  }
});

var mailOptions = {
  from: 'batchcontent2020@gmail.com',
  to: email ,
  subject: "Verification mail from PMS",
  html: "<h1>Welcome to Project Management System</h1><p>You have successfully registered to PMS , login credentials are attached below</p><h2>Username : "+email+"</h2><h2>Password : "+password+"</h2><h2>Click on the link below to verify account</h2>http://localhost:3000/verifyUser?email="+email
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
}

module.exports = sendMail
