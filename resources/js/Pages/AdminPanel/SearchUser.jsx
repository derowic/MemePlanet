import React, { useState, useEffect } from "react";
import AxiosGet from "../API/AxiosGet";

function SearchUser({ setSelectedUser, translation }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(true);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowResults(false);
        setQuery("");
    };

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    AxiosGet("user.search", { dane: query }, null, setResults);
                    setShowResults(true);
                } catch (error) {
                    console.error("Błąd podczas pobierania danych:", error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        };

        fetchData();
    }, [query]);

    return (
        <div className="w-full bg-[#111]">
            <input
                type="text"
                placeholder={translation.t("Search user")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
            />
            {showResults && (
                <ul className="w-full m-auto text-white bg-[#111] max-h-[50vh] overflow-y-auto">
                    {results.map((user) => (
                        <li key={user.id} onClick={() => handleUserClick(user)} className="hover:border-2  hover:border-meme_violet py-2 ">
                            {user.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchUser;
