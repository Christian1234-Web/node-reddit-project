//let {User} = require("../../models/blog");
// const Admin_Login = require("../../models/admin_login");
const Admin_Account = require("../../models/admin_account");
let routes = (app) =>{
	
// CREATE ADMIN

app.post("/admin_user", async (req, res) => {
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
		let admin_account = new Admin_Account(req.body)
		await admin_account.save();
		// res.json(account);
		console.log(admin_account,"successfully created a user")
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
app.get("/admin_users", async(req,res)=>{
	try{
		let admin_account = await Admin_Account.find();
		res.json(admin_account);
	
	}
	catch(err){
		res.status(500).send(err)
	}
})
	
}
module.exports = routes;