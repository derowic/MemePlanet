import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosPost = async (rout, routData, data) => {
    try {
        const response = await axios.post(route(rout, routData), data);

        Notify(response.data.message, null, response.status);

        return response.data.data;
    } catch (error) {
        Notify(error.response.data.message, "error");
        console.error("Axios post error: ", error);
    }
};
export default AxiosPost;
