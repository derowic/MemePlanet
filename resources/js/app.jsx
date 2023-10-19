import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

import React from "react";

console.log(`


__        _______ _     ____ ___  __  __ _____
\\ \\      / | ____| |   / ___/ _ \\|  \\/  | ____|
 \\ \\ /\\ / /|  _| | |  | |  | | | | |\\/| |  _|
  \\ V  V / | |___| |__| |__| |_| | |  | | |___
   \\_/\\_/  |_____|_____\\____\\___/|_|  |_|_____|


  ___  _   _
 / _ \\| \\ | |
| | | |  \\| |
| |_| | |\\  |
 \\___/|_| \\_|


 __  __ _____ __  __ _____
|  \\/  | ____|  \\/  | ____|
| |\\/| |  _| | |\\/| |  _|
| |  | | |___| |  | | |___
|_|  |_|_____|_|  |_|_____|


 ____  _        _    _   _ _____ _____
|  _ \\| |      / \\  | \\ | | ____|_   _|
| |_) | |     / _ \\ |  \\| |  _|   | |
|  __/| |___ / ___ \\| |\\  | |___  | |
|_|   |_____/_/   \\_|_| \\_|_____| |_|

We're happy you're here
`);

function App() {
    return (
        <div className="App">
            <h1>Przykład komunikacji z Laravel API</h1>
        </div>
    );
}

export default App;

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#00ff00",
    },
});
