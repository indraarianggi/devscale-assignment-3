// Membuat Schema DB
import { model, Schema } from "mongoose";

// schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// create collection
export const User = model("User", userSchema);
