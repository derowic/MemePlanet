import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const RefreshPosts = async (rout, params, setPosts) => {
    try {
        setPosts([]);
        const response = await FetchIndex(rout, params);
        setPosts((prevPosts) => [...prevPosts, ...response]);
    } catch (error) {
        console.error(error);
    }
};
export default RefreshPosts;
