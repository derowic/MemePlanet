import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import DefaultButton from "../BasicElements/DefaultButton";
import AxiosGet from "../API/AxiosGet";

const ReportListDialog = ({
    post,
    isOpen,
    closeDialog,
    postReports,
    defaultButtonText,
    modalTitle,
    modalDescription,
    translation,
}) => {
    /*const closeDialog = () => {
        setIsOpen(false);
    };*/

    useEffect(() => {}, []);

    return (
        <div className="ml-2 ">
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-[#222] text-white p-4 rounded-lg shadow-md w-1/2 border-2 border-blue-500">
                    <DefaultButton
                        onClick={closeDialog}
                        text={translation.t("Close")}
                        className={
                            "p-2 m-2 border-2 rounded-lg  border-blue-500"
                        }
                    />
                    <Dialog.Title>{translation.t(modalTitle)}</Dialog.Title>
                    <Dialog.Description>
                        {translation.t(modalDescription)}
                    </Dialog.Description>
                    <div className="mt-4 justify-end">
                        {postReports ? (
                            postReports.map((report) => (
                                <div key={report.report.id}>
                                    {translation.t(report.report.name) +
                                        ": " +
                                        report.count}
                                </div>
                            ))
                        ) : (
                            <div>{translation.t("loading...")}</div>
                        )}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default ReportListDialog;
