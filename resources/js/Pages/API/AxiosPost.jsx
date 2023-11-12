import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosPost = async (rout, routData, data) => {
    try {
        const response = await axios.post(route(rout, routData), data);
        console.log(response);
        Notify(response.data.msg,null,response.status);

        return response.data.data;
    } catch (error) {
        console.error("Axios post error: ", error);
        Notify(error);
    }
};
export default AxiosPost;
