const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  date:{
    type:Date,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comments"
  }]
});

// Create the model
const news = mongoose.model("news", NewsSchema);

// Export the CarNews model
module.exports = news;

