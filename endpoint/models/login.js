const mongoose = require("mongoose");
const LoginSchema = new mongoose.Schema({
		email: { type:String, required: true},
		password: {type:Number, required:true},
		active:{type:Boolean, default:true}		
});

const Login = mongoose.model("logins",LoginSchema);
module.exports = Login;