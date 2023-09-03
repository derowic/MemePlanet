import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';

import axios from 'axios';

const UploadPost = ({ fetchPosts }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = async (image, title, text, category,tags) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('category', category);
    formData.append('tags', tags);

    try {
      const response = await axios.post('/api/upload', formData);
     
      setUploadedImageUrl(response.data.imageUrl);
      setImageUploaded(true);
      
      fetchPosts();
      
    } catch (error) {
     
      console.error("UploadPost error: ",error);
    }
  };

  return (
    <div>
      <ImageUploadForm onImageUpload={handleImageUpload} />

        {imageUploaded && (
            <h1>TESKT DO OBRZA</h1>
        )}
    </div>
  );
};

export default UploadPost;
