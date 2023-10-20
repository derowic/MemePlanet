import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchCategories = async (rout, params, setCategories) => {
    try {
        let t = await FetchIndex(rout, params);
        setCategories((prevTags) => [...prevTags, ...t]);
    } catch (error) {
        console.error(error);
    }
};
export default FetchCategories;
