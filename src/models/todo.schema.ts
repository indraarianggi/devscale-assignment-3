// Membuat Schema DB
import { model, Schema } from "mongoose";

// schema
const todoSchema = new Schema({
  title: String,
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

// create collection
export const Todo = model("Todo", todoSchema);
