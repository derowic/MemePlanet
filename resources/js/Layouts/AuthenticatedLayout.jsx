import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import NotificationBell from "../Pages/Notifications/NotificationBell";
import { usePage } from "@inertiajs/react";
import ChangeLog from "./ChangeLog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import CheckRole from "@/Pages/API/CheckRole";
import NavBar from "./NavBar";

export default function Authenticated({ header, children }) {
    const translation = useTranslation(["dashboard"]);
    const user = usePage().props.auth.user;

    const { i18n } = useTranslation();
    const changeLanguage = (newLanguage) => {
        i18n.changeLanguage(newLanguage);
        console.log(newLanguage);
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="bg-meme_black w-full h-full">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <nav className="sticky top-0 text-white w-full border-b border-meme_blue bg-meme_black ">
                <div className="sticky top-0 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="sticky top-0 flex justify-between h-10">
                        <div className="sticky top-0 flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">{/*place for icon */}</Link>
                            </div>

                            <div className="sticky top-0 border-b border-meme_blue hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavBar translation={translation} />
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <button
                                onClick={() => changeLanguage("en")}
                                className="white font-bold mr-2"
                            >
                                English
                            </button>
                            <button
                                onClick={() => changeLanguage("pl")}
                                className="white font-bold"
                            >
                                Polish
                            </button>
                            <NotificationBell />

                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent sm leading-4 font-medium rounded-md  bg-[#111]  focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {/*<Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                    </Dropdown.Link>*/}
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            {translation.t("Log Out")}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md  focus:outline-none   transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t ">
                        <div className="px-4">
                            <div className="font-medium base ">{user.name}</div>
                            <div className="font-medium sm ">{user.email}</div>
                        </div>

                        <div className="mt-3 bg-[#111] space-y-1">
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                {translation.t("Log Out")}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[#111] shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            {/*<ChangeLog />*/}
        </div>
    );
}
