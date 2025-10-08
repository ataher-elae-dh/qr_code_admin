import React, { useEffect, useState } from 'react';

const Story = () => {
  const [item, setItem] = useState(null);

  // Fetch all items
  const fetchItem = async () => {
    const res = await fetch("http://localhost:5000/Story");
    const data = await res.json();
    setItem(data);
    console.log(data);
    
  };

 useEffect(() => {
    fetchItem();
  }, []);

  console.log(item);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mt-6">Story</h2>

      <div className="max-w-lg mx-auto p-4 mt-8 bg-white shadow-lg rounded-lg">
        {item ? (
          <div className="p-3 bg-gray-50 border rounded-md shadow-sm text-center">
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
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
          
        )}
      </div>
    </div>
  );
};

export default Story;
