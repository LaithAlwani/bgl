import { model, models, Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    players: [
      {
        player: {
          type: String,
        },
        // players: {
        //   type: Schema.Types.ObjectId,
        //   ref: "User",
        // },
        points: {
          type: Number,
          default:0
        }
      },
    ],
    boardgame: {
      type: Schema.Types.ObjectId,
      ref: "Boardgame",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const session = models.Session || model("Session", sessionSchema);

export default session;