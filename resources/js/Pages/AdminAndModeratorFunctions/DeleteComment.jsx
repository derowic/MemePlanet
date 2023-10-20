import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteComment = async (commentId) => {
    try {
        const response = await axios.delete(
            route("admin.deleteComment", { comment: commentId }),
        );
        //console.log(response.data);
        toast.success(response.data.msg);
    } catch (error) {
        console.error("SetPostToMainPage: ", error);
        Notify(error);
    }
};
export default DeleteComment;
