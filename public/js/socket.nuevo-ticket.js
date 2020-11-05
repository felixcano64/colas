var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
});


$('button').on('click', function() {

    socket.emit('siguiemteTicket', null, function(tiket) {

        label.text(tiket);

    });

});