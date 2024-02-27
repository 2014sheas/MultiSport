import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teamId: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    members: {
      type: Array,
      required: true,
    },
    first: {
      type: Array,
      required: false,
    },
    second: {
      type: Array,
      required: false,
    },
    thrird: {
      type: Array,
      required: false,
    },
    fourth: {
      type: Array,
      required: false,
    },
    fifth: {
      type: Array,
      required: false,
    },
    seventh: {
      type: Array,
      required: false,
    },
    totalPoints: {
      type: Number,
      required: false,
    },
    abbreviation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
