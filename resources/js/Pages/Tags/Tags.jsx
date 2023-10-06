import React, { useState } from "react";

function Tags({ post, tags }) {
    return (
        <div className="m-auto">
            {post.tags && (
                <div className="text-left text-xs  ">
                    {post.tags.split(" ").map((tagId) => {
                        const tag = tags.find(
                            (tag) => tag.id === parseInt(tagId),
                        );
                        return tag ? (
                            <button
                                key={tag.id}
                                className="mr-2 px-1 py-1 sm:rounded-lg p-4 mt-4 border-2 border-[#bbb]"
                            >
                                {tag.text}
                            </button>
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
}

export default Tags;
