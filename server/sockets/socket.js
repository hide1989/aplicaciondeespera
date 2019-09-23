const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {


    //la data es null
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketcontrol.siguiente();
        console.log('es sgnte ticket es:', siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        estado: ticketcontrol.getUltimoTicket(),
        ultimos4: ticketcontrol.getUltimos4()

    });




    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "el escritorio es necesario"
            })
        }

        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio)

        callback(atenderTicket);

        //notifica cambios e los ultimos 4
        client.broadcast.emit('ultimos4', { //broadcast nos funciona para todo los clientes conectdos

            ultimos4: ticketcontrol.getUltimos4()

        });
    })

});