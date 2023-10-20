import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Button({ func, text, customClass }) {
    return (
        <button
            onClick={func}
            //className={className ? "text-red font-bold px-2" : className}
            className={` ${
                customClass || "m-2 px-2 hover:border-b hover:border-[#ffbc40]"
            }`}
        >
            {text}
        </button>
    );
}

export default Button;
