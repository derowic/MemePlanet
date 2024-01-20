import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Input({
    type,
    title,
    value,
    onChange,
    placeholder,
    required = null,
    className,
}) {
    /*const handleInputChange = (event) => {
        func(event.target.value);
    };
    */

    return (
        <div className={className}>
            <label className="gap-4 text-white">{title}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={"w-full rounded-lg text-black"}
                required={required}
            />
        </div>
    );
}

export default Input;
