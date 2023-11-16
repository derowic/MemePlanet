import React, { useState, useEffect } from "react";
import AxiosGet from "../API/AxiosGet";

function SearchUser({ setSelectedUser }) {
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
                placeholder="Wyszukaj użytkownika"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
            />
            {showResults && (
                <ul className="w-full m-auto text-white bg-[#111]">
                    {results.map((user) => (
                        <li key={user.id} onClick={() => handleUserClick(user)}>
                            {user.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchUser;
