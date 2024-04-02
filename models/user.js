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

    polls: [
      {
        type: Schema.Types.ObjectId,
        ref: "Poll",
      },
    ],
    // leagues: [
    //   {
    //     type: Schema.type.ObjectId,
    //     ref: "League",
    //   },
    // ],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
