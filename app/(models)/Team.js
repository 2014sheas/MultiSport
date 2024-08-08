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
    captains: {
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
    third: {
      type: Array,
      required: false,
    },
    fourth: {
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
    motto: {
      type: String,
      required: false,
    },
    logoUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
