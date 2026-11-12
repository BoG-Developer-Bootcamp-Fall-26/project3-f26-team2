import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  breed: { type: String, required: true, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hoursTrained: { type: Number, required: true, min: 0 },
  profilePicture: { type: String, trim: true, default: "" },
  birthDate: { type: String, default: null },
  note: { type: String, default: "" },
});

const Animal = mongoose.models.Animal || mongoose.model("Animal", animalSchema);

export default Animal;