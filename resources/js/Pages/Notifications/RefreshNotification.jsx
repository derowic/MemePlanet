import React, { useEffect } from 'react';

function RefreshNotification() {
  useEffect(() => {

    const intervalId = setInterval(() => {

      console.log('Wykonywanie co 5 sekund');
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Twój komponent React</div>;
}

export default RefreshNotification;
