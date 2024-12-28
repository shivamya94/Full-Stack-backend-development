const File = require("../models/File");

//localfileupload -> hadler function

exports.localFileUpload = async (req,res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("File Agayi jee ->", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path ->", path)

        file.mv(path , (err) => {
            console.log(err);
        });

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