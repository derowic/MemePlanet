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
            <DefaultButton text={defaultButtonText} onClick={openDialog} />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-white p-4 rounded shadow-md w-1/2">
                    <Dialog.Title>{modalTitle}</Dialog.Title>
                    <Dialog.Description>{modalDescription}</Dialog.Description>
                    <div className="mt-4 flex justify-end">
                        <Input
                            type={"text"}
                            title={"name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <DefaultButton
                            onClick={() =>
                                AxiosPost("adminPanel.addCategory", null, {
                                    name: name,
                                })
                            }
                            text={primaryButtonText}
                            //customClass
                        />
                        <DefaultButton
                            text={secondaryButtonText}
                            onClick={() => closeDialog()}
                            //customClass
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
