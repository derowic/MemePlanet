import React, { useState } from "react";
import DefaultButton from "../../BasicElements/DefaultButton";
import LogedIn from "@/Pages/API/LogedIn";
import Notify from "@/Components/Notify";
import CheckRole from "@/Pages/API/CheckRole";

const Fav = ({ postId, is_Fav }) => {
    let loged = LogedIn();
    let role = true; //CheckRole("user");
    const addPostToFavourite = () => {
        setPostToFavourite(postId);
    };

    const [isFav, setIsFav] = useState(is_Fav);

    const setPostToFavourite = async (postId) => {
        if (loged) {
            if (role) {
                try {
                    const response = await axios.post(
                        route("favourite.store"),
                        {
                            post: postId,
                        },
                    );

                    if (response.data.message == "Post added to favourite") {
                        setIsFav(true);
                        Notify("Post added to favourite", "success");
                    } else if (
                        response.data.message == "Post removed from favourites"
                    ) {
                        setIsFav(false);
                        Notify("Post removed from favourites", "success");
                    } else {
                        console.error("Fav.jsx -> setPostToFavourite error");
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
                //selected={selectedCategory === category.id}
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
