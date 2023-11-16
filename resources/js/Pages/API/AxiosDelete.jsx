import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosDelete = async (rout, routData, data) => {
    try {
        const response = await axios.delete(route(rout, routData), data);
        Notify(response.data.msg, null, response.status);

        return response.data.data;
    } catch (error) {
        Notify(error, "error");
        console.error("Axios delete error: ", error);
    }
};
export default AxiosDelete;
