var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  eventedBy: {
    type: ObjectId,
    ref: "User",
    requird: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
  },
});
module.exports = Event = mongoose.model("Event", eventSchema);
