const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
		post_id: { type:String, required: true},
		user_id: {type:String, required:true},
		time_created:{type:Number,default:()=>Date.now()},
		description:{type:String, required:true}
});

const Comment = mongoose.model("comments",CommentSchema);
module.exports = Comment;

//default:()=>Date.now();
//http://localhost:3006/posts/613f49e17ff21b559d601d3e/comments