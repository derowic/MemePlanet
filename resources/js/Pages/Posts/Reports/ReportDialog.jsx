import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import DefaultButton from "../../BasicElements/DefaultButton";
import { toast } from "react-toastify";
import LogedIn from "@/Pages/API/LogedIn";
import Notify from "@/Components/Notify";
import AxiosGet from "@/Pages/API/AxiosGet";
import AxiosPost from "@/Pages/API/AxiosPost";

const ReportDialog = ({
    post,
    defaultButtonText,
    modalTitle,
    modalDescription,
}) => {
    let loged = LogedIn();
    const [reports, setReports] = useState([]);
    const setReport = async (report_id) => {
        try {
            AxiosPost("reportList.store", {
                post_id: post.id,
                report_id: report_id,
            });
        } catch (error) {
            console.error("Report.jsx -> ", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        if (loged) {
            setIsOpen(true);
            if (reports.length == 0) {
                AxiosGet("report.index", null, null, setReports);
            }
        } else {
            Notify("You need to be log in", "info");
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
                    "mt-2 mb-2 mr-2 hover:bg-[#fa3232] text-white font-bold py-2 px-4 rounded-lg border border-[#fa3232]"
                }
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-meme_black text-white p-4 rounded-lg shadow-md w-1/2 border border-meme_violet">
                    <DefaultButton
                        onClick={closeDialog}
                        text={"Close"}
                        className={
                            "border-2 border-red-500 px-4 py-2 rounded-lg"
                        }
                    />
                    <Dialog.Title>{modalTitle}</Dialog.Title>
                    <Dialog.Description>{modalDescription}</Dialog.Description>
                    <div className="mt-4 justify-end">
                        {reports ? (
                            reports.map((report) => (
                                <div key={report.id}>
                                    <DefaultButton
                                        onClick={() => setReport(report.id)}
                                        text={report.name}
                                        className={
                                            "mt-2 mb-2 mr-2 hover:bg-meme_violet text-white font-bold py-2 px-4 rounded-lg border border-meme_violet"
                                        }
                                    />
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

export default ReportDialog;
