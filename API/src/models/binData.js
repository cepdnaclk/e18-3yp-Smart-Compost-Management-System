const mongoose = require("mongoose");
const validator = require("validator");

// 1st model
const Bin_Data = mongoose.model("Bin_Data", {
    binNumber: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true,
        trim: true
    },
    quarter: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    temperature: {
        type: Number,
        required: true,
        trim: true,
    },
    humidity: {
        type: Number,
        required: true,
        trim: true,
    },
    compostStatus: {
        type: String,
        required: true,
        trim: true,
    },
    methaneOutput: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = Bin_Data;