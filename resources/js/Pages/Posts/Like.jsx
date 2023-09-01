import React, { useState } from 'react';
import { FaPlus, FaMinus, FaSadCry } from 'react-icons/fa';

function Like({elementId, elementType, likes}) {
  if(likes == null)
  {
    likes = 0;
  }
  const [count, setCount] = useState(likes);
  
  

  const increment = () => {
    //setCount(count + 1);
    like(true);
  };

  const decrement = () => {
    //setCount(count - 1);
    like(false);
  };

  const like = async (tmp) => {
    try {
   
      if(elementType == "post")
      {
        const response = await axios.post('/api/likePost', {
          like: tmp, 
          id: elementId// Przesyłamy wartość zmiennej jako część ciała żądania
        });
        console.log('Dane zostały przesłane', response.data);
        setCount(response.data.like);
      }
      else if(elementType == "comment")
      {
        const response = await axios.post('/api/likeComment', {
          like: tmp, 
          id: elementId// Przesyłamy wartość zmiennej jako część ciała żądania
        });
        console.log('Dane zostały przesłane', response.data);
        setCount(response.data.like);
      }

      // Obsłuż odpowiedź serwera
    } catch (error) {
      console.error('Błąd przesyłania danych:', error);
      // Obsłuż błędy
    }
  };

  return (
    <div className="mt-2">
      <button className="bg-[#A7C957] mb-2 mr-2 hover:bg-[#C9EB79] text-white font-bold py-2 px-4 rounded-lg border border-[#A7C957]" onClick={increment}>
        <FaPlus />
      </button>
      <span className="count">{count}</span>
      <button className="bg-[#6A994E] mb-2 mr-2 hover:bg-[#8CBB6F] text-white font-bold py-2 px-4 rounded-lg border border-[#6A994E]" onClick={decrement}>
        <FaMinus />
      </button>
    </div>
  );
}

export default Like;
