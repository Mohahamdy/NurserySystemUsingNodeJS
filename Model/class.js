const mongoose = require("mongoose");
const uniqueId = require("generate-unique-id");

//_id(Number), name, supervisor (teacher id number), children which is array of children ids

const schema = new mongoose.Schema({
  _id: {
    type: Number,
    default: function () {
      return uniqueId({
        length: 5,
        useLetters: false,
      });
    },
  },
  name: {
    type: String,
    require: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teachers",
  },
  children: {
    type: Array,
    require: true,
    ref: "children",
  },
});

module.exports = mongoose.model("classes", schema);
