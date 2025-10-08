import React, { useEffect, useState } from "react";

function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", url: "" });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await fetch("https://qr-code-api-server.vercel.app/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`https://qr-code-api-server.vercel.app/items/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("https://qr-code-api-server.vercel.app/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", description: "", url: "" });
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`https://qr-code-api-server.vercel.app/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, url: item.url || "" });
    setEditId(item._id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        URL Manager
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-100"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            name="url"
            placeholder="URL (https://example.com)"
            value={form.url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Item List */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col justify-between p-5 bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Visit Link
                </a>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-auto">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
