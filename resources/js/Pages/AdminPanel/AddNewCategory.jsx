import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import DefaultButton from "../BasicElements/DefaultButton";
import Input from "../BasicElements/Input";
import AxiosPost from "../API/AxiosPost";

export default function AddNewCategory({
    defaultButtonText,
    modalTitle,
    modalDescription,
    primaryButtonText,
    primaryButtonOnClick,
    secondaryButtonText,
    secondaryButtonOnClick,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const openDialog = () => {
        setIsOpen(true);
    };
    const closeDialog = () => {
        setIsOpen(false);
    };
    const handle = (func) => {
        if (func) {
            func();
        }
        closeDialog();
    };
    return (
        <div>
            <DefaultButton
                text={defaultButtonText}
                onClick={openDialog}
                className={
                    "text-center border-2 border-yellow-500 hover:bg-yellow-500 p-2 m-2 rounded-lg"
                }
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-meme_black border-2 border-meme_violet text-white p-4 rounded shadow-md w-1/2">
                    <Dialog.Title>{modalTitle}</Dialog.Title>
                    <Dialog.Description>{modalDescription}</Dialog.Description>
                    <div className="mt-4 flex justify-end">
                        <Input
                            type={"text"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={"rounded-lg text-black m-2 p-2"}
                            placeholder={"humor"}
                        />

                        <DefaultButton
                            onClick={() =>
                                AxiosPost("category.store", null, {
                                    name: name,
                                })
                            }
                            text={primaryButtonText}
                            className={"rounded-lg bg-green-500 px-4 m-2"}
                        />


                        <DefaultButton
                            text={secondaryButtonText}
                            onClick={() => closeDialog()}
                            className={"rounded-lg px-4 m-2 bg-red-500"}
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
