import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import DefaultButton from "../BasicElements/DefaultButton";
import AxiosGet from "../API/AxiosGet";
import "../scrollbar.css";
import { Drawer } from "@mui/material";
import { Switch } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";

import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import Button from "../BasicElements/Button";
import Input from "../BasicElements/Input";

function MessageForm({ sendMessage, messages }) {
    const translation = useTranslation(["post"]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const items = Array.from({ length: 25 }, (_, index) => index + 1);

    const fetchMessages = async (id, page) => {
        AxiosGet('message.index',
            {
                id: id,
                page: page,
            },
            null,
            null,
        )
    }

    const fetchPaginatedMessages = async () => {
        if (setPosts) {
            let response = await fetchMessages();
            if(response.length == 0)
            {
                setHasMore(false);
            }
            else
            {
                setPosts((prevData) => [...prevData, ...response]);
                setPage(page + 1);
            }
        }
    };

    useEffect(() => {
        //AxiosGet("category.index", null, null, setCategories);
    }, [messages]);

    return (
        <>
            <div className="h-[80vh]">

            <div className="message-list overflow-y-auto h-[80vh] flex flex-col-reverse p-2">
                <InfiniteScroll
                    dataLength={messages.length}
                    next={fetchPaginatedMessages}
                    hasMore={hasMore}
                    loader={<p className="w-full text-center">{translation.t("loading...")}</p>}
                    endMessage={<p className="w-full text-center">{translation.t("No more posts")}</p>}
                >
                    {messages.map((message, index) => (
                       <div key={index} className="h-10"> {message}</div>
                    ))}
                </InfiniteScroll>
            </div>

            </div>
            <div className="flex  w-full">
                <Input
                    type={"text"}
                    title={''}
                    value={text}
                    placeholder={"write your messag..."}
                    onChange={(e) => setText(e.target.value)}
                    className={"w-5/6 font-bold text-black m-auto text-center m-2 mr-2"}
                />
                <Button
                    onClick={ () => sendMessage(text)}
                    text={/*translation.t()*/
                        "send"
                    }
                    className={
                        "w-1/6 bg-meme_violet rounded-lg hover:bg-[#af65fe]"
                    }
                />
            </div>
        </>
    );
}

export default MessageForm;
