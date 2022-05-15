const PORT = 8080;

const server = require("ws").Server;
const s = new server({
    port: PORT
});

s.on("connection", ws => {
    ws.on("message", message => {
        console.log("\nReceived\n" + message);

        s.clients.forEach(client => {
            client.send(String(message));
        });
    });
});