import React, { useState, useEffect } from "react";
import Notification from "./Notify";
import axios from "axios";

const FetchCategories = async () => {
    try {
        const response = await axios.post(`/getCategories`);
        return response.data.categories;
    } catch (error) {
        Notification(error.response.data.msg);
        console.error("FetchCategories -> error: ", error);
    }
};

export default FetchCategories;
