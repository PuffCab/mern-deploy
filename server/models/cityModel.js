import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  countryCode: {
    type: String,
    required: true,
    unique: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: "attraction" }],
});

const cityModel = mongoose.model("city", citySchema);

export default cityModel;
