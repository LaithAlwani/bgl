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
          required: true,
        },
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    on_going: {
      type: Boolean,
      default: true,
    },
    total_votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Poll = models.Poll || model("Poll", pollSchema);

export default Poll;
