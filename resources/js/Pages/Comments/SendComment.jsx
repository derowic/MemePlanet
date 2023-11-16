import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";
import AxiosPost from "../API/AxiosPost";

const SendComment = async (postId, text, parentId) => {
    try {
        /*
        const response = await axios.post(route("comment.store"), {
            post_id: postId,
            comment_id: parentId,
            text: text,
        });
        */

        AxiosPost("comment.store", {
            post_id: postId,
            comment_id: parentId,
            text: text,
        });

        let tmp = parentId;
        let type = "comment-comment";
        if (parentId == 0) {
            tmp = postId;
            type = "post-comment";
        }

        AxiosPost("notification.store", {
            element_id: tmp,
            type: type,
        });
    } catch (error) {
        //Notification(error.response.data.msg);
        console.error("SendComment error: ", error);
        Notify(error);
    }
};
export default SendComment;
