import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import Notification from '@/Components/Notification';
import axios from 'axios';

const UploadPost = ({ fetchPosts }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = async (image, title, text, category,tags) => {

    if
    (
      (image !=null )
      && 
      (title !=null && title !="")
      && 
      (category !=null)
    )
      {
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
        Notification(error.response.data.msg);
        console.error("UploadPost error: ",error);
      }
    }
    else
    {
      Notification("Image, title and category are required");
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
