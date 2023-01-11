const path = require("path");
const express = require("express"); //  to manage servers and routes
const hbs = require("hbs");
require("./db/mongoose.js");
const session = require("express-session");

const BinDataRouter = require("./routers/BinData-router.js");
const BinRouter = require("./routers/Bin-router.js");
const UserRouter = require("./routers/User-router.js");

const app = express();
const port = process.env.PORT || 3000;

// Setup the session
app.use(session({secret: "something", saveUninitialized: true, resave: true}));

app.set("view engine", "hbs");

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.use(express.json());

app.use(BinDataRouter);
app.use(BinRouter);
app.use(UserRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
