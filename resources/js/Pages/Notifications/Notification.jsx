import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import AxiosGet from "../API/AxiosGet";

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
            className="bg-meme_black"
        >
            <div
                key={index}
                className={
                    "bg-meme_black p-4 border-b " +
                    (notification.notification.seen === 0
                        ? "border-gray-500 text-white"
                        : "border-gray-700 text-[#aaa]")
                }
            >
                {notification.notification.sender.name}
                {notification.notification.type == "comment-comment" &&
                    " reply to your comment"}
                {notification.notification.type == "post-comment" &&
                    " reply to your post"}
                <div className="text-sm bg-meme_black">
                    {notification.notification.created_at}
                </div>
            </div>
        </button>
    );
};

export default Notification;
