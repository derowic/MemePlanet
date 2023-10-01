import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import axios from "axios";

const FetchTags = async () => {
    try {
        const response = await axios.post(`/getTags`);
        return response.data.tags;
    } catch (error) {
        Notification(error.response.data.msg);
        console.error("FetchTags -> error: ", error);
    }
};

export default FetchTags;
