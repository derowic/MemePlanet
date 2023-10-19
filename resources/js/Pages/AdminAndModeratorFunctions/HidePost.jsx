import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const HidePost = async (postId) => {
    try {
        const response = await axios.post(
            route("admin.hidePost", { post: postId }),
        );
        console.log(response.data);
        Notify(response.data.msg);
    } catch (error) {
        console.error("SetPostToMainPage: ", error);
        Notify(error);
    }
};
export default HidePost;
