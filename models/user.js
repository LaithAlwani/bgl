import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      reqired: true,
    },
    email: {
      type: String,
      reqired: true,
    },
    clerk_id: {
      type: String,
      reqired: true,
    },
    first_name: String,
    last_name: String,
    image: String,
    avatar: String,

    plays: [{
      type: Schema.Types.ObjectId,
      ref:"Session"
    }]

    // leagues: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "League",
    //   },
    // ],
    // sessions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Session",
    //   },
    // ],
  },
  { timestamps: true }
);

const user = models.User || model("User", userSchema);

export default user;
