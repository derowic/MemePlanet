import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";

const Report = ({ postId }) => {
    const setPostToFavourite = async (postId) => {
        try {
            const response = await axios.post(
                route("post.report", { post: postId }),
            );

            if (response.data.msg == "success") {
                toast.success(response.data.msg);
            } else {
                toast.error("error");
            }
        } catch (error) {
            console.error("Report.jsx -> ", error);
        }
    };

    return (
        <div className="ml-2 ">
            <Button
                func={() => setPostToFavourite(postId)}
                //selected={selectedCategory === category.id}
                text={"!"}
                customClass={
                    "mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                }
            />
        </div>
    );
};

export default Report;
