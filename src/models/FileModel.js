const mongoose = require("../dao/MongooseConfig").mongoose;
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    file: {
      type: Buffer, 
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("File", fileSchema);
  