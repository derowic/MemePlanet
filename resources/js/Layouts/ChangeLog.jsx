import React, { useState, useEffect } from "react";

function ChangeLog() {
    const [isEndOfPage, setIsEndOfPage] = useState(false);
    /*
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                setIsEndOfPage(true);
            } else {
                setIsEndOfPage(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    */

    return (
        <div className="text-white text-center bg-[#000] h-full ">
            {/*isEndOfPage ? (*/}
            <div className="p-3 text-3xl ">
                THERE IS NO CAKE !!!
                {/*<img
                        src={"/cake2.png"}
                        alt="Opis obrazka"
                        className="w-[50vw] m-auto"
                        ></img>*/}
            </div>
            {/*) : null*/}
        </div>
    );
}

export default ChangeLog;
