const WebSocket = require('ws');
const mysql = require('mysql');

const wss = new WebSocket.Server({ port: 5999 });

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'MemePlanet',
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(message);
    message = JSON.parse(message);

    // Przesyłaj dane jako tekst (JSON)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });

    // Zapisz dane do bazy danych Laravel
    const insertQuery = 'INSERT INTO your_table_name (column1, column2) VALUES (?, ?)';
    const values = [message.data1, message.data2];
    dbConnection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting into MySQL:', err);
      } else {
        console.log('Data inserted into MySQL:', result);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
