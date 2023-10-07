import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "@/Components/Notification";
import "../styles.css";

const SendComment = async (postId, text, parentId) => {
    try {
        const response = await axios.post(route("comment.store"), {
            post_id: postId,
            comment_id: parentId,
            text: text,
        });
    } catch (error) {
        //Notification(error.response.data.msg);
        console.error("SendComment error: ", error);
    }
};
export default SendComment;
