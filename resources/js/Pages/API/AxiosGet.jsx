import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const AxiosGet = async (rout, routData, data, setData) => {
    //console.log(rout," ",routData);
    return await axios.get(route(rout, routData), data)
        .then((response) => {

            Notify(response.data.message, null, response.status);
            if (setData) {
                setData(response.data.data);
            }
            return response.data.data;
        })
        .catch((error) => {
            Notify(error.response.data.message, "error");
            console.error(error);
        });
};

/*
const AxiosGet = async (rout, routData, data) => {
    try {
      const response = await axios.get(route(rout, routData), data);
      Notify(response.data.message);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  */
export default AxiosGet;
