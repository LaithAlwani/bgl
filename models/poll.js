import { Schema, model, models } from "mongoose";

const pollSchema = new Schema(
  {
    title: {
      type: String,
      reqired: true,
    },
    items: [
      {
        name: {
          type: String,
          reqired: true,
        },
        votes: {
          type: Number,
          require: true,
        },
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    total_votes: {
      type: Number,
      reqired: true,
    },
  },
  { timestamps: true }
);

const Poll = models.Poll || model("Poll", pollSchema);

export default Poll;
