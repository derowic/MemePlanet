import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchIndex = async (path, params) => {
    try {
        const response = await axios.get(route(path), { params });
        /*
    params: {
          id: userId,
        },
         */
        //console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("error: ", error);
    }
};
export default FetchIndex;
