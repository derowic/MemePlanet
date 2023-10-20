import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

function Img({ path, /*togglePanel*/ loadCommentsFunc }) {
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

    return (
        <div className="w-full">
            <button
                className={
                    showFull ? "w-full" : "w-full max-h-[90vh] overflow-hidden"
                }
                onClick={loadCommentsFunc}
            >
                <img
                    id="yourImageId"
                    src={"/images/" + path}
                    alt="Opis obrazka"
                    className="w-full object-cover"
                    onLoad={handleImageLoad} // Dodaj obsługę zdarzenia onLoad
                ></img>
            </button>

            {imageDimensions.height > 1000 && (
                <button
                    className="w-full  bg-[#333]"
                    onClick={() => setShowFull(true)}
                >
                    {showFull ? <></> : <>Show Full Image</>}
                </button>
            )}
        </div>
    );
}

export default Img;
