//let {User} = require("../../models/blog");
const Comment = require("../../models/comment");
const Post = require("../../models/post");

let routes = (app) =>{
	
//create a comment

app.post("/comments",async(req,res)=>{
	try {
		let { post_id } = req.body;
		console.log(post_id)
		let comment = new Comment(req.body);
		let post = await Post.findById(post_id);
		post.num_comment += 1
		await post.save();
		console.log(post);
		await comment.save();
		res.json(comment);
	}
	catch(err){
		res.status(500).send(err);
	}
});


// get all comments

app.get("/comments",async(req,res)=>{
	try{
		let comments = await Comment.find();
		res.json(comments);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

//get a single comment

app.get("/comments/:id",async(req,res)=>{
	try{
	let comment = await Comment.findOne({_id:req.params.id})
	res.json(comment);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});
}
module.exports = routes;