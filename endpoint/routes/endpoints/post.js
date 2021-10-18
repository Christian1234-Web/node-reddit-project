//let {User} = require("../../models/blog");
const Comment = require("../../models/comment");
const Post = require("../../models/post");
let routes = (app) =>{
	
//create a post 


app.post("/posts",async(req,res)=>{
	try{
		let post = new Post(req.body)
		res.json({ status: "ok", data: post });
		await post.save();
	}
	catch(err){
		res.status(500).send(err);
	}
	res.json({status:"ok"})
});

// get all post

app.get("/posts",async(req,res)=>{
	try{
		let posts = await Post.find()
		res.json(posts);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

// get a single post

app.get("/posts/:id",async(req,res)=>{
	try{
	let post = await Post.findOne({_id:req.params.id})
	res.json(post);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});


// update a post
app.put("/posts/:id",async(req,res)=>{
	try{
	let post = await Post.updateOne({_id:req.params.id},req.body);
	res.json(post);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

// delete a post

app.delete("/posts/:id",async(req,res)=>{
	try{
	let post = await Post.deleteOne({_id:req.params.id},req.body);
	res.json(post);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

//get all comments for a single post

app.get("/posts/:id/comments",async(req,res)=>{
	try{
		let comments = await Comment.find({post_id:req.params.id})
		res.json(comments);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

}
module.exports = routes;