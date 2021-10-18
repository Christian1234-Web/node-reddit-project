const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
		username: { type:String, required: true, unique:true},
		password: {type:String, required:true},
		email:{type:String, required:true, unique:true},
		active:{type:Boolean, default:false}
});

const Account = mongoose.model("accounts",AccountSchema);
module.exports = Account;