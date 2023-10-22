import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchReports = async (rout, params, setReports) => {
    try {
        let t = await FetchIndex(rout, params);
        setReports((prevTags) => [...prevTags, ...t]);
    } catch (error) {
        console.error(error);
    }
};
export default FetchReports;
