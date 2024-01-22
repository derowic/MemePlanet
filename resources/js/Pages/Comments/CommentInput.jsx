import React, { useState } from "react";
import CheckPermission from "../API/CheckPermission";
import LogedIn from "../API/LogedIn";
import Notify from "@/Components/Notify";

const CommentInput = ({ onSubmit, post, translation }) => {
    let loged = LogedIn();
    let permission = CheckPermission("comment.create");
    const [commentText, setCommentText] = useState("");
    const [submittedComment, setSubmittedComment] = useState(null);

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = () => {
        if (loged) {
            if (permission) {
                onSubmit(commentText);
                setCommentText("");
            } else {
                Notify("You don't have permission", "info");
            }
        } else {
            Notify("You need to be loged in", "info");
        }
    };

    return (
        <div>
            {submittedComment ? (
                <div></div>
            ) : (
                <div className="bg-meme_black flex justify-center">
                    <textarea
                        value={commentText}
                        onChange={handleInputChange}
                        placeholder="Write Comment..."
                        className="ml-5 w-3/4 bg-white-500 text-black font-bold py-2 px-4 rounded-lg border"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-[#4a12ff] text-white hover:bg-[#5b23ff] text-black font-bold py-2 px-4 rounded-lg border border-[#4a00ff]"
                    >
                        {translation.t("Add comment")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentInput;
