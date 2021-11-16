const mongoose = require("mongoose");

const gallarySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  pictures: [{ type: String, required: true }],
},
{
  versionKey: false
}
);

module.exports = mongoose.model("gallary", gallarySchema);
