import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Input({ type, title, value, onChange, required = null }) {
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
                className="bg-black3 hover:bg-black3-h text-white font-bold py-2 px-2 border border-[#555] focus:border-[#666]  w-full"
                required={required}
            />
        </div>
    );
}

export default Input;
