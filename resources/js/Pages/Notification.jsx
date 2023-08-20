import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {
  const notify = () => {
    //toast('This is a notification');
    toast('Custom notification', {
        position: 'bottom-right', // Pozycja notyfikacji
        autoClose: 3000, // Czas wyświetlania (w milisekundach)
        hideProgressBar: false, // Ukryj pasek postępu
        closeOnClick: true, // Zamknij notyfikację po kliknięciu
        pauseOnHover: true, // Wstrzymaj czas wyświetlania po najechaniu myszką
        draggable: true, // Przeciągnij notyfikację
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
