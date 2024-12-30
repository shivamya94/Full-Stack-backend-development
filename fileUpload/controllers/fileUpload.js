const File = require("../models/File");

//localfileupload -> hadler function

exports.localFileUpload = async (req,res) => {
    try {
        //fetch file from request
        const file = req.files.file;
        console.log("File Agayi jee ->", file);
        

        //create path where file need to be stored on server file
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path ->", path)
        
        //add path to the move function
        file.mv(path , (err) => {
            console.log(err);
        });
        
        //create a successful response
        res.json({
            success:true,
            message:'Local file uploaded Successfully',
        });

    }
    catch(error){
        console.log("Not able to uplpoad the fine on server");
        console.log(error);

    }
}

//image upload ka handler

exports.imageUpload = async (req,res) => {
    try{
        //data fetch
        const { name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1]


    }
    catch(error) {

    }
}