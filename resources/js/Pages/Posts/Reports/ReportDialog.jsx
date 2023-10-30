import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../../BasicElements/Button";
import { toast } from "react-toastify";
import FetchReports from "@/Pages/API/FetchReports";

const ReportDialog = ({
    post,
    defaultButtonText,
    modalTitle,
    modalDescription,
}) => {
    const [reports, setReports] = useState([]);
    const setReport = async (report_id) => {
        try {
            const response = await axios.post(route("reportList.store"), {
                post_id: post.id,
                report_id: report_id,
            });

            toast.success(response.data.msg);
        } catch (error) {
            console.error("Report.jsx -> ", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
        if (reports.length == 0) {
            FetchReports("report.index", null, setReports);
        }
    };
    const closeDialog = () => {
        setIsOpen(false);
    };

    useEffect(() => {}, []);

    return (
        <div className="ml-2 ">
            <Button
                onClick={openDialog}
                text={defaultButtonText} //"!"
                customClass={
                    "mt-2 mb-2 mr-2 hover:bg-[#fa3232] text-white font-bold py-2 px-4 rounded-lg border border-[#fa3232]"
                }
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-[#222] text-white p-4 rounded-lg shadow-md w-1/2 border border-[#000]">
                    <Button onClick={closeDialog} text={"Close"} />
                    <Dialog.Title>{modalTitle}</Dialog.Title>
                    <Dialog.Description>{modalDescription}</Dialog.Description>
                    <div className="mt-4 justify-end">
                        {reports ? (
                            reports.map((report) => (
                                <div key={report.id}>
                                    <Button
                                        onClick={() => setReport(report.id)}
                                        text={report.name}
                                        customClass={
                                            "mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
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
