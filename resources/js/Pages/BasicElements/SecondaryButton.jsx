import React from "react";

export default function SecondaryButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className={
                "border border-red-500 rounded-lg p-2 m-1 hover:bg-red-300"
            }
        >
            {text}
        </button>
    );
}
