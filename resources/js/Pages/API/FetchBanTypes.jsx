import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchBanTypes = async (rout, params, setBans) => {
    try {
        let t = await FetchIndex(rout, params);
        console.log(t);
        setBans((prevTags) => [...prevTags, ...t]);
    } catch (error) {
        console.error(error);
    }
};
export default FetchBanTypes;
