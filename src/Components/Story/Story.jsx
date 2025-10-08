import React, { useEffect, useState } from 'react';

const Story = () => {
  const [items, setItems] = useState([]);
  const [randomItem, setRandomItem] = useState(null);

  // Fetch all items
  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/api/items");
    const data = await res.json();
    setItems(data);

    if (data.length > 0) {
      const randomIndex = Math.round(Math.random() * (items.length - 1));
      setRandomItem(data[randomIndex]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  console.log(randomItem);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-6">Story</h2>

      <div className="max-w-lg mx-auto p-4 mt-8 bg-white shadow-lg rounded-lg">
        {randomItem ? (
          <div className="p-3 bg-gray-50 border rounded-md shadow-sm text-center">
            <strong className="text-gray-900 text-lg">{randomItem.name}</strong>

            {randomItem.url && (
              <p>
                <a
                  href={randomItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-words"
                >
                  {randomItem.url}
                </a>
              </p>
            )}

            <p className="text-gray-600 mt-1">{randomItem.description}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Story;
