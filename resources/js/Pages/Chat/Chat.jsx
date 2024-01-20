import React, { useEffect, useState } from "react";
import AxiosGet from "../API/AxiosGet";
import { Drawer } from "@mui/material";
import HorizontalScrollList from "./HorizontalScrollList";
import MessageForm from "./MessageForm";
import ScrollList from "./ScrollList";
import { usePage } from "@inertiajs/react";

const Chat = () => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [unSeen, setUnSeen] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const user = usePage().props.auth.user;

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

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

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

    const [ws, setWs] = useState(null);
    const [connected, setConnected] = useState("disconnecting");
    const [selectedUser, setSelectedUser] = useState(3);

    const addNewMessage = (newMessage) => {s
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    const connect = () => {
        console.log("Connecting to WebSocket server...");
        const newWs = new WebSocket("ws:localhost:5999");
        setWs(newWs);
        setConnected("connecting");

        newWs.addEventListener("open", () => {
            console.log("Connected to WebSocket server.");

            if (newWs && newWs.readyState === WebSocket.OPEN) {
                newWs.send(
                    JSON.stringify({
                        type: "info",
                        name: user.name,
                        id: user.id,
                    }),
                );
                console.log("send base data");
            }
        });

        newWs.addEventListener("message", (event) => {
            console.log("Received message:", JSON.parse(event.data));
            addNewMessage(JSON.parse(event.data).text);
        });

        newWs.addEventListener("close", () => {
            console.log("WebSocket connection closed.");
            setConnected("disconnected");
            setConnected("reconnecting");
            setTimeout(() => {
                connect();
            }, 5000);
        });

        newWs.addEventListener("error", (error) => {
            console.error("WebSocket error:", error);
            setConnected("disconnected");
            setConnected("reconnecting");
            setTimeout(() => {
                connect();
            }, 5000);
        });
    };

    const sendMessage = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            addNewMessage(message);
            ws.send(
                JSON.stringify({
                    type: "message",
                    sender: user.id,
                    receiver: selectedUser,
                    text: message,
                }),
            );
        } else {
            console.error("WebSocket connection is not open.");
        }
    };

    useEffect(() => {
        connect();
    }, []);

    return (
        <div className="">
            <button
                onClick={() => toggleNotifications()}
                className="px-2 bg-meme_black text-2xl flex"
            >
                <img
                    src="/message.png"
                    alt="Twoja Ikona"
                    className="w-7 mt-1 "
                />
                <div className="text-red-500 mx-1">{unSeen > 0 && unSeen}</div>
            </button>

            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={togglePanel}
                className="items-center justify-center "
            >
                <div className="h-1/6">
                    <div
                        className={`font-bold text-center text-white  w-full h-6  ${
                            connected == "connecting" && "bg-green-500"
                        } ${connected == "connected" && "bg-green-500"}  ${
                            connected == "reconnecting" && "bg-yellow-500"
                        }  ${connected == "disconnected" && "bg-red-500"}`}
                    >
                        {connected == "connected" && "Connected"}
                        {connected == "connecting" && "Connecting"}
                        {connected == "reconnecting" && "Reconnecting"}
                        {connected == "disconnected" && "Disconnected"}
                    </div>

                    <div className="bg-meme_black text-xl text-white text-center">
                        Nazwa konwersacji
                    </div>
                </div>

                <div className="h-5/6">
                    <div className="bg-meme_black text-white h-full flex">
                        <div className="w-1/6 ">
                            {/*<HorizontalScrollList/>*/}
                            <ScrollList />
                        </div>
                        <div className="w-5/6">
                            <MessageForm
                                sendMessage={sendMessage}
                                messages={messages}
                            />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Chat;
