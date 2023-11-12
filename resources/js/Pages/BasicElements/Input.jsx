import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Input({ type, title, value, onChange, required = null, className }) {
    /*const handleInputChange = (event) => {
        func(event.target.value);
    };
    */

    return (
        <div>
            <label className="gap-4">{title}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={className}
                required={required}
            />
        </div>
    );
}

export default Input;
