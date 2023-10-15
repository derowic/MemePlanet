import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";
import "../styles.css";

const SendComment = async (postId, text, parentId) => {
    try {
        const response = await axios.post(route("comment.store"), {
            post_id: postId,
            comment_id: parentId,
            text: text,
        });

        Notify(response.data.msg);

        let tmp = parentId;
        let type = "comment-comment";
        if (parentId == 0) {
            tmp = postId;
            type = "post-comment";
        }

        console.log("parent: ", parentId, " ", postId, " ", tmp);
        const response2 = await axios.post(route("notification.store"), {
            element_id: tmp,
            type: type,
        });
        Notify(response2.data.msg);
    } catch (error) {
        //Notification(error.response.data.msg);
        console.error("SendComment error: ", error);
        Notify(error);
    }
};
export default SendComment;
