import React, { useEffect, useState } from "react";
import Notification from "./Notification";

const NotificationsList = (notifications) => {
    //useEffect([notifications]);

    //console.log(notifications);

    return (
        <>
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar scrollbar-thumb-gray-100">
                {notifications.notifications.map((notification, index) => (

                    <Notification
                        key={index}
                        notification={notification}
                        index={index}
                    />

                ))}
             </div>
        </>
    );
};

export default NotificationsList;
