import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const PlayersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  playerId: {
    type: Number,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: false,
  },
  PastTeams: {
    type: Array,
    required: false,
  },
  strengths: {
    type: String,
    required: false,
  },
  weaknesses: {
    type: String,
    required: false,
  },
});

module.exports =
  mongoose.models.Players || mongoose.model("Players", PlayersSchema);
