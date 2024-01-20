import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Notify from "@/Components/Notify";

function LogedIn() {
    if (usePage().props.auth.user) {
        return true;
    } else {
        return false;
    }
}

export default LogedIn;
