import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify = (text,type = "default") => {
    if(type == "default")
    {
        toast(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else if(type == "success")
    {
        toast.success(text);
    }
    else if(type == "error")
    {
        toast.error(text);
    }
    else if(type == "warning")
    {
        toast.warning(text);
    }
    else if(type == "info")
    {
        toast.info(text);
    }
};

export default Notify;
