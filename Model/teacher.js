const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

const schema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    require: true,
    minLength: 10,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
  email: { type: String, required: true, match: emailRegex },
  image: String,
});

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("teachers", schema);
