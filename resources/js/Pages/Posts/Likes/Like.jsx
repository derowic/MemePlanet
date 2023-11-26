import React, { useState } from "react";
import Notification from "@/Components/Notify";
import DefaultButton from "../../BasicElements/DefaultButton";
//import LogedIn from "@/Pages/API/LogedIn";
import { usePage } from "@inertiajs/react";
import Notify from "@/Components/Notify";
import LogedIn from "@/Pages/API/LogedIn";

function Like({ elementId, elementType, likes, is_liked }) {
    //console.log(usePage().props.auth);
    let loged = LogedIn();

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
        if (loged) {
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
                setCount(response.data.like);
                setIsLiked(response.data.is_liked);
            } catch (error) {
                //Notification(error.response.data.msg);
                console.error("Like -> like error: ", error);
            }
        } else {
            Notify("You need to be log in", "info");
        }
    };

    return (
        <div className="mt-2">
            <DefaultButton
                onClick={increment}
                text={"+"}
                className={
                    isLiked
                        ? "mb-2 mr-2 text-white font-bold py-2 px-4 rounded-lg border border-meme_violet"
                        : "mb-2 mr-2 text-white font-bold py-2 px-4 rounded-lg border"
                }
            />
            <span className="count">{count}</span>
            {/*<DefaultButton
                onClick={decrement}
                text={"-"}
                className={
                    "ml-2 mb-2 mr-2 text-white font-bold py-2 px-4 rounded-lg border"
                }
            />*/}
        </div>
    );
}

export default Like;
