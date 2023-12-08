import React, { useEffect, useState } from "react";
import Notification from "./Notification";

const NotificationsList = (notifications) => {
    return (
        <div className="bg-meme_black text-white overflow-y-auto grid custom-scroll flex items-center">
            {notifications.notifications.map((notification, index) => (
                <Notification
                    key={index}
                    notification={notification}
                    index={index}
                />
            ))}
        </div>
    );
};

export default NotificationsList;
