const express = require("express");
const Bin_Data = require("../models/bins.js");

const router = express.Router();

// End point for creating a bin in the system
router.post("/api/bins", async function(req, res){
    const bin = new Bin(req.body);

    try{
        await bin.save();
        res.send(bin);
    } catch(error){
        res.send(error);
    }

});

// End point for reading all the bins
router.get("/api/bins", async function(req,res){

    try{
        const bins = await Bin.find({});
        res.send(bins);
    }catch(error){
        res.send(error);
    }
})

// End point for reading a specific bin
router.get("/api/bins/:id", async function(req,res){

    try{
        const bin = await Bin.findById(req.params.id);

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);
    } catch(error){
        res.send(error);
    }
});

// End point for updating a bin
router.patch("/api/bins/:id", async function(req,res){
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

    } catch(error){
        res.send(error);
    }
})

// Endpoint for deleting a  bin
router.delete("/api/bins/:id", async function(req,res){
    try{

        const bin = await Bin.findByIdAndDelete(req.params.id);

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

    } catch(error){
        res.send(error);
    }

});

module.exports = router;