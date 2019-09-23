var socket = io();

socket.on('connect', function() {

    console.log('conectado al servidor');

});


socket.on('disconnect', function() {

    console.log('desconectado del servidor');

})

var sercheParamas = new URLSearchParams(window.location.search) // permite obtener los parametros de la URL

if (!sercheParamas.has("escritorio")) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = sercheParamas.get('escritorio');

var label = document.getElementById("pequeno")
var titulo = document.getElementById('titulo');
titulo.innerHTML = `Escritorio ${escritorio}`


var boton = document.getElementById("btn");
boton.addEventListener('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === "ya no hay mas tickets") {
            label.innerHTML = "Ya no hay tickets";
            alert(res);
            return
        }
        console.log(res);
        label.innerHTML = `Ficho ${res.numero} `;
    });
});