import React, { useState } from 'react';




const Heart = ({postId,fav}) => {
  console.log("ULUBIONY ",fav);
  const [heart, setHeart] = useState(fav); // Początkowy stan: serce nie jest zalajkowane

  const addPostToFavourite = () => {
    setHeart(prevHeart => !prevHeart); // Odwracanie stanu serca
    setPostToFavourite(postId);
  };

  const setPostToFavourite = async (postId) => {
  
    console.log("idpostaa: "+postId);
    try {
        const response = await axios.post('/api/addToFavourite', {
            idPost: postId,
           
        });
        console.log('Wiadomośc', response.data);
        
        // Obsłuż odpowiedź serwera
    } catch (error) {
        console.error('Błąd przesyłania danych:', error);
        // Obsłuż błędy
    }
    
  };

  return (
    <div className='ml-2'>
      <button onClick={addPostToFavourite}>
        <img
          
          src={heart ? 'heart1.png' : 'heart0.png'} // Używanie dynamicznej ścieżki obrazka
          
        />
      </button>
    </div>
  );
};

export default Heart;
