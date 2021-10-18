const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
		title: {type:String, required: true},
		image: {type:String, required:false},
		description:{type:String, required:false},
		num_comment:{type:Number, min:0, default:0},
		num_like:{type:Number, min:0, default:0},
		time_created:{type:Number, default:()=>Date.now()}		
});

const Post = mongoose.model("posts",PostSchema);
module.exports = Post;