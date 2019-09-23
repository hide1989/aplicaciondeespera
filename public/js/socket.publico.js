var socket = io();

var lblTicket1 = document.getElementById("lblTicket1");
var lblTicket2 = document.getElementById("lblTicket2");
var lblTicket3 = document.getElementById("lblTicket3");
var lblTicket4 = document.getElementById("lblTicket4");


var lblEscritorio1 = document.getElementById("lblEscritorio1");
var lblEscritorio2 = document.getElementById("lblEscritorio2");
var lblEscritorio3 = document.getElementById("lblEscritorio3");
var lblEscritorio4 = document.getElementById("lblEscritorio4");


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('connect', function() {

    console.log('conectado al servidor');

});


socket.on('disconnect', function() {

    console.log('desconectado del servidor');

});

socket.on('estadoActual', function(resp) {

    actualizaHTML(resp.ultimos4);
});

socket.on('ultimos4', function(resp) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(resp.ultimos4);

});

function actualizaHTML(ultimos4) {

    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].innerHTML = 'Ticket ' + ultimos4[i].numero;
        lblEscritorios[i].innerHTML = 'Escritorio ' + ultimos4[i].escritorio;
    }
}