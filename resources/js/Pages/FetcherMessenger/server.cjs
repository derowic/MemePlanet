const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Nasłuchuj wiadomości od klienta
  ws.on('message', (message) => {
    console.log(message);
    message = JSON.parse(message);
    // Przesyłaj otrzymane wiadomości do wszystkich klientów
    wss.clients.forEach((client) => {
      //if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Przesyłaj dane jako tekst (JSON)
        if (client.readyState === WebSocket.OPEN) {
            // Przesyłaj dane jako tekst (JSON)
            client.send(JSON.stringify(message));
          }
      //}
    });
  });

  // Obsłuż zamknięcie połączenia klienta
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
