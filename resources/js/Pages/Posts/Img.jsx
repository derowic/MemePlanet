import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { router } from "@inertiajs/react";

function Img({ post, /*togglePanel*/ loadCommentsFunc }) {
    const [showFull, setShowFull] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleImageLoad = (e) => {
        const width = e.target.width;
        const height = e.target.height;
        setImageDimensions({ width, height });
    };

    const isTallImage = imageDimensions.height > window.innerHeight;

    return (
        <div className="w-full">
            <a
                href={route("post.onePost", { post: post.id })}
            >
                <div className="w-full  overflow-hidden">
                <img
                    id="yourImageId"
                    src={"/images/" + post.path_to_image}
                    alt="Opis obrazka"
                    className="w-full object-cover  "
                    onLoad={handleImageLoad}
                ></img>
                </div>
            </a>

            {isTallImage && (
                <button
                    className="w-full bg-[#111]"
                    onClick={() => setShowFull(true)}
                >
                    {showFull ? <></> : <>Show Full Image</>}
                </button>
            )}
        </div>
    );
}

export default Img;

