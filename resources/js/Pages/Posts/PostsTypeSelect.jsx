import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import DefaultButton from "../BasicElements/DefaultButton";
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
                    <DefaultButton
                        key={element + " posts type"}
                        onClick={() => handleSelectedPostsType(element)}
                        text={element[0]}
                        className={
                            selected == element[0]
                                ? "text-2xl px-2 border-b border-meme_violet"
                                : "text-2xl px-2 border-b "
                        }
                    />
                ))}
        </div>
    );
}

export default PostsTypeSelect;
