const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const app = express();
const axios = require("axios");


const PORT = 3007;
const VIEWS = path.resolve(__dirname,"views");
const LAYOUTS = path.join(VIEWS,"layouts");
const LAYOUTSDIR =  path.join(VIEWS,"pages");
const DEFAULTLAYOUT = path.join(LAYOUTS,"main")

console.log(VIEWS);

app.engine("hbs",exhbs({
	layoutsDir: LAYOUTSDIR,
	defaultLayout: DEFAULTLAYOUT,
	extname:"hbs"

}));

app.set("view engine","hbs");
app.set("views",VIEWS);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
	let data = {
		title: "LOGIN TO YOUR ACCOUNT"
	}
	res.render("pages/LoginAdmin", data);
});
app.get("/create_admin",(req,res)=>{
	let data = {
		title: "CREATE A ADMIN ACCOUNT"
	}
	res.render("pages/CreateAdmin", data);
});

app.get("/dashboard",(req,res)=>{
	let data = {
		title: "DASHBOARD"
	}
	
	res.render("pages/Dashboard",data)
});
app.get("/posts",(req,res)=>{
	let data = {
		title:"All POSTS"
		
	}
	
	res.render("pages/ViewPost",data)
});
app.get("/createpost", (req, res) => {
	let data = {
		title:"CREATE A POST"
	}
	res.render("pages/CreatePost",data)
});

app.get("/users", async (req, res) => {
	let {data} = await axios.get("http://localhost:3006/users");
	let userData = {
		title: "ALL USERS",
		users:data
	}

	res.render("pages/ViewUser",userData)
});
app.get("/createuser", (req, res) => {
	let data = {
		title:"CREATE A USER"
	}
	res.render("pages/CreateUser",data)
});
app.listen(PORT);
console.log("App is running on port:" + PORT);

