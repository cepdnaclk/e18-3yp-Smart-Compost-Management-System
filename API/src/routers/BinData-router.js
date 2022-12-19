const express = require("express");
const Bin_Data = require("../models/binData.js");

const router = express.Router();

router.get("/bindata", function(req, res){
    res.render("bindata");
})

router.get("/bindata/bin1", function(req, res){
    res.render("bin1");
})
// End point for adding data for a bin
router.post("/api/bindata", async function(req, res){
    const binData = new Bin_Data(req.body);

    try{
        await binData.save();
        res.send(binData);
    } catch(error){
        res.send(error);
    }

});

// End point for reading all the bins data
router.get("/api/bindata", async function(req,res){
    try{
        const data = await Bin_Data.find({});
        res.send(data);
    }catch(error){
        res.send(error); 
    }
})

// End point for reading the latest data of a specific bin
router.get("/api/bindata/:binNumber", async function(req,res){
    try{
        
        const bin = await Bin_Data.findOne({
            binNumber: req.params.binNumber
        }).sort({
            date: -1,
            quarter: -1
        }); 
        

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
    } catch(error){
        res.send(error);
    }
    
});

// End point for reading all the data of a specific bin
router.get("/api/bindata/all/:binNumber", async function(req,res){
    try{
        
        const bin = await Bin_Data.find({
            binNumber: req.params.binNumber
        }); 
        

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
    } catch(error){
        res.send(error);
    }
    
});

// End point for updating a data of a bin
router.patch("/api/bindata/:id", async function(req,res){
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

    } catch(error){
        res.send(error);
    }
})

// Endpoint for deleting a data of a bin
router.delete("/api/bindata/:id", async function(req,res){
    try{
        const data = await Bin_Data.findByIdAndDelete(req.params.id);

        if(!data){
            return res.status(404).send({error: "Data not found"});
        } 
        res.send(data);
    } catch(error){
        res.send(error);
    }

});

module.exports = router;