import React, { useState } from 'react';

const ImageUploadForm = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUploadClick = () => {
    if (image) {
      onImageUpload(image); // Ta linia przesyła obrazek na backend
      setPreviewImage(null); // Czyścimy podgląd obrazka
      setImage(null); // Czyścimy stan z wybranym obrazkiem
    }
  };

  const clearImg = () => {
    let get = document.getElementById('attr');
    get.removeAttribute('src', '');

    get = document.getElementById('attr2');
    
    get.value = '';
    get.value = null;
    
  };

  return (
    <div>
      <input type="file" id="attr2" onChange={handleImageChange} accept="image/*" />
      {previewImage && <img id="attr" src={previewImage} alt="Preview" />}
      <button onClick={handleUploadClick}>Upload</button>
      <button onClick={clearImg}>clear</button>
    </div>
  );
};

export default ImageUploadForm;
