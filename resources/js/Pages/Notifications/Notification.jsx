import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import AxiosGet from "../API/AxiosGet";

function Notification  ({notification, index, translation})  {
    return (
        <button
            onClick={() =>
                router.get(
                    route("notification.show", {
                        notification: notification.id,
                    }),
                )
            }
            className="bg-meme_black"
        >
            <div
                key={index}
                className={
                    "bg-meme_black p-4 border-b " +
                    (notification.seen === 0
                        ? "border-gray-500 text-white"
                        : "border-gray-700 text-[#aaa]")
                }
            >
                {notification.sender.name}
                {notification.type == "comment-comment" &&
                    <div>{translation.t("reply to your comment")}</div>}
                {notification.type == "post-comment" &&
                    <div>{translation.t("reply to your post")}</div>}
                <div className="text-sm bg-meme_black">
                    {notification.created_at}
                </div>

            </div>
        </button>
    );
};

export default Notification;
