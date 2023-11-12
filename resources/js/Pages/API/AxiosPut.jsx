import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosPut = async (rout, routData, data) => {
    try {
        const response = await axios.put(route(rout, routData), data);
        Notify(response.data.msg,null,response.status);

        return response.data.data;
    } catch (error) {
        console.error("Axios put error: ", error);
        Notify(error);
    }
};
export default AxiosPut;
