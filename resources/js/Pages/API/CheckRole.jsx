import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { usePage } from "@inertiajs/react";
import Notify from "@/Components/Notify";

const CheckRole = (roleName) => {
    const user = usePage().props.auth.user;

    if (user && user.roles.some((role) => role.name === roleName)) {
        return true;
    } else {
        return false;
    }
};
export default CheckRole;
