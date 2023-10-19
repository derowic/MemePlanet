import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const DeleteComment = async (commentId) => {
    try {
        const response = await axios.delete(
            route("admin.deleteComment", { comment: commentId }),
        );
        console.log(response.data);
        Notify(response.data.msg);
    } catch (error) {
        console.error("SetPostToMainPage: ", error);
        Notify(error);
    }
};
export default DeleteComment;
