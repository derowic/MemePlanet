import React, { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";
import Notify from "@/Components/Notify";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPost = ({ categories, tags, fetchTags }) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(false);


    return (
        <div>
            <ImageUploadForm
                categories={categories}
                tags={tags}
            />
        </div>
    );
};

export default UploadPost;
