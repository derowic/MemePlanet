import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchPosts = async (rout, params, setPosts, page, setPage) => {
    try {
        const response = await FetchIndex(rout, params);
        setPosts((prevPosts) => [...prevPosts, ...response]);
        setPage(page + 1);
        console.log("fetchPosts try load new posts ");
    } catch (error) {
        console.error(error);
    }
};
export default FetchPosts;
