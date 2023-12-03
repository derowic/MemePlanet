import React, { useEffect, useState } from "react";
import NotificationsList from "./NotificationsList";
import AxiosGet from "../API/AxiosGet";

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

    return (
        <div className="">
            <button onClick={toggleNotifications} className="text-2xl flex">
                <div className="text-red-500 mx-1">{unSeen > 0 && unSeen}</div>
                <img src="/bell2.png" alt="Twoja Ikona" className="w-5 mt-1 " />
            </button>

            <div className="relative ">
                {showNotifications && (
                    <div className="flex absolute w-80 absolute top-0 right-0 mt-2 bg-[#333] text-white border border-gray-300 shadow-lg rounded-lg">
                        <div className="p-4">
                            <div className=" item-center">
                                <h3 className="text-lg text-center font-semibold">
                                    Notifications
                                </h3>
                            </div>
                            <ul>
                                <NotificationsList
                                    notifications={notifications}
                                />
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationBell;
