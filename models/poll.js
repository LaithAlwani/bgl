import {Schema, model, models} from "mongoose";

const pollSchema = new Schema({
  title: {
    type: String,
    reqired: true
  },
  items: {
    type: Array,
    reqired: true
  }
}, { timestamps: true });

const Poll = models.Poll || model("Poll", pollSchema)

export default Poll;