const express = require("express");
const Bin = require("../models/bins.js");
const Bin_Data = require("../models/binData.js");
const mongodb = require("mongodb");

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
router.get("/api/bins/:binNumber", async function(req,res){

    try{
        const bin = await Bin.findOne({
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

// End point for updating a bin
router.patch("/api/bins/:binNumber", async function(req,res){
    
    const allowedFields = ["binLocation","compostStatus"];
    const updateFields = Object.keys(req.body);

    const isValid = updateFields.every(function(field){
        return allowedFields.includes(field); // no matter how many trues you have if you have one false then it will return false
    });

    if(!isValid){
        return res.status(400).send({error: "Invalid Update"});
    }

    try{
        const bin = await Bin.findOneAndUpdate({
            binNumber : req.params.binNumber},
            req.body, {new: true});

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

    } catch(error){
        res.send(error);
    }
})

// Endpoint for deleting a  bin
router.delete("/api/bins/:binNumber", async function(req,res){
    try{

        const bin = await Bin.findOneAndDelete({
            binNumber : req.params.binNumber
        });

        if(!bin){
            return res.status(404).send({error: "Bin not found"});
        } 
        res.send(bin);

        let result = await Bin_Data.deleteMany({binNumber: req.params.binNumber})


    } catch(error){
        res.send(error);
    }

});

module.exports = router;