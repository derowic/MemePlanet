import React, { useState, useEffect } from "react";
import axios from "axios";

const ImproveTag = async (path, id) => {
    try {
        const response = await axios.put(route(path, { tag: id }));

        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("error: ", error);
    }
};
export default ImproveTag;
