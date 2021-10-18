const mongoose = require("mongoose");
const Admin_LoginSchema = new mongoose.Schema({
		email: { type:String, required: true},
		password:{type:String, required:true},
		active:{type:Boolean, default:false}
		
});

const Admin_Login = mongoose.model("admin_logins",Admin_LoginSchema);
module.exports = Admin_Login;
