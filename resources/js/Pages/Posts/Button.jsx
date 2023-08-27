import React, { useState } from 'react';
import { FaPlus, FaMinus, FaSadCry } from 'react-icons/fa';

function Button() {
  const [count, setCount] = useState(0);

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
      const response = await axios.post('/api/like', {
        like: tmp // Przesyłamy wartość zmiennej jako część ciała żądania
      });
      console.log('Dane zostały przesłane', response.data);
      setCount(response.data.like);
      // Obsłuż odpowiedź serwera
    } catch (error) {
      console.error('Błąd przesyłania danych:', error);
      // Obsłuż błędy
    }
  };

  return (
    <div className="">
      <button className="btn add-btn" onClick={increment}>
        <FaPlus />
      </button>
      <span className="count">{count}</span>
      <button className="btn delete-btn" onClick={decrement}>
        <FaMinus />
      </button>
    </div>
  );
}

export default Button;
