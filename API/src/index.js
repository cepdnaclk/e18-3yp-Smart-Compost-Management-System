const express = require("express"); //  to manage servers and routes
require("./db/mongoose.js");

const Bin_Data = require("./models/binData.js");
const Bin = require("./models/bins.js");

const BinDataRouter = require("./routers/BinData-router.js");
const BinRouter = require("./routers/Bin-router.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(BinDataRouter);
app.use(BinRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});