import React, { useState } from "react";
import DefaultButton from "../../BasicElements/DefaultButton";
import LogedIn from "@/Pages/API/LogedIn";
import Notify from "@/Components/Notify";
import CheckPermission from "@/Pages/API/CheckPermission";
import AxiosPost from "@/Pages/API/AxiosPost";

const Fav = ({ postId, is_Fav }) => {
    let loged = LogedIn();
    let role = CheckPermission("post.fav");
    const addPostToFavourite = () => {
        setPostToFavourite(postId);
    };

    const [isFav, setIsFav] = useState(is_Fav);

    const setPostToFavourite = async (postId) => {
        if (loged) {
            if (role) {
                try {
                    const response = await AxiosPost("favourite.store", {
                        post_id: postId,
                    });
                    if (response.added == true) {
                        setIsFav(true);
                    } else if (response.added == false) {
                        setIsFav(false);
                    }
                } catch (error) {
                    console.error(
                        "Fav.jsx -> setPostToFavourite error: ",
                        error,
                    );
                }
            } else {
                Notify("You don't have permission", "info");
            }
        } else {
            Notify("You need to be log in", "info");
        }
    };

    return (
        <div className="ml-2 ">
            <DefaultButton
                onClick={addPostToFavourite}

                text={"+"}
                className={
                    isFav == true
                        ? "mt-2 mb-2 mr-2 bg-[#fce062] text-black font-bold py-2 px-4 rounded-lg border border-[#fce062]"
                        : "mt-2 mb-2 mr-2 hover:bg-[#fce062] text-white font-bold py-2 px-4 rounded-lg border border-[#fce062]"
                }
            />
        </div>
    );
};

export default Fav;
