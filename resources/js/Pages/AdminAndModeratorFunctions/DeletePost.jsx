import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const DeletePost = async (postId) => {
    try {
        const response = await axios.delete(
            route("admin.deletePost", { post: postId }),
        );
        Notify(response.data.msg);
    } catch (error) {
        console.error("SetPostToMainPage: ", error);
        Notify(error);
    }
};
export default DeletePost;
