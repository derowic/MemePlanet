import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import Button from "../BasicElements/Button";
import FetchIndex from "@/Pages/API/FetchIndex";

function PostsTypeSelect({
    selected,
    setSelected,
    elements,
    setPosts,
    setRout /*loadNewPost*/,
}) {
    const handleSelectedPostsType = (type) => {
        setSelected(type[0]);
        setPosts([]);
        let rout = "post.index";

        const foundElement = elements.find(
            (subarray) => subarray[0] === type[0],
        );

        if (foundElement) {
            rout = foundElement[1];
        } else {
            console.log("PostsTypeSelect -> func -> handleSelectedPostsType");
        }

        setRout(rout);

        loadNewPost(rout);
    };

    const loadNewPost = async (rout) => {
        const response = await FetchIndex(rout, null);
        setPosts((prevPosts) => [...prevPosts, ...response]);
    };

    useEffect(() => {}, [selected]);
    return (
        <div>
            {elements != undefined &&
                elements.length > 0 &&
                elements.map((element) => (
                    <Button
                        key={element + " posts type"}
                        func={() => handleSelectedPostsType(element)}
                        text={element[0]}
                        customClass={
                            selected == element[0]
                                ? "text-2xl px-2 border-b border-[#ffbc40]"
                                : "text-2xl px-2 border-b border-[#888]"
                        }
                    />
                ))}
        </div>
    );
}

export default PostsTypeSelect;
