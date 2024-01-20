import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Button({ onClick, text, className }) {
    return (
        <button
            onClick={onClick}
            className={` ${className || "m-2 px-2 "}`}
        >
            {text}
        </button>
    );
}

export default Button;
