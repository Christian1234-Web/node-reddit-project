const Login = require("../../models/login");
const Account = require("../../models/account");

let routes = (app) =>{
// login a user
app.post("/login",async(req,res)=>{
	try{
		let { email, password} = req.body;
		let account = await Account.findOne({ email, password });
		if (!account) return res.json({ status: "error", error:"Invalid username or password" });
			account.active= "true"
		await account.save();
		res.json({status:"ok", data:account})

}
	catch(err){
		res.status(500).send(err);
	}
	// res.json({status:"ok"})
});

	// logout a user
app.put("/logout/:id",async(req,res)=>{
	try{
	let account = await Account.updateOne({_id:req.params.id},req.body);
		if(!account) return res.json({ status: "error", error: "You can not logout twice" });
		console.log("successfully logged out");
		res.json({ status: "ok", data: account });
		// await account.save();

	}
	catch (err) {
		console.log("operation was not successful")
		res.status(500).send(err)
	}
	// throw error
	// res.json({ status: "ok" });
});

//get logged user
app.get("/logins",async(req,res)=>{
	try{
		let login = await Login.find();
		res.json(login);
	
	}
	catch(err){
		res.status(500).send(err);
	}
});

	// DELETE A LOGGED USER
app.delete("/logins/:id",async(req,res)=>{
	try{
	let login = await Login.deleteOne({_id:req.params.id});
	res.json(login);
	
	}
	catch(err){
		res.status(500).send(err)
	}
});


};
module.exports = routes;