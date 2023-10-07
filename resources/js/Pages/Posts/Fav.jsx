import React, { useState } from "react";

const Fav = ({ postId }) => {


    const addPostToFavourite = () => {
        setPostToFavourite(postId);
    };

    const setPostToFavourite = async (postId) => {
        try {
            const response = await axios.post(route("post.fav"), {
                post: postId,
            });
        } catch (error) {
            console.error("Heart -> setPostToFavourite error: ", error);
        }
    };

    return (
        <div className="ml-2 ">
            <button onClick={addPostToFavourite} className="mt-1 bg-[#ddd] mb-2 mr-2 hover:bg-[#222] hover:text-[#ddd] text-black font-bold py-2 px-4 rounded-lg border border-[#222]">
                +
            </button>
        </div>
    );
};

export default Fav;
