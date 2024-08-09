import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    date: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    results: {
      type: Array,
      required: false,
    },
    seeds: {
      type: Array,
      required: false,
    },
    pointsArray: {
      type: Array,
      required: false,
    },
    location: {
      type: Object,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    equipment_Individual: {
      type: String,
      required: false,
    },
    equipment_Overall: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
