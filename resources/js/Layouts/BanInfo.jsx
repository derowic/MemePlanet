import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function BanInfo({ data }) {
    let banDate;
    let formattedDate;
    const translation = useTranslation(["post"]);
    if (data.ban != null) {
        banDate = new Date(data.ban.ban.created_at);
        formattedDate = banDate.toISOString().split("T")[0];
    }

    return (
        <div className="text-white text-center bg-red-500 rounded-lg ">
            {data.ban && (
                <>
                    <p>
                        {translation.t("Your account is banned for")}{" "}
                        {translation.t(data.ban.ban.name)}{" "}
                        {translation.t("from")} {formattedDate}
                    </p>
                    <p>
                        {translation.t("Ban reason")}:{" "}
                        {translation.t(data.ban.report.name)}
                    </p>
                </>
            )}
        </div>
    );
}

export default BanInfo;
