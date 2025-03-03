import mongoose from "mongoose";

const chequeSchema = new mongoose.Schema(
  {
    passDate: { type: Date, required: true },
    bank: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    chequeNumber: { type: String, required: true, unique: true },
    note: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Cleared", "Bounced", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Cheque = mongoose.model("Cheque", chequeSchema);

export default Cheque;
