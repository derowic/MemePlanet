import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import DefaultButton from "../BasicElements/DefaultButton";
import { useTranslation } from "react-i18next";
import AxiosGet from "../API/AxiosGet";
import "../scrollbar.css";
import { Drawer } from "@mui/material";
import { Switch } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";

function Message({}) {
    const categoryTranslation = useTranslation(["category"]);
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {}, []);

    return <div>MSG</div>;
}

export default Message;
