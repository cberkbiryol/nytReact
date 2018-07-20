var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  date: {
    type: Date,    
    default: Date.now
  },
  comment: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});

// Create the model
var comments = mongoose.model("comments", CommentSchema);

// Export the Comments model
module.exports = comments;