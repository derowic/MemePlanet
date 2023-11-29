import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import DefaultButton from "../BasicElements/DefaultButton";
import AxiosGet from "../API/AxiosGet";

const ReportListDialog = ({
    post,
    defaultButtonText,
    modalTitle,
    modalDescription,
}) => {
    const [postReports, setPostReports] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
        if (postReports.length == 0) {
            AxiosGet(
                "reportList.index",
                { post_id: post.id },
                null,
                setPostReports,
            );
        }
    };
    const closeDialog = () => {
        setIsOpen(false);
    };

    useEffect(() => {}, []);

    return (
        <div className="ml-2 ">
            <DefaultButton
                onClick={openDialog}
                text={defaultButtonText} //"!"
                className={
                    "mt-2 mb-2 mr-2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg border border-blue-500"
                }
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-[#222] text-white p-4 rounded-lg shadow-md w-1/2 border-2 border-blue-500">
                    <DefaultButton
                        onClick={closeDialog}
                        text={"Close"}
                        className={
                            "p-2 m-2 border-2 rounded-lg  border-blue-500"
                        }
                    />
                    <Dialog.Title>{modalTitle}</Dialog.Title>
                    <Dialog.Description>{modalDescription}</Dialog.Description>
                    <div className="mt-4 justify-end">
                        {postReports ? (
                            postReports.map((report) => (
                                <div key={report.report.id}>
                                    {report.report.name + ": " + report.count}
                                </div>
                            ))
                        ) : (
                            <div>loading...</div>
                        )}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default ReportListDialog;
