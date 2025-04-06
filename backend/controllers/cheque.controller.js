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

export const updateCheque = async (req, res) => {
  try {
    const chequeId = req.params.id;
    const reqBody = req.body;

    const allowedChequeFields = [
      "passDate",
      "bank",
      "recipient",
      "amount",
      "note",
      "status",
    ];

    if (Object.keys(reqBody).length === 0) {
      return res.status(400).json({ message: "No new data to update" });
    }

    const updatedCheque = {};
    for (const field of allowedChequeFields) {
      const value = reqBody[field];
      if (value === undefined || value === null) continue;

      if (typeof value === "string") {
        const trimmedValue = value.trim().replace(/\s+/g, " ");
        if (trimmedValue === "" && field !== "note") continue;
        updatedCheque[field] = trimmedValue;
      } else if (typeof value === "number") {
        if (field === "amount" && value < 0) {
          updatedCheque[field] = value * -1;
        }
      } else {
        updatedCheque[field] = reqBody[field];
      }
    }

    const cheque = await Cheque.findByIdAndUpdate(
      chequeId,
      { $set: updatedCheque },
      { new: true }
    );
    if (!cheque) {
      return res.status(404).json({ message: "Cheque not found." });
    }

    res.status(200).json({ message: "Cheque updated successfully", cheque });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteCheque = async (req, res) => {
  try {
    const chequeId = req.params.id;
    await Cheque.findByIdAndDelete(chequeId);
    res.status(200).json({ message: "Cheque deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const searchCheque = async (req, res) => {
  try {
    const filters = req.query;

    if (Object.keys(filters).length === 0)
      return res.status(400).json({ message: "Filter keyword is empty" });

    const filterList = [
      "bank",
      "recipient",
      "chequeNumber",
      "note",
      "status",
      "amount",
    ];

    let query = {};
    for (const filterKey of filterList) {
      if (filters[filterKey] && filterKey !== "amount") {
        query[filterKey] = new RegExp(
          filters[filterKey].trim().replace(/\s+/g, " "),
          "i"
        );
        console.log(typeof filters[filterKey]);
      } else if (filters[filterKey] && filterKey === "amount") {
        query[filterKey] = filters[filterKey];
      }
    }

    if (Object.keys(query).length === 0)
      return res
        .status(400)
        .json({ message: "Not a valid filter or Search query is empty" });

    console.log("query", query);

    const cheque = await Cheque.find(query);

    if (cheque.length === 0)
      return res.status(400).json({ message: "No cheques found" });

    res.status(200).json({ message: "Performed query action", cheque });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
