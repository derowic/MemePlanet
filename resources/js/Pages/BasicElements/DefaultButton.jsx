import React from "react";

export default function DefaultButton({ text, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={` ${
                className ||
                "border border-[#ffaa00] rounded-lg p-2 m-1 hover:bg-[#ffe1a6]"
            }`}
        >
            {text}
        </button>
    );
}
