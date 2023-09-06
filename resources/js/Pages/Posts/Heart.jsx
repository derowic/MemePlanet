import React, { useState } from 'react';




const Heart = ({postId,fav}) => {
  const [heart, setHeart] = useState(fav); 

  const addPostToFavourite = () => {
    setHeart(prevHeart => !prevHeart); 
    setPostToFavourite(postId);
  };

  const setPostToFavourite = async (postId) => {
    try {
        const response = await axios.post('/addToFavourite', {
            post: postId,
        });
    } catch (error) {
        console.error('Heart -> setPostToFavourite error: ', error);
    }
    
  };

  return (
    <div className='ml-2'>
      <button onClick={addPostToFavourite}>
        <img src={heart ? 'heart1.png' : 'heart0.png'} />
      </button>
    </div>
  );
};

export default Heart;
