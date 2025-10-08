import React, { useEffect, useState } from 'react';

const Story = () => {
  const [item, setItem] = useState([]);

  // Fetch all items
  const fetchItem = async () => {
    const res = await fetch("https://qr-code-api-server.vercel.app/Story");
    const data = await res.json();
    setItem(data);
    // console.log(data);
    
  };

 useEffect(() => {
    fetchItem();
    
  }, []);
  let url = item.url;
  console.log(url);
  

  

  return (
    <div>
      <h2 className="text-center">Story</h2>
      {/* <h2 className="text-center">{item.url}</h2> */}
      {window.location.replace(url)}
      </div>
  );
};

export default Story;
