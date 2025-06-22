const Entry = require("../models/Entry");
const mongoose = require("mongoose");
const exportToExcel = require("../utils/excelExport");

const getEntry = async (req, res) => {
  try {
    const dataEntry = await Entry.find().sort({ date: -1 });
    res.status(201).json(dataEntry);
  } catch (error) {
console.error("Error saving entries:", error);
    res.status(500).json({ message: "Internal server error" });  }
};

// const createEntry = async (req, res) => {
//   try {
//     const entries = req.body;

//     //validation
//     for (let entry of entries) {
//       if (
//         !entry.date ||
//         !entry.vegetableName ||
//         !entry.unit ||
//         isNaN(entry.quantity) ||
//         isNaN(entry.price)
//       ) {
//         return res.status(400).json({ message: "Invalid entry data" });
//       }
//       entry.ratePerUnit = entry.price / entry.quantity;
//     }

//     await Entry.insertMany(entries);
//     res.status(201).json({ message: "Entries saved successfully" });
//   } catch (error) {
//     res.status(401).json("Somethinf went wrong");
//   }
// };

const createEntry = async (req, res) => {
  try {
    const entries = req.body;

    if (!Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({ message: "No entries provided" });
    }

    // Validation
    for (let entry of entries) {
      if (
        !entry.date ||
        !entry.vegetableName ||
        !entry.unit ||
        isNaN(entry.quantity) ||
        isNaN(entry.price)
      ) {
        return res.status(400).json({ message: "Invalid entry data" });
      }
      entry.ratePerUnit = parseFloat((entry.price / entry.quantity).toFixed(2));
    }

    await Entry.insertMany(entries);
    res.status(201).json({ message: "Entries saved successfully" });
  } catch (error) {
    console.error("Error saving entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const downloadExcel = async (req, res) => {
  try {
    const data = await Entry.find().sort({ date: -1 });
    const buffer = await exportToExcel(data);

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="vegetable-entries.xlsx"'
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
console.error("Error saving entries:", error);
    res.status(500).json({ message: "Internal server error" });  }
};

module.exports = {
  getEntry,
  createEntry,
  downloadExcel,
};
