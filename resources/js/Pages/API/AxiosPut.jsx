import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosPut = async (rout, routData, data) => {
    console.log(rout, routData, data);
    try {
        const response = await axios.put(route(rout, routData), data);
        Notify(response.data.message, null, response.status);

        console.log(response);
        return response.data.data;

    } catch (error) {
        Notify(error.response.data.message, "error");
        console.error("Axios put error: ", error);
    }
};
export default AxiosPut;
