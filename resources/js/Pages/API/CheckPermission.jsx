import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FetchIndex from "./FetchIndex";
import { usePage } from "@inertiajs/react";

const CheckPermission = (permissionName) => {
    const user = usePage().props.auth.user;

    const hasPermission = user.roles.some(role => {
        return role.permissions.some(permission => permission.name === permissionName);
    });

    if (hasPermission)
    {
        return true;
    }
    else
    {
        return false;
    }
};
export default CheckPermission;
