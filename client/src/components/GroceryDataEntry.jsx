import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GroceryDataEntry = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("grocery-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    stockItem: "",
    unit: "",
    quantity: "",
    total: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  // predefined grocery items with unit
const groceryItems = [
  { name: "GHAU", unit: "KGS" },
  { name: "JIRASAR CHOKHA", unit: "KGS" },
  { name: "KANKI CHOKHA", unit: "KGS" },
  { name: "BASMATI CHOKHA", unit: "KGS" },
  { name: "JUVAR", unit: "KGS" },
  { name: "ADAD DAAL", unit: "KGS" },
  { name: "TUVER DAAL", unit: "KGS" },
  { name: "MAGNI DAAL FOTRAWADI", unit: "KGS" },
  { name: "MOGARDAAL", unit: "KGS" },
  { name: "CHANANI DAAL", unit: "KGS" },
  { name: "CHODANI DAAL", unit: "KGS" },
  { name: "GHEE", unit: "KGS" },
  { name: "SINGH TEL", unit: "KGS" },
  { name: "MAG", unit: "KGS" },
  { name: "KABULI CHANA", unit: "KGS" },
  { name: "DESHI CHANA", unit: "KGS" },
  { name: "SAFED CHODA", unit: "KGS" },
  { name: "LEELA VATANA", unit: "KGS" },
  { name: "SAFED VATANA", unit: "KGS" },
  { name: "VAAL", unit: "KGS" },
  { name: "MASUR", unit: "KGS" },
  { name: "RAJMA", unit: "KGS" },
  { name: "MATH", unit: "KGS" },
  { name: "MIKSHDAAL", unit: "KGS" },
  { name: "MARCHU", unit: "KGS" },
  { name: "HALDAR", unit: "KGS" },
  { name: "DHANAJIRU", unit: "KGS" },
  { name: "JIRU", unit: "KGS" },
  { name: "RAI", unit: "KGS" },
  { name: "AAKHADHANA", unit: "KGS" },
  { name: "MITHU", unit: "KGS" },
  { name: "AAKHA LAL MARCHA", unit: "KGS" },
  { name: "MARI", unit: "KGS" },
  { name: "LAVING", unit: "KGS" },
  { name: "AJMO", unit: "KGS" },
  { name: "GARAM MASALO", unit: "KGS" },
  { name: "HING", unit: "KGS" },
  { name: "SANCHAR MITHU", unit: "KGS" },
  { name: "KASTURI METHI", unit: "KGS" },
  { name: "SUKI METHI", unit: "KGS" },
  { name: "VARIYALI", unit: "KGS" },
  { name: "TAL", unit: "KGS" },
  { name: "TAJPATTA", unit: "KGS" },
  { name: "ILAYCHI", unit: "KGS" },
  { name: "SAMBHAR MASALO", unit: "KGS" },
  { name: "CHHOLE MASALO", unit: "KGS" },
  { name: "PANEER MASALO", unit: "KGS" },
  { name: "PAVBHAJI MASALO", unit: "KGS" },
  { name: "CHAAT MASALO", unit: "KGS" },
  { name: "AACHAR MASALO", unit: "KGS" },
  { name: "PULAV MASALO", unit: "KGS" },
  { name: "DABELI MASALO", unit: "KGS" },
  { name: "METHI MASALO", unit: "KGS" },
  { name: "KEL", unit: "KGS" },
  { name: "RASOI MAGIC", unit: "KGS" },
  { name: "SUNTH", unit: "KGS" },
  { name: "SUHANA MASALO", unit: "KGS" },
  { name: "KHAVANO SODA", unit: "KGS" },
  { name: "GHAUNO LOT", unit: "KGS" },
  { name: "BHAKHRI LOT", unit: "KGS" },
  { name: "AARA LOT", unit: "KGS" },
  { name: "CHOKHA LOT", unit: "KGS" },
  { name: "BAJRI LOT", unit: "KGS" },
  { name: "MOHANTHAD LOT", unit: "KGS" },
  { name: "MAGJATRI", unit: "KGS" },
  { name: "BESAN", unit: "KGS" },
  { name: "AASOPALAV BESAN", unit: "KGS" },
  { name: "SOJI", unit: "KGS" },
  { name: "GOD", unit: "KGS" },
  { name: "SINGHDANA", unit: "KGS" },
  { name: "DADIYA", unit: "KGS" },
  { name: "KHAJUR", unit: "KGS" },
  { name: "MENDO", unit: "KGS" },
  { name: "INO", unit: "BOTTLE" },
  { name: "IMLI", unit: "KGS" },
  { name: "CHA", unit: "KGS" },
  { name: "KHAND", unit: "KGS" },
  { name: "RAVO", unit: "KGS" },
  { name: "KAJU", unit: "KGS" },
  { name: "BADAM", unit: "KGS" },
  { name: "POHA", unit: "KGS" },
  { name: "NAYLON POHA", unit: "KGS" },
  { name: "MAKAI POHA", unit: "PACKET" },
  { name: "CHANAJOR", unit: "KGS" },
  { name: "GANTHIYA", unit: "PACKET" },
  { name: "MAMRA", unit: "PACKET" },
  { name: "SEV", unit: "PACKET" },
  { name: "NAYLON SEV", unit: "PACKET" },
  { name: "KHAKHRA", unit: "KGS" },
  { name: "GAS CYLINDER", unit: "BOTTLE" },
  { name: "COFFEE PACKET", unit: "PACKET" },
  { name: "KESAR", unit: "KGS" },
  { name: "ADAD PAPAD", unit: "KGS" },
  { name: "KHICHIYA PAPAD", unit: "KGS" },
  { name: "TIKHO MITHO CHAVANU", unit: "KGS" },
  { name: "NARIYAL", unit: "NOS" },
  { name: "DRAKSH", unit: "KGS" },
  { name: "MASALA SINGH", unit: "KGS" },
  { name: "FARSI PURI", unit: "KGS" },
  { name: "CHANADAAL(BHEL)", unit: "KGS" },
  { name: "MAMRI(GUNDI)", unit: "KGS" },
  { name: "KASHMIRI MARCHU", unit: "KGS" }
];


  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  useEffect(() => {
    localStorage.setItem("grocery-entries", JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if user selects stockItem, auto-fill unit
    if (name === "stockItem") {
      const selected = groceryItems.find((item) => item.name === value);
      setFormData({
        ...formData,
        stockItem: value,
        unit: selected ? selected.unit : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = () => {
    if (
      !formData.date ||
      !formData.stockItem ||
      !formData.unit ||
      !formData.quantity ||
      !formData.total
    ) {
      toast.error("All fields are required!");
      return;
    }

    const quantity = parseFloat(formData.quantity);
    const total = parseFloat(formData.total);

    if (quantity <= 0 || total <= 0) {
      toast.error("Quantity and Total must be greater than 0!");
      return;
    }

    const ratePerUnit = parseFloat((total / quantity).toFixed(2));

    const newEntry = {
      ...formData,
      quantity,
      total,
      ratePerUnit,
    };

    if (editingIndex >= 0) {
      const updated = [...entries];
      updated[editingIndex] = newEntry;
      setEntries(updated);
      setEditingIndex(-1);
      toast.success("Entry updated successfully!");
    } else {
      setEntries([...entries, newEntry]);
      toast.success("Entry added successfully!");
    }

    // reset form
    setFormData((prev) => ({
      ...prev,
      stockItem: "",
      unit: "",
      quantity: "",
      total: "",
    }));
  };

  const editEntry = (index) => {
    setFormData(entries[index]);
    setEditingIndex(index);
    document.querySelector(".form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteEntry = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      toast.success("Entry deleted successfully!");
    }
  };

  const submitAllEntries = async () => {
    if (entries.length === 0) {
      toast.error("No entries to submit!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/data/entriesG", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });
      if (!res.ok) throw new Error("Submission failed.");
      setEntries([]);
      localStorage.removeItem("grocery-entries");
      toast.success("All entries submitted!");
    } catch (err) {
      toast.error("Error submitting entries!");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/data/downloadG");
      if (!res.ok) throw new Error("Failed to download file");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `grocery-purchases-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Excel file downloaded!");
    } catch (err) {
      toast.error("Error downloading file!");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = entries.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-2">🛒 Grocery Purchase Tracker</h1>
          <p className="text-yellow-100 text-lg">Track daily grocery purchases easily</p>
        </div>

        <div className="p-8">
          {/* Form Section */}
          <div className="form-section bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">Add New Entry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Item</label>
                <select
                  name="stockItem"
                  value={formData.stockItem}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                >
                  <option value="">Select Item</option>
                  {groceryItems.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  readOnly
                  className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.5"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Price (₹)</label>
                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleInputChange}
                  placeholder="e.g., 500"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleFormSubmit}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {editingIndex >= 0 ? "Update Entry" : "Add Entry"}
            </button>
          </div>

          {/* Entries Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Today's Entries</h2>
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                Total: ₹{totalAmount.toFixed(2)}
              </div>
            </div>
            {entries.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4 opacity-50">📝</div>
                <h3 className="text-xl font-medium mb-2">No entries added yet</h3>
                <p>Add your first grocery purchase entry above</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-semibold">Date</th>
                      <th className="p-4 text-left font-semibold">Item</th>
                      <th className="p-4 text-left font-semibold">Quantity</th>
                      <th className="p-4 text-left font-semibold">Unit</th>
                      <th className="p-4 text-left font-semibold">Total</th>
                      <th className="p-4 text-left font-semibold">Rate/Unit</th>
                      <th className="p-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4">{new Date(entry.date).toLocaleDateString("en-IN")}</td>
                        <td className="p-4">{entry.stockItem}</td>
                        <td className="p-4">{entry.quantity}</td>
                        <td className="p-4">{entry.unit}</td>
                        <td className="p-4">₹{entry.total.toFixed(2)}</td>
                        <td className="p-4">₹{entry.ratePerUnit}</td>
                        <td className="p-4">
                          <button
                            onClick={() => editEntry(index)}
                            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded mr-2 text-sm font-medium hover:from-orange-500 hover:to-orange-600 transform hover:-translate-y-0.5 transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEntry(index)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center bg-gray-50 p-6 rounded-xl">
            <button
              onClick={submitAllEntries}
              disabled={entries.length === 0 || loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg mr-4 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Submit All Entries
            </button>
            <button
              onClick={downloadExcel}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 mt-2 sm:mt-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Download Excel
            </button>
          </div>

          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Processing...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryDataEntry;
