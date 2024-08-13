// Membuat Schema DB
import { model, Schema } from "mongoose";

// schema
const authSchema = new Schema({
  userId: String,
  refreshToken: String,
});

// create collection
export const Auth = model("Auth", authSchema);
