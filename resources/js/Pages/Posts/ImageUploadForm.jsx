
import React, { useState, useEffect } from 'react';
import Notification from '@/Components/Notification';
import FetchCategories from '@/Components/FetchCategories';
import axios from 'axios';


const ImageUploadForm = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    var tmp = await FetchCategories();
    setCategories(prevCategories => [...prevCategories, ...tmp]);
  };

  const fetchTags = async () => {
    try {
      const response = await axios.post(`/api/getTags`);
      setTags(prevTags => [...prevTags, ...response.data.tags]);

    } catch (error) {
      Notification(error.response.data.msg);
      console.error("ImageUploadForm -> fetchTags: ",error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags()
    
  }, []);

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

    e.target.value = null;
  };

  const handleUploadClick = () => {
    
    const title = document.getElementById("title");
    const text = document.getElementById("text");

    if
    (
      (image !=null )
      && 
      (title !=null && title !="")
      && 
      (selectedCategory !=null)
    )
    { 
      var tmp = "";
      for (const tag of selectedTags) {
        tmp+=tag+" ";
      }
      onImageUpload(image,title.value, text.value, selectedCategory,tmp);
      setPreviewImage(null); 
      setImage(null); 
      unHide();
      setSelectedCategory(null);
      setSelectedTags([]);
      clearImg();
      title.value = "";
      text.value = "";
    }
    else
    {
      Notification("Image, title and category are required");
    }
  };

  const clearImg = () => {
    if(previewImage != null)
    {
      let get = document.getElementById('attr');
      //get.removeAttribute('src', '');
      
      get = document.getElementById('attr');
      
      get.value = '';
      get.value = null;
      get.target = null;
   
      setPreviewImage(null);
    }
  };

  const unHide = () => {
    //setShouldRender(!shouldRender);  
    const element = document.getElementById("post");
    element.hidden = !element.hidden;
  };

  const close = () => {
    //setShouldRender(!shouldRender); 
    clearImg(); 
    unHide();
  };

  

  const selectCategory = (buttonId) => {

    setSelectedCategory(buttonId);
  };

  const selectTag = (buttonId) => {
    if (selectedTags.includes(buttonId)) {
      setSelectedTags(selectedTags.filter(id => id !== buttonId));
    } else {
      setSelectedTags([...selectedTags, buttonId]);
    }
  };
  

  

  return (
    <div>
      <button className="mt-2 mb-2 bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]" onClick={unHide}>Add new post</button>
      <div id={"post"} hidden>
      
        <input type="file" id="attr2" 
          className="mt-2 mb-2 bg-[#EEA243] hover:bg-[#FFC465] text-white font-bold py-2 px-2 rounded-lg " 
          onChange={handleImageChange} 
          accept="image/*" />

        <h1>Title</h1>
        <input id="title"
          className='mt-2 mb-2 bg-[#555] hover:bg-[#666] text-white font-bold py-2 px-2 rounded-lg border border-[#555] focus:border-[#666]' type='text'/>

        <h1>Text (optional)</h1>
        <input id="text"
          className='mt-2 mb-2 bg-[#555] hover:bg-[#666] text-white font-bold py-2 px-2 rounded-lg border border-[#555] focus:border-[#666]' type='text'/>
        
        <div className='flex flex-wrap justify-center'>
          {previewImage && <img id="attr" src={previewImage} alt="Preview" />}
        </div>
        <h1>Categories</h1>
        <div className='flex flex-wrap justify-center'>
          {categories.map(category => (
            <button
              key={"category"+category.id}
              className={`${
                selectedCategory === category.id
                  ? "bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg border border-blue-600"
                  : "bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg border border-blue-600"
              } m-2`} // Dodaj klasę m-2 dla odstępu między przyciskami
              onClick={() => selectCategory(category.id)}
            >
              {category.text}
            </button>
          ))}
          </div>

          <h1>Tags</h1>
          <div className='flex flex-wrap justify-center'>
          {tags.map(tag => (
            <button
              key={"tag" + tag.id}
              className={`${
                selectedTags.includes(tag.id) // Sprawdź, czy tag jest zaznaczony
                  ? "bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg border border-green-600"
                  : "bg-green-400 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-lg border border-green-600"
              } m-2`}
              onClick={() => selectTag(tag.id)}
            >
              {tag.text}
            </button>
          ))}
        </div>

         
        <button className="bg-[#EEA243] mb-2 mr-2 hover:bg-[#FFC465] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]" onClick={handleUploadClick}>Upload</button>
        <button className="bg-[#CCCC44] mb-2 mr-2 hover:bg-[#DDDD44] text-white font-bold py-2 px-4 rounded-lg border border-[#EEA243]" onClick={clearImg}>clear</button>
        <button className="bg-[#FF5555] mb-2 hover:bg-[#FF7777] text-white font-bold py-2 px-4 rounded-lg border border-[#FF5555]" onClick={close}>close</button>

        
      </div>
    </div>
  );
};

export default ImageUploadForm;
