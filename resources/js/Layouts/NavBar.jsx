import React, { useState, useEffect } from "react";
import NavLink from "@/Components/NavLink";
import CheckRole from "@/Pages/API/CheckRole";

function NavBar({ translation }) {
    return (
        <>
            <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
            >
                {translation.t("Meme Planet")}
            </NavLink>

            <NavLink
                href={route("memeGenerator")}
                active={route().current("memeGenerator")}
            >
                {translation.t("Meme Generator")}
            </NavLink>
            {(CheckRole("admin") || CheckRole("user")) && (
                <NavLink
                    href={route("account")}
                    active={route().current("account")}
                >
                    {translation.t("Account")}
                </NavLink>
            )}

            {CheckRole("admin") && (
                <NavLink
                    href={route("adminPanel")}
                    active={route().current("adminPanel")}
                >
                    {translation.t("Admin Panel")}
                </NavLink>
            )}
        </>
    );
}

export default NavBar;
