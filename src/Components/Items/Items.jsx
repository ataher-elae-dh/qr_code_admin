import React, { useEffect, useState } from "react";

function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", url: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all items
  const fetchItems = async () => {
    const res = await fetch("https://qr-code-server-five.vercel.app/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update item
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // Update item
      await fetch(`https://qr-code-server-five.vercel.app/api/items/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Create item
      await fetch("https://qr-code-server-five.vercel.app/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({ name: "", description: "", url: "" });
    setEditId(null);
    fetchItems();
  };

  // Delete item
  const handleDelete = async (id) => {
    await fetch(`https://qr-code-server-five.vercel.app/api/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  // Edit item
  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description, url: item.url || "" });
    setEditId(item._id);
  };

  return (
    <div className="max-w-lg mx-auto p-4 mt-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Items CRUD
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <input
            type="url"
            name="url"
            placeholder="URL (https://example.com)"
            value={form.url}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {editId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Item List */}
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-start justify-between p-3 bg-gray-50 border rounded-md shadow-sm"
          >
            <div className="flex-1">
              <strong className="text-gray-900 text-lg">{item.name}</strong>
              {item.url && (
                <p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-words"
                  >
                    {item.url}
                  </a>
                </p>
              )}
              <p className="text-gray-600 mt-1">{item.description}</p>
            </div>
            <div className="flex space-x-2 ml-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
