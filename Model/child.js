const mongoose = require("mongoose");
const uniqueId = require("generate-unique-id");

//_id(Number), fullName, age , level (one of PreKG,KG1,KG2), address (city,street and building)

const addressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: Number,
  },
  { _id: false }
);

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
  fullname: {
    type: String,
    require: true,
    minLength: 10,
  },
  age: Number,
  level: {
    type: String,
    require: true,
  },
  address: addressSchema,
});

module.exports = mongoose.model("children", schema);
