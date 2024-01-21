import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import AxiosGet from "../API/AxiosGet";
import AxiosPut from "../API/AxiosPut";
import AxiosDelete from "../API/AxiosDelete";
import ReportListDialog from "../AdminPanel/ReportListDialog";
import BanDialog from "../AdminPanel/BanDialog";
import BanUser from "../AdminAndModeratorFunctions/BanUser";

export default function AdminOptions({
    setAsMainPagePost,
    post,
    mainPage,
    hide,
    deletePost,
    translation,
}) {
    const setPostToMainPage = async (post) => {
        let tmp = await AxiosPut("post.mainPage", { id: post.id }, null, 1);

        if (tmp.status == 201) {
            setAsMainPagePost(true);
        }
    };

    const takePostFromMainPage = async (post) => {
        let tmp = await AxiosPut(
            "post.takeFromMainPage",
            { id: post.id },
            null,
            1,
        );

        if (tmp.status == 201) {
            setAsMainPagePost(false);
        }
    };

    const hidePost = async (post) => {
        let tmp = await AxiosPut("post.hidePost", { id: post.id }, null, 1);
        if (tmp.status == 201) {
            hide();
        }
    };

    const deletingPost = async (post) => {
        let tmp = await AxiosDelete("post.destroy", { post: post.id }, null, 1);
        if (tmp.status == 201) {
            deletePost();
        }
    };

    const [postReports, setPostReports] = useState([]);
    const [isOpenRaportList, setsOpenRaportList] = useState(false);
    const openDialogRaportList = () => {
        setsOpenRaportList(true);
        if (postReports.length == 0) {
            AxiosGet(
                "reportList.index",
                { post_id: post.id },
                null,
                setPostReports,
            );
        }
    };
    const closeDialogRaportList = () => {
        setsOpenRaportList(false);
    };

    /*------------------------------------------------------------------------------ */

    const [reports, setReports] = useState([]);
    const [banTypes, setBanTypes] = useState([]);
    const [selectedBan, setSelectedBan] = useState(0);
    const [selectedReason, setSelectedReason] = useState([]);

    const ban = async () => {
        try {
            BanUser(post.user.id, selectedBan, selectedReason);
        } catch (error) {
            console.error("Report.jsx -> ", error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(true);
        if (banTypes.length == 0) {
            AxiosGet("ban.index", null, null, setBanTypes);
            AxiosGet("report.index", null, null, setReports);
        }
    };
    const closeDialog = () => {
        setIsOpen(false);
    };

    useEffect(() => {
    }, [post, post.status]);

    return (
        <div className="">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        Options
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5 text-white-200 hover:text-white-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-meme_black shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {/*send to main page */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-white-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() =>
                                            mainPage
                                                ? takePostFromMainPage(post)
                                                : setPostToMainPage(post)
                                        }
                                    >
                                        {mainPage ? (
                                            <div>
                                                {translation.t(
                                                    "Take it from the home page",
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                {translation.t(
                                                    "Send to main page",
                                                )}
                                            </div>
                                        )}
                                    </button>
                                )}
                            </Menu.Item>
                            {/*hide */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-white-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => hidePost(post)}
                                    >
                                        {translation.t("Hide")}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            {/*delete */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-white-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => deletingPost(post)}
                                    >
                                        <div>{translation.t("Delete")}</div>
                                    </button>
                                )}
                            </Menu.Item>
                            {/*show raports */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-white-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={openDialogRaportList}
                                    >
                                        {translation.t("Show reports")}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            {/*ban dialog */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? "bg-violet-500 text-white"
                                                : "text-white-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={openDialog}
                                    >
                                        {translation.t("Ban")}
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <ReportListDialog
                post={post}
                defaultButtonText={translation.t("Show reports")}
                modalTitle={translation.t("Reports")}
                modalDescription={""}
                translation={translation}
                isOpen={isOpenRaportList}
                closeDialog={closeDialogRaportList}
                postReports={postReports}
            />
            <BanDialog
                user={post.user}
                defaultButtonText={translation.t("Ban")}
                modalTitle={""}
                modalDescription={translation.t("Select ban reason and length")}
                translation={translation}
                isOpen={isOpen}
                closeDialog={closeDialog}
                banTypes={banTypes}
                reports={reports}
                ban={ban}
                BanUser={BanUser}
                selectedBan={selectedBan}
                setSelectedBan={setSelectedBan}
                selectedReason={selectedReason}
                setSelectedReason={setSelectedReason}
            />
        </div>
    );
}
