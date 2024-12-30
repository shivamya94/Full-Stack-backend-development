//app create
const express = require("express");
const app = express();


//port find out karn a hai 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware and karn hai 
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


//db se connect karna hai 
const db = require("./config/database");
db.connect();


//cloud se connect karna hai 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna hai 
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);


//activate karna hai server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})