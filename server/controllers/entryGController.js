const Grocery = require('../models/Grocery')
const ExcelJs = require('exceljs')

const createGEntry = async (req, res) => {
  try {
    const entries = req.body; // should be an array of entries

    if (!Array.isArray(entries) || entries.length === 0) {
      return res.status(400).json({ message: "No entries provided" });
    }

    const processedEntries = entries.map((entry, index) => {
      const { date, stockItem, unit, quantity, total } = entry;

      if (
        !date || !stockItem || !unit ||
        quantity === undefined || total === undefined ||
        isNaN(Number(quantity)) || isNaN(Number(total))
      ) {
        throw new Error(`Invalid data at entry index ${index}`);
      }

      const qty = Number(quantity);
      const ttl = Number(total);
      const ratePerUnit = parseFloat((ttl / qty).toFixed(2));

      return {
        date,
        stockItem,
        unit,
        quantity: qty,
        total: ttl,
        ratePerUnit
      };
    });

    await Grocery.insertMany(processedEntries);
    res.status(201).json({ message: 'Grocery entries added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getGEntry = async (req, res) => {
  try {
    const entries = await Grocery.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const downloadGExcel = async (req, res) => {
  try {
    const entries = await Grocery.find().sort({ createdAt: -1 });

    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Grocery Entries');

    // Define header row
    worksheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Stock Item', key: 'stockItem', width: 20 },
      { header: 'Unit', key: 'unit', width: 10 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Total', key: 'total', width: 10 },
      { header: 'Rate per Unit', key: 'ratePerUnit', width: 15 },
    ];

    // Add data rows
    entries.forEach(entry => {
      worksheet.addRow({
        date: entry.date,
        stockItem: entry.stockItem,
        unit: entry.unit,
        quantity: entry.quantity,
        total: entry.total,
        ratePerUnit: entry.ratePerUnit,
      });
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=grocery-entries.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


module.exports = { createGEntry, getGEntry, downloadGExcel };

