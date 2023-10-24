import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../BasicElements/Button";
import { toast } from "react-toastify";
import FetchBanTypes from "../API/FetchBanTypes";
import BanUser from "../AdminAndModeratorFunctions/BanUser";
import PrimaryButton from "@/Components/PrimaryButton";
import FetchReports from "../API/FetchReports";

const BanDialog = ({
    user,
    defaultButtonText,
    modalTitle,
    modalDescription,
}) => {
    const [reports, setReports] = useState([]);
    const [banTypes, setBanTypes] = useState([]);
    const [selectedBan, setSelectedBan] = useState(0);
    const [selectedReason, setSelectedReason] = useState([]);

    const ban = async () => {
        try {
            BanUser(user.id, selectedBan, selectedReason);
            toast.success("User banned");
        } catch (error) {
            console.error("Report.jsx -> ", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
        if (banTypes.length == 0) {
            //FetchReports("report.index", null, bans);
            FetchBanTypes("ban.index", null, setBanTypes);
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
                    "mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
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
                    <div className="mt-4 ">
                        <div className="flex">
                            {banTypes ? (
                                banTypes.map((banType) => (
                                    <div key={banType.id}>
                                        <Button
                                            onClick={() =>
                                                setSelectedBan(banType.id)
                                            }
                                            text={banType.name}
                                            customClass={
                                                selectedBan === banType.id
                                                    ? "mt-2 mb-2 mr-2 bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                                                    : "mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>loading...</div>
                            )}
                        </div>

                        <div className="flex">
                            {reports ? (
                                reports.map((report) => (
                                    <div key={report.id}>
                                        <Button
                                            onClick={() =>
                                                setSelectedReason(report.id)
                                            }
                                            text={report.name}
                                            customClass={
                                                selectedReason === report.id
                                                    ? "mt-2 mb-2 mr-2 bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                                                    : "mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>loading...</div>
                            )}
                        </div>
                    </div>
                    <PrimaryButton text={"ban"} onClick={ban} />
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default BanDialog;
