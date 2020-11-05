const { io } = require('../server');

const { TiketControl } = require('../classes/ticket-control');
//const ticketControl = require('../classes/ticket-control');

const tiketControl = new TiketControl();


io.on('connection', (client) => {


    client.on('siguiemteTicket', (data, callback) => {

        let ticket = tiketControl.siguiente();
        console.log(ticket);

        callback(ticket)

    });

    client.emit('estadoActual', {
        actual: tiketControl.getUltimoTiket(),
        ultimos4: tiketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'el escritorio es necesario'
            });
        }

        let atenderTicket = tiketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);


        client.broadcast.emit('ultimos4', {
            ultimos4: tiketControl.getUltimos4()
        });

    });

});