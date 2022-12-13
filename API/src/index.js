const express = require("express"); //  to manage servers and routes
require("./db/mongoose.js");
const Bin_Data = require("./models/binData.js");
const Bin = require("./models/bins.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// End point for adding data for a bin
app.post("/api/bindata", async function(req, res){
    const binData = new Bin_Data(req.body);

    try{
        await binData.save();
        res.send(binData);
    } catch(e){
        res.send(error);
    }

});

// End point for reading all the bins data
app.get("/api/bindata", async function(req,res){
    try{
        const data = await Bin_Data.find({});
        res.send(data);
    }catch(e){
        res.send(error);
    }
})

// End point for reading a data of a specific bin
app.get("/api/bindata/:id", async function(req,res){
    try{
        const bin = await Bin_Data.findById(req.params.id);

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
    } catch(e){
        res.send(error);
    }
    
});

// End point for updating a data of a bin
app.patch("/api/bindata/:id", async function(req,res){
    const id = req.params.id;
    const allowedFields = ["binNumber", "day", "quarter", "temperature", "humidity", "compostStatus"];
    const updateFields = Object.keys(req.body);

    const isValid = updateFields.every(function(field){
        return allowedFields.includes(field); // no matter how many trues you have if you have one false then it will return false
    });

    if(!isValid){
        return res.status(400).send({error: "Invalid Update"});
    }

    try{
        const bin = await Bin_Data.findByIdAndUpdate(id, req.body, {new: true});

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

    } catch(e){
        res.send(error);
    }
})

// End point for creating a bin in the system
app.post("/api/bins", async function(req, res){
    const bin = new Bin(req.body);

    try{
        await bin.save();
        res.send(bin);
    } catch(e){
        res.send(error);
    }

});

// End point for reading all the bins
app.get("/api/bins", async function(req,res){

    try{
        const bins = await Bin.find({});
        res.send(bins);
    }catch(e){
        res.send(error);
    }
})

// End point for reading a specific bin
app.get("/api/bins/:id", async function(req,res){

    try{
        const bin = await Bin.findById(req.params.id);

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
    } catch(e){
        res.send(error);
    }
});

// End point for updating a data of a bin
app.patch("/api/bins/:id", async function(req,res){
    const id = req.params.id;
    const allowedFields = ["binNumber", "compostStatus"];
    const updateFields = Object.keys(req.body);

    const isValid = updateFields.every(function(field){
        return allowedFields.includes(field); // no matter how many trues you have if you have one false then it will return false
    });

    if(!isValid){
        return res.status(400).send({error: "Invalid Update"});
    }

    try{
        const bin = await Bin.findByIdAndUpdate(id, req.body, {new: true});

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

    } catch(e){
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});