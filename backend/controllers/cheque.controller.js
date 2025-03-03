import Cheque from "../models/cheque.model.js";

export const createCheque = async (req, res) => {
  try {
    const { passDate, bank, recipient, amount, chequeNumber, note, status } =
      req.body;

    if (!passDate || !bank || !recipient || !amount || !chequeNumber) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Enter a valid Amount" });
    }

    const existingCheque = await Cheque.findOne({ chequeNumber });
    if (existingCheque) {
      return res.status(400).json({ message: "Cheque number already exists." });
    }

    const newCheque = new Cheque({
      passDate,
      bank,
      recipient,
      amount,
      chequeNumber,
      note,
      status: status || "Pending",
    });

    await newCheque.save();
    res
      .status(201)
      .json({ message: "Cheque created successfully", cheque: newCheque });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
