const mongoose = require("mongoose");
const validator = require("validator");

// 2nd model
const Bin = mongoose.model("Bin", {
    binNumber: {
        type: Number,
        required: true
    },
    binLocation: {
        type: String,
        required: true,
        trim: true,
    },
    compostStatus: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = Bin;