import React, { useEffect, useState } from "react";
import Notification from "./Notification";

function NotificationsList ({notifications, translation})  {
    return (
        <div className="bg-meme_black text-white overflow-y-auto grid custom-scroll flex items-center">
            {(notifications ) ? notifications.map((notification, index) => (
                    <Notification
                        key={index}
                        notification={notification}
                        index={index}
                        translation={translation}
                    />
                ))
                :
                <p></p>
            }
        </div>
    );
};

export default NotificationsList;
