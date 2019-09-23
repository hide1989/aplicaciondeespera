//comando para establecr conexion

var socket = io();

socket.on('connect', function() {

    console.log('conectado al servidor');

});


socket.on('disconnect', function() {

    console.log('desconectado del servidor');

})

socket.on('estadoActual', function(resp) { //resp es e mensaje ricibido

    label.innerHTML = resp.estado;
})



let boton = document.getElementById("btn");
let label = document.getElementById("lblNuevoTicket");
boton.addEventListener("click", function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.innerHTML = siguienteTicket;

    });
})