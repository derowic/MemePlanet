import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";
import AxiosPost from "../API/AxiosPost";

const BanUser = async (user_id, banType_id, ban_reason) => {
    try {
        AxiosPost("ban.banUser",null,{
            user_id: user_id,
            ban_id: banType_id,
            report_id: ban_reason,
        });
    } catch (error) {
        console.error("Ban user: ", error);
        Notify(error);
    }
};
export default BanUser;
