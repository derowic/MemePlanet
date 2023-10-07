import React, { useState } from "react";
import Notification from "@/Components/Notification";
import { FaPlus, FaMinus, FaSadCry } from "react-icons/fa";
import Button from "../Posts/Button";

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
                const response = await axios.post(route("post.like"), {
                    like: tmp,
                    id: elementId,
                });

                setCount(response.data.like);
            } else if (elementType == "comment") {
                const response = await axios.post(route("comment.like"), {
                    like: tmp,
                    id: elementId,
                });

                setCount(response.data.like);
            }
        } catch (error) {
            //Notification(error.response.data.msg);
            console.error("Like -> like error: ", error);
        }
    };

    return (
        <div className="mt-2">
            <Button
                func={increment}
                text={"+"}
                customClass={
                    "mb-2 mr-2 hover:bg-[#ffbc40] text-white font-bold py-2 px-4 rounded-lg border border-[#ffbc40]"
                }
            />
            <span className="count">{count}</span>
            <Button
                func={decrement}
                text={"-"}
                customClass={
                    "mb-2 mr-2 hover:bg-[#7abcf5] text-white font-bold py-2 px-4 rounded-lg border border-[#7abcf5]"
                }
            />
        </div>
    );
}

export default Like;
