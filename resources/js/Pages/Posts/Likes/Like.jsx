import React, { useState } from "react";
import Notification from "@/Components/Notify";

import Button from "../../BasicElements/Button";

function Like({ elementId, elementType, likes, is_liked }) {
    if (likes == null) {
        likes = 0;
    }
    const [count, setCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(is_liked);

    const increment = () => {
        like(true);
    };

    const decrement = () => {
        like(false);
    };

    const like = async (tmp) => {
        try {
            let rout = "";
            if (elementType == "post") {
                rout = "post.like";
            } else if (elementType == "comment") {
                rout = "comment.like";
            }

            const response = await axios.post(route(rout), {
                like: tmp,
                id: elementId,
            });
            //console.log(response);
            setCount(response.data.like);
            setIsLiked(response.data.is_liked);
        } catch (error) {
            //Notification(error.response.data.msg);
            console.error("Like -> like error: ", error);
        }
    };

    return (
        <div className="mt-2">
            <Button
                onClick={increment}
                text={"+"}
                customClass={
                    isLiked
                        ? "mb-2 mr-2 text-white font-bold py-2 px-4 rounded-lg border border-[#7d12ff]"
                        : "mb-2 mr-2 text-white font-bold py-2 px-4 rounded-lg border"
                }
            />
            <span className="count">{count}</span>
            <Button
                onClick={decrement}
                text={"-"}
                customClass={
                    "ml-2 mb-2 mr-2 text-white font-bold py-2 px-4 rounded-lg border"
                }
            />
        </div>
    );
}

export default Like;
