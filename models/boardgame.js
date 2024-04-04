import { Schema, model, models } from "mongoose";

const boardgameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    leagues: [
      {
        type: Schema.Types.ObjectId,
        red: "League",
      },
    ],
    image: String,
    bggLink: String,
    minPlayers: Number,
    maxPlayers: Number,
    stock: Number,
    price: Number,
    desc: String,
  },
  { timestamps: true }
);

const boardgame = models.Boardgame || model("Boardgame", boardgameSchema);

export default boardgame;
