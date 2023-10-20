import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchTags = async (rout, params, setTags) => {
    try {
        let t = await FetchIndex(rout, params);
        setTags((prevTags) => [...prevTags, ...t]);
    } catch (error) {
        console.error(error);
    }
};
export default FetchTags;
