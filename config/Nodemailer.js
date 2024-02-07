"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:'gmail',
  secure: true,
  auth: {          
    user: "shubham.manitripathi2001@gmail.com",
    pass: "mjdcmldjghtsfixz",
  },
});


exports.sendmail = async (email,link) => {
  const info = await transporter.sendMail({
    from: {
          name:"RandomMailer",
          address:"randommailer@gmail.com"
          },
    to: `${email}`, 
    subject: "password reset request", // Subject line
    text: "password reset", // plain text body
    html: `<a>${link}<a/>`, // html body
  },(err,info)=>{if(err){
        return console.log(err);
  }
  console.log("Message sent: %s", info.messageId);
}
);}
