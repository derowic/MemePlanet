import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosPost = async (rout, routData, data) => {
    try {
        console.log(data);
        const response = await axios.post(route(rout, routData), data);
        Notify(response.data.msg);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Store error: ", error);
        Notify(error);
    }
};
export default AxiosPost;
