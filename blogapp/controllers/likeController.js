//import models

const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//Like a post 

exports.likePost = async (req,res) => {
    try{
        const {post, user} = req.body;
        const like = new Like({
            post,user,
        });
        const savedLike = await like.save();

        //update the post collection basus on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} }, {new:true})
        .populate("Likes").exec();


        res.json({
            post:updatedPost,
        });

    }
    catch(error) {
        return res.this.status(400).json({
            error: "Error while fetching post",

        });

    }

}



exports.dummyLink = (req,res) => {
    res.send("This is your Dummy Page");
};