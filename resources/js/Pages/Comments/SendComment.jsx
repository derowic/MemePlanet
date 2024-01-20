import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";
import AxiosPost from "../API/AxiosPost";

const SendComment = async (postId, text, parentId) => {
    try {
        let response = await AxiosPost("comment.store", {
            post_id: postId,
            comment_id: parentId,
            text: text,
        });

        let tmp = parentId;
        let type = "comment-comment";
        if (parentId == null) {
            tmp = postId;
            type = "post-comment";
        }

        AxiosPost("notification.store", {
            element_id: tmp,
            type: type,
        });

        return response;
    } catch (error) {
        console.error("SendComment error: ", error);
        Notify(error);
    }
};
export default SendComment;
