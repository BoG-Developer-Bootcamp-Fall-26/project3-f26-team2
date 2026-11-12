import mongoose from "mongoose";

const trainingLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true },
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  description: { type: String, required: true, trim: true },
  hours: { type: Number, required: true, min: 0 },
});

type TrainingLogRecord = mongoose.InferSchemaType<typeof trainingLogSchema>;

const TrainingLog: mongoose.Model<TrainingLogRecord> =
  mongoose.models.TrainingLog || mongoose.model("TrainingLog", trainingLogSchema);

export default TrainingLog;