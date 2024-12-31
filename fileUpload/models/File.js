const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,

    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});


//post middleware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC", doc)

        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,

            },
        });

        //send mail
        let info = await transporter.sendMail({
            from: `"Codehelp by" <bugguozo297@gmail.com>`,
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: `<h2>Hello jee</h2> <p>File Uploaded</p>`,
        })
        console.log("INFO",info);

    }
    catch(error) {
        console.log(error);

    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;