import React, { useState, useEffect } from "react";

function BanInfo({ data }) {
    let banDate;
    let formattedDate;
    if (data.ban != null) {
        banDate = new Date(data.ban.ban.created_at);
        formattedDate = banDate.toISOString().split("T")[0];
    }

    return (
        <div className="text-white text-center bg-red-500 rounded-lg ">
            {data.ban && (
                <>
                    <p>
                        Your account is banned for {data.ban.ban.name} from{" "}
                        {formattedDate}
                    </p>
                    <p>Ban reason: {data.ban.report.name}</p>
                </>
            )}
        </div>
    );
}

export default BanInfo;
