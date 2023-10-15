import React, { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";
import Notify from "@/Components/Notify";
import axios from "axios";

const UploadPost = ({ fetchPosts, categories, tags }) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleImageUpload = async (image, title, text, category, tags) => {
        if (image != null && title != null && title != "" && category != null) {
            try {
                const formData = new FormData();
                formData.append("image", image); // Przyjmuję, że 'image' to zmienna zawierająca plik
                formData.append("title", title);
                formData.append("text", text);
                formData.append("category", category);
                /*
                // Dodajemy tagi jako tablicę
                tags.forEach((tag) => {
                    formData.append('tags[]', tag);
                });
                */

                const response = await axios.post(
                    route("post.store"),
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Ustawiamy odpowiedni Content-Type
                        },
                    },
                );

                setUploadedImageUrl(response.data.imageUrl);
                setImageUploaded(true);
                fetchPosts();

                console.log(response);
                Notify(response.data.msg);
            } catch (error) {
                console.error("UploadPost error: ", error);
                Notify(error);
            }
        } else {
            //Notification("Image, title and category are required");
            console.error("UploadPost error: ", error);
        }
    };

    return (
        <div>
            <ImageUploadForm
                onImageUpload={handleImageUpload}
                categories={categories}
                tags={tags}
            />
            {imageUploaded && <h1>TESKT DO OBRZA</h1>}
        </div>
    );
};

export default UploadPost;
