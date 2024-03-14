import mongoose from "mongoose";

const LawyerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 60,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 60,
    },
    email: {
      type: String,
      required: true,
      max: 60,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);
const Lawyer = mongoose.model("lawyer", LawyerSchema);
export default Lawyer;
