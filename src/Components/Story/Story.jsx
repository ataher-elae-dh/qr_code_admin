import React, { useEffect, useState } from 'react';

const Story = () => {
const [items, setItems] = useState([]);

    // fech story data from backend and display here
    async function fetchStory() {
        const res = await fetch("https://qr-code-api-server.vercel.app/story");
        const data = await res.json();
        // console.log(data);
        setItems(data);
        // setStory(data);
        

    }

    console.log(items);
    location.href = items.url

    // let story = ()=>{
    //   location.href = items.url
    // }

    // call fetchStory function
    useEffect(() => {
        fetchStory();
        // story();
    }, []);

  return (
    <div>
      
    </div>
  );
};

export default Story;