import React, { useEffect } from "react";
import DefaultButton from "./DefaultButton";
import { useTranslation } from "react-i18next";

function ButtonsList({ elements, func, selected, translation }) {
    useEffect(() => {}, [elements, selected]);

    return (
        <div>
            {elements != undefined &&
                elements.length > 0 &&
                elements.map((element) => (
                    <DefaultButton
                        key={element.id + "buttons list"}
                        onClick={() => func(element.id)}
                        text={translation.t(element.name)}
                        className={
                            Array.isArray(selected)
                                ? selected.includes(element.id)
                                    ? "m-2 px-2 border-b border-[#3483eb]"
                                    : "m-2 px-2"
                                : selected === element.id
                                ? "m-2 px-2 border-b border-[#3483eb]"
                                : "m-2 px-2"
                        }
                    />
                ))}
        </div>
    );
}

export default ButtonsList;
