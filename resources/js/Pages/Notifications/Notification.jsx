import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const Notification = (notification, index) => {
    return (
        <button
            onClick={() =>
                router.get(
                    route("notification.show", {
                        notification: notification.notification.id,
                    }),
                )
            }

        >
            <div
                key={index}
                className={
                    "p-4 border-b " +
                    (notification.notification.seen === 0
                        ? "border-gray-500 text-white"
                        : "border-gray-700 text-[#aaa]")
                }
            >
                User: {notification.notification.sender.name}
                {notification.notification.type == "comment-comment" &&
                    " reply to your comment"}
                {notification.notification.type == "post-comment" &&
                    " reply to your post"}
                <div className="text-sm">
                    {notification.notification.created_at}
                </div>
            </div>
        </button>
    );
};

export default Notification;
