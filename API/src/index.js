const express = require("express"); //  to manage servers and routes
const hbs = require("hbs");

require("./db/mongoose.js");

const BinDataRouter = require("./routers/BinData-router.js");
const BinRouter = require("./routers/Bin-router.js");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.use(express.json());

app.use(BinDataRouter);
app.use(BinRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
huhihi