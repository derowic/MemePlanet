import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Button({ onClick, text, customClass }) {
    return (
        <button
            onClick={onClick}
            //className={className ? "text-red font-bold px-2" : className}
            className={` ${
                customClass || "m-2 px-2 "
            }`}
        >
            {text}
        </button>
    );
}

export default Button;
