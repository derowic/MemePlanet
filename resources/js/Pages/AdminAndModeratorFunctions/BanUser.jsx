import React, { useState, useEffect } from "react";
import axios from "axios";
import Notify from "@/Components/Notify";

const BanUser = async (user_id, banType_id, ban_reason) => {
    try {
        console.log(user_id, banType_id, ban_reason);
        const response = await axios.post(route("admin.banUser", {}), {
            user_id: user_id,
            ban_id: banType_id,
            report_id: ban_reason,
        });
        Notify(response.data.msg);
    } catch (error) {
        console.error("SetPostToMainPage: ", error);
        Notify(error);
    }
};
export default BanUser;
