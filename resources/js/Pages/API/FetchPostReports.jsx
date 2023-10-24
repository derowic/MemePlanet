import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchPostReports = async (rout, params, setReports) => {
    try {
        let t = await FetchIndex(rout, params);
        setReports(t);
    } catch (error) {
        console.error(error);
    }
    /*
    try {
        const response = await axios.get(route(rout), { params });
        console.log(response);
        //return response.data.data;
    } catch (error) {
        console.error("error: ", error);
    }
    */
};
export default FetchPostReports;
