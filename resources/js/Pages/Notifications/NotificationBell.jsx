import React, { useEffect, useState } from "react";
import NotificationsList from "./NotificationsList";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [unSeen, setUnSeen] = useState(null);

    const fetchNotification = async () => {
        try {
            let params = { page: page };
            const response = await axios.get(route("notification.index"), {params});
            setPage(page + 1);
            //setNotifications((prevNotifications) => [...prevNotifications, ...response.data.notifications]);
            //console.log(notifications);
            const newNotifications = response.data.notifications;
            //console.log(newNotifications);
            // Aktualizujemy `notifications` za pomocą nowych danych
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                ...newNotifications,
            ]);
            const notificationsWithSeen1 = newNotifications.filter(notification => notification.seen === 0);
            const countOfNotificationsWithSeen1 = notificationsWithSeen1.length;
            setUnSeen(countOfNotificationsWithSeen1);
        } catch (error) {
            //Notification(error.response.data.msg);
            console.error("CommentSection -> fetchComments error: ", error);
        }
    };

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        fetchNotification();
    }, []);

    //console.log(notifications.length);

    return (
        <div className="ml-2 ">
            <button onClick={toggleNotifications} className="text-2xl flex">
                <div className="text-red-400 mr-1">
                    {unSeen > 0 && unSeen}
                </div>
                <img src="/bell2.png" alt="Twoja Ikona" className="w-5 mt-1 " />

            </button>

            <div className="relative">
                {showNotifications && (
                    <div className="absolute top-0 right-0 mt-2 w-[30vw] bg-[#333] text-white border border-gray-300 shadow-lg rounded-lg">
                        <div className="w-full p-4 ">

                            <div className="flex item-center">
                                <h3 className="text-lg text-center font-semibold">
                                    Notifications
                                </h3>
                                {/* loading more notifications make duplicates in notification table on frontend */}
                                {/*<button className="ml-2" onClick={fetchNotification}>load more</button>*/}
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
