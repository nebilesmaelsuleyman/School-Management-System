const nodemailer=require('nodemailer')
const sendEmail =async options =>{
const transporter= nodemailer.createTransport({
    host:process.env.email_host,
    port:process.env.email_port,
    auth:{
        user:process.env.email_username,
        pass:process.env.email_password
    }
});

const mailoptions ={
    from:'nebilesmael0@gmail.com',
    to:options.email,
    subject:options.subject,
    text:options.message
}
 
await transporter.sendMail(mailoptions)
}