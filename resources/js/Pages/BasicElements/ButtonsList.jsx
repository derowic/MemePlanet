import React, { useEffect } from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

function ButtonsList({ elements, func, selected }) {
    const translation = useTranslation(["dashboard"]);
    useEffect(() => {}, [elements, selected]);

    return (
        <div>
            {elements != undefined &&
                elements.length > 0 &&
                elements.map((element) => (
                    <Button
                        key={element.id + "buttons list"}
                        func={() => func(element.id)}
                        text={translation.t(element.name)}
                        customClass={
                            Array.isArray(selected)
                                ? selected.includes(element.id)
                                    ? "m-2 px-2  border-b border-[#7abcf5]"
                                    : "m-2 px-2"
                                : selected === element.id
                                ? "m-2 px-2  border-b border-[#ffbc40]"
                                : "m-2 px-2"
                        }
                    />
                ))}
        </div>
    );
}

export default ButtonsList;
