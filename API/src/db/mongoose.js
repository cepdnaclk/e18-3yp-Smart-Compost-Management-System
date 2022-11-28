const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/compost-manager-api');

// const Bin_Data = mongoose.model("Bin_Data", {
//     binNumber: {
//         type: Number,
//         required: true
//     },
//     day: {
//         type: Number,
//         required: true,
//         trim: true
//     },
//     quarter: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 4
//     },
//     temperature: {
//         type: Number,
//         required: true,
//         trim: true,
//     },
//     humidity: {
//         type: Number,
//         required: true,
//         trim: true,
//     },
//     compostStatus: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     methaneOutput: {
//         type: String,
//         required: true,
//         trim: true,
//     }
// });

// const bin1 = new Bin_Data({
//     binNumber: 1,
//     day: 1,
//     quarter: 1,
//     temperature: 34,
//     humidity: 10,
//     compostStatus: "No",
//     methaneOutput: "No"
// });

// bin1.save();