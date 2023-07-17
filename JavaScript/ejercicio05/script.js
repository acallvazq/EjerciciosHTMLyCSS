window.onload = function() {
    var audio = document.getElementById("audio");
    var contenido = document.getElementById("contenido");
    var hora = "00";
    var minutos = "00";
    var segundos = "00";

    contenido.innerHTML = hora + ":" + minutos + ":" + segundos;
};

function actualizaSegundos(pSegundos) {
    var contenido = document.getElementById("contenido");
    var hora = "0";
    var minutos = "0";
    var segundos = "0";

    if(!isNaN(pSegundos) && pSegundos !== ""){
        segundos = parseInt(pSegundos);
        if(segundos > 59) {
            minutos = Math.floor(segundos / 60);
            segundos = segundos % 60; 
        }if(minutos > 59){
            hora = Math.floor(minutos / 60);
            minutos = minutos % 60; 

        }if(hora >= 24){
            hora = 24;
            minutos = 0;
            segundos = 0;
        }
    }

    hora = (hora < 10) ? "0" + hora : hora;
    minutos = (minutos < 10) ? "0" + minutos : minutos;
    segundos = (segundos < 10) ? "0" + segundos : segundos;

    contenido.innerHTML = hora + ":" + minutos + ":" + segundos;

}

function cuentaAtras(segundos){
    var entrada = document.getElementById("segundos");
    var inicio = document.getElementById("inicio");

    var temporizador;
    var segundos = entrada.value;
    entrada.value = "";   

    inicio.disabled = true;

    actualizaSegundos(segundos);
    
    temporizador = setInterval(function() {
        if(segundos > 0){
            actualizaSegundos(segundos);
            segundos--;
        }else {
            sonarAlarma();
            clearInterval(temporizador);
            document.getElementById("cajaMensaje").style.display = "block";         
        }      
    }, 1000);   
}

function detenerAlarma(){
    var inicio = document.getElementById("inicio");

    document.getElementById("cajaMensaje").style.display = "none";
    actualizaSegundos(0);
    detenerSonidoAlarma();
    inicio.disabled = false;
}

function sonarAlarma(){
    audio.play();
}

function detenerSonidoAlarma(){
    audio.pause();
    audio.currentTime = 0;
}