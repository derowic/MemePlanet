import React, { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';

import axios from 'axios';

const UploadPost = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/upload', formData);
      setUploadedImageUrl(response.data.imageUrl);
      setImageUploaded(true);
      console.log('Obrazek przesłano pomyślnie!', response.data);
    } catch (error) {
      console.error('Błąd przesyłania obrazka:', error);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Image Upload and Display</h1>
      <ImageUploadForm onImageUpload={handleImageUpload} />

      {imageUploaded && (
        <>
          {/* Tutaj umieść elementy, które mają się pokazać po załadowaniu obrazka */}
          <h1>TESKT DO OBRZA</h1>
        </>
      )}

    </div>
  );
};

export default UploadPost;
