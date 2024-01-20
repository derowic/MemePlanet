import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import DefaultButton from "../BasicElements/DefaultButton";
import AxiosGet from "../API/AxiosGet";

const BanDialog = ({
    user,
    defaultButtonText,
    modalTitle,
    modalDescription,
    translation,
}) => {
    const [reports, setReports] = useState([]);
    const [banTypes, setBanTypes] = useState([]);
    const [selectedBan, setSelectedBan] = useState(0);
    const [selectedReason, setSelectedReason] = useState([]);

    const ban = async () => {
        try {
            BanUser(user.id, selectedBan, selectedReason);
        } catch (error) {
            console.error("Report.jsx -> ", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
        if (banTypes.length == 0) {
            AxiosGet("ban.index", null, null, setBanTypes);
            AxiosGet("report.index", null, null, setReports);
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
                text={translation.t(defaultButtonText)}
                className={
                    "mt-2 mb-2 mr-2 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg border border-red-700"
                }
            />
            <Dialog
                open={isOpen}
                onClose={closeDialog}
                className="rounded-lg fixed inset-0 flex items-center justify-center z-50 "
            >
                <Dialog.Panel className="bg-[#222] text-white p-4 rounded-lg shadow-md w-1/2 border-2 border-red-700">
                    <DefaultButton
                        onClick={closeDialog}
                        text={translation.t("Close")}
                        className={"p-2 m-2 border border-red-700 rounded-lg"}
                    />
                    <Dialog.Title>{translation.t(modalTitle)}</Dialog.Title>
                    <Dialog.Description>
                        {translation.t(modalDescription)}
                    </Dialog.Description>
                    <div className="mt-4 ">
                        <div className="flex">
                            {banTypes ? (
                                banTypes.map((banType) => (
                                    <div key={banType.id}>
                                        <DefaultButton
                                            onClick={() =>
                                                setSelectedBan(banType.id)
                                            }
                                            text={translation.t(banType.name)}
                                            className={
                                                selectedBan === banType.id
                                                    ? "mt-2 mb-2 mr-2 bg-red-700 text-white font-bold py-2 px-4 rounded-lg border border-red-700"
                                                    : "mt-2 mb-2 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border border-red-700"
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>{translation.t("loading...")}</div>
                            )}
                        </div>

                        <div className="flex">
                            {reports ? (
                                reports.map((report) => (
                                    <div key={report.id}>
                                        <DefaultButton
                                            onClick={() =>
                                                setSelectedReason(report.id)
                                            }
                                            text={translation.t(report.name)}
                                            className={
                                                selectedReason === report.id
                                                    ? "mt-2 mb-2 mr-2 bg-red-700 text-white font-bold py-2 px-4 rounded-lg border border-red-700"
                                                    : "mt-2 mb-2 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg border border-red-700"
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>{translation.t("loading...")}</div>
                            )}
                        </div>
                    </div>
                    <DefaultButton
                        onClick={ban}
                        text={translation.t("Ban")}
                        className={
                            "m-2 px-4 py-2 hover:bg-red-500 hover:border-[#ffbc40] bg-red-700 rounded-lg"
                        }
                    />
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default BanDialog;
