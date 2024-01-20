import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosGet = async (rout, routData, data, setData) => {
    return await axios
        .get(route(rout, routData), data)
        .then((response) => {
            Notify(response.data.message, null, response.status);
            if (setData) {
                setData(response.data.data);
            }
            return response.data.data;
        })
        .catch((error) => {
            if (error) {
                Notify(error.response.data.message, "error");
                console.error(error);
            } else {
                console.error("error");
            }
        });
};

export default AxiosGet;
