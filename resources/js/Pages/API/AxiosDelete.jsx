import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosDelete = async (rout, routData, data) => {
    try {
        const response = await axios.delete(route(rout, routData), data);
        console.log(response);
        Notify(response.data.msg);
        return response;
    } catch (error) {
        console.error("Store error: ", error);
        Notify(error);
    }
};
export default AxiosDelete;
