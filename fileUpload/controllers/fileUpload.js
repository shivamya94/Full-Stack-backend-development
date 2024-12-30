const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = {folder};
    console.log("temp file path ", file.tempFilePath);
    return  await cloudinary.uploader.upload(file.tempFilePath, options);
    
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
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);
 
        if( !isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not Supported',
            })
        }

        //fileformat supported
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "selfhelp");
        console.log(response);

        //db mein entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success:true,
            imageUrl : response.secure_url,
            message:'Image Successfully Uploaded',
        })


    }
    catch(error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        })
       

    }
}

//video uplaode