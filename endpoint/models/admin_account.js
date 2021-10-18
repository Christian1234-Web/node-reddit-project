const mongoose = require("mongoose");
const Admin_AccountSchema = new mongoose.Schema({
		username: { type:String, unique:true, required: true},
		password: {type:String, required:true},
		email:{type:String, unique:true, required:true},
		active:{type:Boolean, default:false}
});

const Admin_Account = mongoose.model("admin_accounts",Admin_AccountSchema);
module.exports = Admin_Account;