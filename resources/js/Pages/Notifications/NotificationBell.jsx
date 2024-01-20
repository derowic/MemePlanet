import React, { useEffect, useState } from "react";
import NotificationsList from "./NotificationsList";
import AxiosGet from "../API/AxiosGet";
import { Drawer } from "@mui/material";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [unSeen, setUnSeen] = useState(null);

    const fetchNotification = async () => {
        try {
            let params = { page: page };
            const response = await AxiosGet("notification.index", null, {
                params,
            });
            setPage(page + 1);
            const newNotifications = response;
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                ...newNotifications,
            ]);
            const notificationsWithSeen1 = newNotifications.filter(
                (notification) => notification.seen === 0,
            );
            const countOfNotificationsWithSeen1 = notificationsWithSeen1.length;
            setUnSeen(countOfNotificationsWithSeen1);
        } catch (error) {
            console.error("CommentSection -> fetchComments error: ", error);
            Notification(error.response.data.message);
        }
    };

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        togglePanel();
    };

    useEffect(() => {
        fetchNotification();

        const intervalId = setInterval(() => {
            fetchNotification();
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            <button
                onClick={toggleNotifications}
                className="px-2 bg-meme_black text-2xl flex"
            >
                <img src="/bell2.png" alt="Twoja Ikona" className="w-5 mt-1 " />
                <div className="text-red-500 mx-1">{unSeen > 0 && unSeen}</div>
            </button>

            <Drawer
                anchor="right"
                open={isOpen}
                onClose={togglePanel}
                className="items-center justify-center "
            >
                <div className="bg-meme_black h-[100vh]">
                    <div></div>
                    <NotificationsList notifications={notifications} />
                </div>
            </Drawer>
        </div>
    );
};

export default NotificationBell;
