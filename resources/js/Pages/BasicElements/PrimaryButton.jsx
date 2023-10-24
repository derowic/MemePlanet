import React from "react";

export default function PrimaryButton({ text, onClick, className }) {
    /* */
    return (
        <button
            onClick={onClick}
            className={
                "border border-green-500 rounded-lg p-2 m-1 hover:bg-green-300"
            }
        >
            {text}
        </button>
    );
}
