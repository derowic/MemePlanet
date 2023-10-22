import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import PrimaryButton from "./PrimaryButton";
import DefaultButton from "./DefaultButton";
import SecondaryButton from "./SecondaryButton";

export default function DefaultModal({
    defaultButtonText,
    modalTitle,
    modalDescription,
    primaryButtonText,
    primaryButtonOnClick,
    secondaryButtonText,
    secondaryButtonOnClick,
}) {
    const [isOpen, setIsOpen] = useState(false);
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
                        <PrimaryButton
                            text={primaryButtonText}
                            onClick={() => handle(primaryButtonOnClick)}
                        />
                        <SecondaryButton
                            text={secondaryButtonText}
                            onClick={() => handle(secondaryButtonOnClick)}
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
