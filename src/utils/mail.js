const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "gmail",
//   port: 465,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "vasudevds1729@gmail.com",
    pass: "uejt imzi jkyc rghi",
  },
});


const emailTemplate = `
  <html>
    <body>
      <h1>Hello, {{name}}!</h1>
      <p>{{subject}}</P>
    </body>
  </html>
`;

const sendEmail=async(to,subject,html)=>{
    try {
        const info=await transporter.sendMail({
            from:'"Vasudev DS" <vasudevds1729@gmail.com>',
            to,
            subject,
            html
        })
    } catch (error) {
        console.log(error)

    }
}


module.exports={
    sendEmail,
    emailTemplate
}