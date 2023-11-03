import React, { useState } from "react";
//import LogedIn from "@/Pages/API/LogedIn";
import { usePage } from "@inertiajs/react";
import Notify from "@/Components/Notify";

function LogedIn() {
    //console.log(usePage().props.auth);
    if(usePage().props.auth.user)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export default LogedIn;
