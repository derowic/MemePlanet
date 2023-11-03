import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";

const EditTag = async (rout, params) => {
    try {
        axios
            .put(route(rout), { params })
            .then((response) => {
                console.log(response.data);
                return response.data.data;
            })
            .catch((error) => {
                console.error(error);
            });
        //const response = await axios.put(route(path), { params });
        //console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("error: ", error);
    }
};
export default EditTag;
