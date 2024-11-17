const clients = [];

function eventsHandler(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Agrega el cliente actual a la lista de clientes
    clients.push(res);

    // Maneja la desconexión del cliente
    req.on('close', () => {
        /* console.log('Cliente SSE desconectado'); */
        clients.splice(clients.indexOf(res), 1);
    });
}

function sendEventsToAll(newData) {
    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify(newData)}\n\n`);
    });
}

export default { eventsHandler, sendEventsToAll };