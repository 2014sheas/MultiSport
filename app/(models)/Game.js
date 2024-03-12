import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const GameSchema = new Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  event: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: false,
  },
  awayTeam: {
    type: String,
    required: false,
  },
  homeScore: {
    type: Number,
    required: true,
  },
  awayScore: {
    type: Number,
    required: true,
  },
  winner: {
    type: String,
    required: false,
  },
  loser: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  winnerNextGame: {
    type: String,
    required: false,
  },
  loserNextGame: {
    type: String,
    required: false,
  },
  nextGamePosition: {
    type: String,
    required: false,
  },
});

const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);
export default Game;
