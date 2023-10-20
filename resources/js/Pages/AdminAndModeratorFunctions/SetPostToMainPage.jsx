import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const SetPostToMainPage = async (postId) => {
    try {
        const response = await axios.post(
            route("admin.mainPage", { post: postId }),
        );
        Notify(response.data.msg);
    } catch (error) {
        console.error("SetPostToMainPage: ", error);
        Notify(error);
    }
};
export default SetPostToMainPage;
