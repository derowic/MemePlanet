import React, { useState } from "react";
import Button from "../../BasicElements/Button";

const Fav = ({ postId, is_Fav }) => {
    const addPostToFavourite = () => {
        setPostToFavourite(postId);
    };

    const [isFav, setIsFav] = useState(is_Fav);

    const setPostToFavourite = async (postId) => {
        try {
            const response = await axios.post(route("post.fav"), {
                post: postId,
            });

            if (response.data.message == "added") {
                setIsFav(true);
            } else if (response.data.message == "removed") {
                setIsFav(false);
            } else {
                console.error("Fav.jsx -> setPostToFavourite error");
            }
        } catch (error) {
            console.error("Fav.jsx -> setPostToFavourite error: ", error);
        }
    };

    return (
        <div className="ml-2 ">
            <Button
                onClick={addPostToFavourite}
                //selected={selectedCategory === category.id}
                text={"+"}
                customClass={
                    isFav == true
                        ? "mt-2 mb-2 mr-2 bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                        : "mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                }
            />
        </div>
    );
};

export default Fav;
