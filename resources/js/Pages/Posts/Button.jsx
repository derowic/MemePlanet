import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function Button() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
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
