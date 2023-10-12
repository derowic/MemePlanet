
import React, { useEffect, useState } from "react";
import FetchIndex from "@/Components/FetchIndex";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const fetchNotification = async () => {
        console.log("fetch");
        try {
            const response = await axios.get(route('notification.index'), { });
            console.log(response.data.msg);
            //setPosts((prevPosts) => [...prevPosts, ...response]);
        } catch (error) {
            //Notification(error.response.data.msg);
            console.error("CommentSection -> fetchComments error: ",error);
        }
    };

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    useEffect(() => {
        fetchNotification();
    }, []);

    return (
        <div className="ml-2 ">
            <button onClick={toggleNotifications} className="text-2xl" >
                    <img src="/bell2.png" alt="Twoja Ikona"  className="w-5 mt-1 "/>
            </button>

            <div className="relative">
              

                {showNotifications && (
                    <div className="absolute top-0 right-0 mt-10 w-64 bg-white border border-gray-300 shadow-lg rounded-lg">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">Powiadomienia</h3>
                        <ul>
                        <li className="py-2">Powiadomienie 1</li>
                        <li className="py-2">Powiadomienie 2</li>
                        <li className="py-2">Powiadomienie 3</li>
                        </ul>
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
