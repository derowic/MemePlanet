const WebSocket = require("ws");
const mysql = require("mysql");

const wss = new WebSocket.Server({ port: 5999 });

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "MemePlanet",
});

dbConnection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

const clientsMap = new Map();

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
        message = JSON.parse(message);
        console.log(message);

        readMessage(ws, message);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        if (clientsMap.has(ws)) {
            const { id } = clientsMap.get(ws);
            clientsMap.delete(ws);
            console.log(`Client disconnected, ID: ${id}`);
        }
    });
});

function readMessage(ws, message) {
    switch (message.type) {
        case "info":
            clientsMap.set(ws, { id: message.id });
            console.log("add new client", "id ", message.id);
            break;
        case "message":
            let client = findClientById(message.receiver);

            if (client && client.ws.readyState === WebSocket.OPEN) {
                client.ws.send(JSON.stringify(message));
            }
            console.log("add new message");
            break;

        default:
            console.log("It's a weekend day!");
    }
}

function findClientById(idToFind) {
    for (const [ws, clientData] of clientsMap.entries()) {
        if (clientData.id === idToFind) {
            return { ws, clientData };
        }
    }
    return null;
}
