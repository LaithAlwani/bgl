import { Schema, model, models } from "mongoose";

const leagueSchema = new Schema(
  {
    boardgame: {
      type: Schema.Types.ObjectId,
      ref: "Boardgame",
    },
    players: [
      {
        playerId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
    maxPlayers: {
      type: Number,
      default: 16,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      default:60
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        red: "Session",
      },
    ],
    status: {
      type: String,
      default: "has not started",
    },
  },
  { timestamps: true }
);

const League = models.League || model("League", leagueSchema);

export default League;
