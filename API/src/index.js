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
app.get("/api/bindata", function(req,res){
    Bin_Data.find({}).then(function(binsData){
        res.send(binsData);
    }).catch(function(error){
        res.status(500).send(error);
    })
})

// End point for reading a data of a specific bin
app.get("/api/bindata/:id", function(req,res){
    Bin_Data.findById(req.params.id).then(function(binsData){
        if(!binsData){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(binsData);
        
    }).catch(function(error){
        res.status(400).send(error);
    });
});

// End point for updating a data of a bin
app.patch("/api/bindata/:id", function(req,res){
    const id = req.params.id;
    const allowedFields = ["binNumber", "day", "quarter", "temperature", "humidity", "compostStatus"];
    const updateFields = Object.keys(req.body);

    const isValid = updateFields.every(function(field){
        return allowedFields.includes(field); // no matter how many trues you have if you have one false then it will return false
    });

    if(!isValid){
        return res.status(400).send({error: "Invalid Update"});
    }

    Bin_Data.findByIdAndUpdate(id, req.body, {new: true}).then((binsData) => {
        if(!binsData){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(binsData);
    }).catch(function(error){
        res.status(400).send(error);
    });
})

// End point for creating a bin in the system
app.post("/api/bins", function(req, res){
    const bin = new Bin(req.body);

    bin.save().then(function(){
        res.status(201).send(bin);
    }).catch(function(error){
        res.status(400).send(error);
    });

});

// End point for reading all the bins
app.get("/api/bins", function(req,res){
    Bin.find({}).then(function(bins){
        res.send(bins);
    }).catch(function(error){
        res.status(500).send(error);
    })
})

// End point for reading a specific bin
app.get("/api/bins/:id", function(req,res){
    Bin.findById(req.params.id).then(function(bin){
        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
        
    }).catch(function(error){
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});