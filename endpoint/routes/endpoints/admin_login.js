// const Admin_Login = require("../../models/admin_login");
const Admin_Account = require("../../models/admin_account");
let routes = (app) =>{
	
	// login a user
app.post("/admin_login",async(req,res)=>{
	try{
		let { email, password} = req.body;
		let admin_account = await Admin_Account.findOne({ email, password });
		if (!admin_account) return res.json({ status: "error", error:"Invalid username or password"});
		admin_account.active = "true"
		res.json({status:"ok", data:admin_account})
		await admin_account.save();
}
	catch(err){
		res.status(500).send(err);
	}
	res.json({status:"ok"})
});

// logout a user
app.put("/admin_logout/:id",async(req,res)=>{
	try{
	let admin_account = await Admin_Account.updateOne({_id:req.params.id},req.body);
		if(!admin_account) return res.json({ status: "error", error: "You can not logout twice" });
		console.log(" Admin successfully logged out");
		res.json({ status: "ok", data: admin_account });
		// await account.save();

	}
	catch (err) {
		console.log("operation was not successful")
		res.status(500).send(err)
	}
	// throw error
	// res.json({ status: "ok" });
});















	
// ADMIN LOGGING IN

// app.post("/admin_login",async(req,res)=>{
// 	try{
// 		let admin_account = await Admin_Account.findOne(req.body);
// 		let admin_login = new Admin_Login(req.body);
// 		if(admin_account){
// 			res.send(admin_account);
// 			await admin_login.save();

// 		}
// 			else{
// 				res.send("invalid")
// 	}		
// }
// 	catch(err){
// 		res.status(500).send(err);
// 	}
// });
	
// app.get("/admin_logins",async(req,res)=>{
// 	try{
// 		let admin_logins = await Admin_Login.find();
// 		res.json(admin_logins);
	
// 	}
// 	catch(err){
// 		res.status(500).send(err)
// 	}
// })

	// delete a single user
// app.delete("/admin_users/:id",async(req,res)=>{
// 	try{
// 	let admin_login = await Admin_Login.deleteOne({_id:req.params.id});
// 	res.json(admin_login);
	
// 	}
// 	catch(err){
// 		res.status(500).send(err)
// 	}
// });

	
}
module.exports = routes;