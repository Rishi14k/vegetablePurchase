const ExcelJs = require('exceljs')

const exportToExcel = async(data)=>{
    const workbook = new ExcelJs.Workbook()
    const sheet = workbook.addWorksheet('vegetable Purchases')

    sheet.columns = [
        {header:"Date",key:'date',width:15},
        {header:"Vegetable",key:'vegetableName',width:20},
        {header:"Unit",key:'unit',width:10},
        { header: 'Quantity', key: 'quantity', width: 10 },
        { header: 'Price', key: 'price', width: 10 },
        { header: 'Rate per Unit', key: 'ratePerUnit', width: 15 },
    ];

    data.forEach(entry=>{
        sheet.addRow({
            date:entry.date.toISOString().slice(0,10),
            vegetableName:entry.vegetableName,
            unit:entry.unit,
            quantity:entry.quantity,
            price:entry.price,
            ratePerUnit:entry.ratePerUnit,
        })
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer
}

module.exports = exportToExcel