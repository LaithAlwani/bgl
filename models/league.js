import { Schema, model, models } from "mongoose";

const leagueSchema = new Schema(
  {
    boardgame: {
      type: Schema.Types.ObjectId,
      ref: "Boardgame",
    },
    players: [
      {
        player_id: {
          type: Schema.Types.ObjectId,
          red: "User",
        },
        score: {
          type: Number,
          default: 0,
        },
      },
    ],
    sessions: [
      {
        type: Schema.Types.ObjectId,
        red: "Session",
      },
    ],
    on_going: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const League = models.League || model("League", leagueSchema);

export default League;
