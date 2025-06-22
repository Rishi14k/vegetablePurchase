import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MainDataEntry = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("veg-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    vegetableName: "",
    unit: "",
    quantity: "",
    price: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const vegetables = [
    "Tameta (ટામેટાં)",
    "Tindoda (ટિંડોળા)",
    "Kachha Kela (કાચા કેળા)",
    "Paka Kela (પાકા કેળા)",
    "Dudhi (દૂધી)",
    "bhinda (ભીંડા)",
    "kobi (કોબી)",
    "kothmir (કોથમીર)",
    "limbu (લીંબુ)",
    "marcha (મરચા)",
    "simla marcha (સિમલા મરચાં)",
    "vatana (વટાણા)",
    "chodi (ચોળી)",
    "fansi (ફણસી)",
    "makai (મકાઈ)",
    "dadam (દાડમ)",
    "gavar (ગવાર)",
    "fudino (ફુદીનો)",
    "methi (મેથી)",
    "kachi keri (કાચી કેરી)",
    "paki keri (પાકી કેરી)",
    "kakdi (કાકડી)",
    "kadhi patta (કઢી પત્તા)",
    "saragavo (સરગવો)",
  ];

  const unit = ["kg", "gram", "nos"];

  useEffect(() => {
    const toady = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: toady }));
  }, []);

  useEffect(() => {
    localStorage.setItem("veg-entries", JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (
      !formData.date ||
      !formData.vegetableName ||
      !formData.unit ||
      !formData.quantity ||
      !formData.price
    ) {
      toast.error("All Field are required!");
      return;
    }

    const quantity = parseFloat(formData.quantity);
    const price = parseFloat(formData.price);

    if (quantity <= 0 || price <= 0) {
      toast.error("price or quantity must be greter than 0!");
      return;
    }

    const newEntry = {
      ...formData,
      quantity: quantity,
      price: price,
    };

    if (editingIndex >= 0) {
      const updated = [...entries];
      updated[editingIndex] = newEntry;
      setEntries(updated);
      setEditingIndex(-1);
      toast.success("Entry update successfully!");
    } else {
      setEntries([...entries, newEntry]);
      toast.success("Entry added successfully!");
    }

    setFormData((prev) => ({
      ...prev,
      vegetableName: "",
      unit: "",
      quantity: "",
      price: "",
    }));
  };

  const editEntry = (index) => {
    setFormData(entries[index]);
    setEditingIndex(index);
    document
      .querySelector(".form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteEntry = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updated = entries.filter((_, i) => i !== index);
      setEntries(updated);
      toast.success("Entry delete successfully!");
    }
  };

  const submitAllEntries = async (e) => {
    e.preventDefault();
    if (entries.length === 0) {
      toast.error("No entries to submit! error!!");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/data/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });

      if (!res.ok) throw new Error("Submission failed.");
      setEntries([]);
      localStorage.removeItem("veg-entries");
      toast.success("All entries submitted!");
    } catch (err) {
      toast.error("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/data/download");
      if (!res.ok) throw new Error("Failed to download file");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vegetable-purchases-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Excel file downloaded");
    } catch (err) {
      toast.error("Error!!!", err);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = entries.reduce((sum, entry) => sum + entry.price, 0);

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            🥬 Vegetable Purchase Tracker
          </h1>
          <p className="text-green-100 text-lg">
            Manage your hostel's daily vegetable purchases efficiently
          </p>
        </div>

        <div className="p-8">
          {/* Form Section */}
          <div className="form-section bg-gray-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Add New Entry
            </h2>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vegetable Name
                  </label>
                  <select
                    name="vegetableName"
                    value={formData.vegetableName}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Vegetable</option>
                    {vegetables.map((veg) => (
                      <option key={veg} value={veg}>
                        {veg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Unit</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="gram">Gram (g)</option>
                    <option value="nos">nos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 2.5"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 100, 50 "
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleFormSubmit}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {editingIndex >= 0 ? "Update Entry" : "Add Entry"}
              </button>
            </div>
          </div>

          {/* Messages */}

          {/* Entries Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Today's Entries
              </h2>
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                Total: ₹{totalAmount.toFixed(2)}
              </div>
            </div>

            {entries.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4 opacity-50">📝</div>
                <h3 className="text-xl font-medium mb-2">
                  No entries added yet
                </h3>
                <p>Add your first vegetable purchase entry above</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <tr>
                      <th className="p-4 text-left font-semibold">Date</th>
                      <th className="p-4 text-left font-semibold">Vegetable</th>
                      <th className="p-4 text-left font-semibold">Quantity</th>
                      <th className="p-4 text-left font-semibold">Unit</th>

                      <th className="p-4 text-left font-semibold">
                        Total Price
                      </th>
                      <th className="p-4 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          {new Date(entry.date).toLocaleDateString("en-IN")}
                        </td>
                        <td className="p-4">{entry.vegetableName}</td>
                        <td className="p-4">{entry.quantity}</td>
                        <td className="p-4">{entry.unit}</td>
                        <td className="p-4">₹{entry.price.toFixed(2)}</td>
                        <td className="p-4">
                          <button
                            onClick={() => editEntry(index)}
                            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded mr-2 text-sm font-medium hover:from-orange-500 hover:to-orange-600 transform hover:-translate-y-0.5 transition-all duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteEntry(index)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200"
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
          <div className="text-center bg-gray-50 p-6 rounded-xl ">
            <button
              onClick={submitAllEntries}
              disabled={entries.length === 0 || loading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg mr-4 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl  "
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

          {/* Loading Indicator */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Processing...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDataEntry;
