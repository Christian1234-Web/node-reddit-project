const express = require("express");
const app = express.Router();

require("./endpoints/login")(app);
require("./endpoints/post")(app);
require("./endpoints/admin_account")(app);
require("./endpoints/admin_login")(app);
require("./endpoints/comment")(app);
require("./endpoints/account")(app);

module.exports = app;