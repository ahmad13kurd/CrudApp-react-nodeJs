const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
    {
        name: String
    }
);
module.exports = mongoose.model("Model",modelSchema);