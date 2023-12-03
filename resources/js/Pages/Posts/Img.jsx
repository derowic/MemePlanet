import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { router } from "@inertiajs/react";

function Img({ post, postDetailsView, setIsOpen }) {
    const [showFull, setShowFull] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    const setFullImage = () => {
        setShowFull(true);
    };

    let isTallImage = false;
    isTallImage = imageDimensions.height > window.screen.height;

    useEffect(() => {
        const img = new Image();
        img.src = "/images/" + post.path_to_image;

        img.onload = () => {
            const width = img.width;
            const height = img.height;
            setImageDimensions({ width, height });

            if (height > window.innerHeight) {
                isTallImage = true;
            }
        };
    }, [post.path_to_image, post]);

    const handleImageClick = () => {
        if (setIsOpen) {
            setIsOpen(true);
        }
    };

    return (
        <div className="">
            <a
                href={route("post.show", { post: post.id })}
                onClick={(e) => {
                    e.preventDefault(); // Zapobiegnij domyślnemu zachowaniu
                    handleImageClick();
                }}
            >
                {/*<div
                    className={
                        imageDimensions.height > window.innerHeight &&
                        showFull == false &&
                        postDetailsView != true
                            ? "w-full h-[50vh]  overflow-hidden"
                            : ""
                    }
                >*/}
                <div>
                    <img
                        id={"yourImage" + post.id}
                        src={"/images/" + post.path_to_image}
                        alt="Opis obrazka"
                        className="m-auto w-full "
                    />
                </div>
            </a>

            {/*
            {isTallImage && (
                <button
                    className="w-full bg-meme_black"
                    onClick={() => setFullImage()}
                >
                    {showFull || postDetailsView ? (
                        <></>
                    ) : (
                        <div className="bg-[#000] p-2">Show Full Image</div>
                    )}
                </button>
            )}
            */}
        </div>
    );
}

export default Img;
