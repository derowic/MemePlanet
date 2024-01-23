import React from "react";

function Tags({ post, tags, translation }) {
    return (
        <div className="m-auto w-full">
            <div className="text-left text-xs flex flex-wrap  w-full">
                {post.tags.map((tagData) => {
                    const tag = tags.find((tag) => tag.id === tagData.tag_id);
                    return tag ? (
                        <div
                            key={tag.id}
                            className="mr-2 px-1 py-1 sm:rounded-lg p-4 mt-4 border-2 border-[#bbb]"
                        >
                            {translation.t(tag.name)}
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
}

export default Tags;
