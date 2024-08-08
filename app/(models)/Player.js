import { ratingClasses } from "@mui/material";
import { EmailProviderCreateNameEnum } from "auth0";
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const PlayersSchema = new Schema({
  email: {
    type: String,
    required: false,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
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
  ratings: {
    type: Object,
    required: true,
  },
  profile_image: {
    type: String,
    required: false,
  },
  team: {
    type: String,
    required: false,
  },
  croppedArea: {
    type: Object,
    required: false,
  },
  alerts: {
    type: Array,
    required: false,
  },
  song: {
    type: String,
    required: false,
  },
  bowlScore: {
    type: Array,
    required: false,
  },
});

module.exports =
  mongoose.models.Players || mongoose.model("Players", PlayersSchema);
