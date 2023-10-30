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
    const [customClass, setCustomClass] = useState("");//h-[90vh]

    const handleImageLoad = (e) => {
        const width = e.target.width;
        const height = e.target.height;
        setImageDimensions({ width, height });

        if(height>window.innerHeight)
        {
            setCustomClass("h-[100vh]  overflow-hidden");
            //console.log(height);
            //console.log("wysokś keranu"," ",window.innerHeight);
        }

    };

    const setFullImage = () => {
        setCustomClass("");
        setShowFull(true);
    }

    const isTallImage = imageDimensions.height > window.innerHeight;

    return (
        <div className="w-full">
            <a
                href={route("post.onePost", { post: post.id })}
            >
                <div className={customClass}>
                    <img
                        id="yourImageId"
                        src={"/images/" + post.path_to_image}
                        alt="Opis obrazka"
                        className="w-full "
                        onLoad={handleImageLoad}
                    ></img>
                </div>
            </a>

            {isTallImage && (
                <button
                    className="w-full bg-[#111]"
                    onClick={() => setFullImage()}
                >
                    {showFull ? <></> : <div className="bg-[#000] p-2">Show Full Image</div>}
                </button>
            )}
        </div>
    );
}

export default Img;

