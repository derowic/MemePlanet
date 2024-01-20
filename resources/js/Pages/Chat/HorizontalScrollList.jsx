import React from "react";
import "../scrollbar.css";

const HorizontalScrollList = () => {
    const items = Array.from({ length: 25 }, (_, index) => index + 1);

    return (
        <div
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            className=" h-50 text-white bg-meme_black"
        >
            <div className="p-2">
                {items.map((item) => (
                    <div
                        key={item}
                        style={{
                            display: "inline-block",
                            width: "100px",
                            margin: "0 2px",
                            border: "1px solid #ddd",
                            padding: "10px",
                            height: 50,
                        }}
                    >
                        Item {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScrollList;
