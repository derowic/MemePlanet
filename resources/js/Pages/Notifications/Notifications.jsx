
import React, { useEffect, useState } from "react";
import Button from "./Button";

const Notifications = ({ userId }) => {

    const [notifications, setNotifications] = useState([]);

    const fetchNotification = async () => {
        try {
            let params = { id: userId};
            let t = await FetchIndex("notification.index", params);
            //setComments(t);
            setNotifications(t);
        } catch (error) {
            Notification(error.response.data.msg);
            console.error(
                "CommentSection -> fetchComments error: ",
                error.response.data.msg,
            );
        } finally {
            setUsedComments([]);
        }
    };

    const setPostToFavourite = async (postId) => {
        try {
            const response = await axios.post(route("post.fav"), {
                post: postId,
            });

            if(response.data.message == "added")
            {
                setIsFav(true);
            }
            else if(response.data.message == "removed")
            {
                setIsFav(false);
            }
            else
            {
                console.error("Fav.jsx -> setPostToFavourite error");
            }
        } catch (error) {
            console.error("Fav.jsx -> setPostToFavourite error: ", error);
        }
    };

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="ml-2 ">
            <Button
                func={addPostToFavourite}
                //selected={selectedCategory === category.id}
                text={"+"}
                customClass={ isFav == true ?
                    "mt-2 mb-2 mr-2 bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                    :"mt-2 mb-2 mr-2 hover:bg-[#aaa] text-white font-bold py-2 px-4 rounded-lg border border-[#fff]"
                }
            />

            <div className="relative">
                <button onClick={toggleNotifications} className="text-2xl">
                    🔔
                </button>

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
