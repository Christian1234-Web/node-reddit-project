//let {User} = require("../../models/blog");
const Account = require("../../models/account");
let routes = (app) => {
	// create a user
app.post("/users", async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || typeof username !== "string") {
		return res.json({status:"error", error:"Invalid Username"})
	}
	if (!password || !username || !email) {
		return res.json({status:"error", error:"Fill in your Details"})
	}
	if (!password || typeof password !== "string") {
		return res.json({status:"error", error:"Invalid Password"})
	}
	if (password.length < 8) {
		return res.json({status:"error", error:" Password length too short, should be at least  8 character"})
	}
	
	try {
		let account = new Account(req.body)
		await account.save();
		// res.json(account);
		console.log(account,"successfully created a user")
	}
	catch (error) {
		if(error.code == 11000){
			 
			return res.json({status:"error", error:"Username or Email  already in use"})
		}
		throw error
	}
	res.json({status:"ok"})
});

// get all users
app.get("/users",async(req,res)=>{
	try{
		let accounts = await Account.find()
		res.json(accounts);
	
	}
	catch(err){
		res.status(500).send(err)
	}
})


// update a user
app.put("/users/:id",async(req,res)=>{
	try{
	let account = await Account.updateOne({_id:req.params.id},req.body);
	res.json(account);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});



// get a single user
app.get("/users/:id",async(req,res)=>{
	try{
	let account = await Account.findOne({_id:req.params.id})
	res.json(account);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

// delete a single user
app.delete("/users/:id",async(req,res)=>{
	try{
	let account = await Account.deleteOne({_id:req.params.id});
	res.json(account);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});

}
module.exports = routes;