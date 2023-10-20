import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const FetchComments = async (postId, rout, setComments) => {
    try {
        let t = await FetchIndex(rout, { id: postId });
        setComments(t);
    } catch (error) {
        toast.error("Error FetchComments");
        console.error("FetchComments error: ", error);
    }
};
export default FetchComments;
