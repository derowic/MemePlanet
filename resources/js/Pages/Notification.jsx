import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  const notify = () => {
  
    toast('Custom notification', {
        position: 'bottom-right', 
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true, 
    });
  };

  return (
    <div>
      <button onClick={notify}>Show Notification</button>
      <ToastContainer />
    </div>
  );
}

export default Notification;
