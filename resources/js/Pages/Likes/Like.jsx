import React, { useState } from "react";
import Notification from "@/Components/Notification";
import { FaPlus, FaMinus, FaSadCry } from "react-icons/fa";

function Like({ elementId, elementType, likes }) {
    if (likes == null) {
        likes = 0;
    }
    const [count, setCount] = useState(likes);

    const increment = () => {
        like(true);
    };

    const decrement = () => {
        like(false);
    };

    const like = async (tmp) => {
        try {
            if (elementType == "post") {
                const response = await axios.post("/likePost", {
                    like: tmp,
                    id: elementId,
                });

                setCount(response.data.like);
            } else if (elementType == "comment") {
                const response = await axios.post("/likeComment", {
                    like: tmp,
                    id: elementId,
                });

                setCount(response.data.like);
            }
        } catch (error) {
            Notification(error.response.data.msg);
            console.error("Like -> like error: ", error);
        }
    };

    return (
        <div className="mt-2">
            <button
                className="bg-[#A7C957] mb-2 mr-2 hover:bg-[#C9EB79] text-white font-bold py-2 px-4 rounded-lg border border-[#A7C957]"
                onClick={increment}
            >
                <FaPlus />
            </button>
            <span className="count">{count}</span>
            <button
                className="bg-[#6A994E] mb-2 mr-2 hover:bg-[#8CBB6F] text-white font-bold py-2 px-4 rounded-lg border border-[#6A994E]"
                onClick={decrement}
            >
                <FaMinus />
            </button>
        </div>
    );
}

export default Like;
