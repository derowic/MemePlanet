import React, { useState, useEffect } from "react";
import PostData from "./PostData";

function PostUserView({ post, tags, showOptions, translation, translationCategory, translationTag }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loadComments, setLoadComments] = useState(false);

    const loadCommentsFunc = () => {
        setLoadComments(true);
    };

    return (
        <>
            {post.status != "hide" && (
                <>
                    <div className="rounded-lg p-4 border border-[#333] hover:border-meme_violet m-2">
                    <PostData
                        post={post}
                        tags={tags}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        loadComments={loadComments}
                        loadCommentsFunc={loadCommentsFunc}
                        setLoadComments={setLoadComments}
                        translation={translation}
                        translationCategory={translationCategory}
                        translationTag={translationTag}
                        showOptions={showOptions}
                    />
                    </div>
                </>
            )}
        </>
    );
}

export default PostUserView;
