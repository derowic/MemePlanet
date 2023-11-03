import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1  text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none "
            }
        >
            <div
                className={
                    active
                        ? " text-[#af45ff] dark:border-white-800 text-white-900 dark:text-white-100 focus:border-white-800 "
                        : " text-white-500 dark:text-white-400 hover:text-white-700 dark:hover:text-white-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-white-700 dark:focus:text-white-300 focus:border-gray-300 dark:focus:border-gray-700 "
                }
            >
                {children}
            </div>
        </Link>
    );
}
