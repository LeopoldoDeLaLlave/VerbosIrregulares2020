$(document).ready(() => {
    //Controlamos las superEstrellas
    gestionarCookies();
    $('#headerSuperEstrellas').text("SuperEstrellas: " + superEstrellas);

    crearArray();
    $('.btnNumPreguntas').click(desordenarArray);
    $('.btnNumPreguntas').click(abrir);



});

//Guarda el número de preguntas con las que va a jugar el usuario
var nPreguntas = 0;
//Guarda el numero de verbos que hay
var arrayNumero = [];
//Guarda la pregunta que se está viendo 
var preguntaActual = 0;

//Nos indica que respuesta esta oculta
var respuestaOculta;

//Puntos que lleva el jugador
var puntos = 0;


//SuperEstrellas que lleva el jugador
var superEstrellas;

//Nos va a crear un array con tantos números como preguntas haya
//Este array luego lo desordenaremos aleatoriamente para poder
//Seleccionar preguntas en orden aleatorio sin que se repitan
function crearArray() {
    for (let i = 0; i < verbos.length; i++) {
        arrayNumero[i] = i;

    }
}

//Desordena el array para obtener las preguntas aleatoriamente
function desordenarArray() {
    var currentIndex = arrayNumero.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = arrayNumero[currentIndex];
        arrayNumero[currentIndex] = arrayNumero[randomIndex];
        arrayNumero[randomIndex] = temporaryValue;
    }

}

//Abre una pregunta
function abrir() {
    nPreguntas = $(this).text();
    $("#headerNumeroPreguntas").text("0/" + nPreguntas);
    //Tenemos que cargarlo primero para que la función nueva pregunta exista
    $('#principal').load('partida.html');

}

//Pone una nueva pregunta
function nuevaPregunta() {
    //Ponemos el verbo en español en la pregunta
    $('#verboEsp').text(verbos[arrayNumero[preguntaActual]][3]);
    //Ponemos los verbos en inglés
    $('#soluciones').html("");
    $('#soluciones').append('<div  class="col-4 d-flex flex-column respuesta " id="base" >' + verbos[arrayNumero[preguntaActual]][0] + '</div>');
    $('#soluciones').append('<div  class="col-4 d-flex flex-column respuesta " id="pasado">' + verbos[arrayNumero[preguntaActual]][1] + '</div>');
    $('#soluciones').append('<div  class="col-4 d-flex flex-column respuesta " id="participio" ">' + verbos[arrayNumero[preguntaActual]][2] + '</div>');
    quitarUnaOpcion();
    //Ponemos cuantas preguntas lleva
    $("#headerNumeroPreguntas").text(preguntaActual + "/" + nPreguntas);

  

    //Ponemos tantas estrellas como puntos lleve el jugador
    $('#puntos').text("");
    for (let i = 0; i < puntos; i++) {

        $('#puntos').append('<i class="puntuacion fas"></i>');
    }

    //En función del número de preguntas los puntos tendrán un ícono u otro

    if(nPreguntas==10){
        $('.puntuacion').addClass("fa-star");
    }else if(nPreguntas==20){
        $('.puntuacion').addClass("fa-gem");
    }else if(nPreguntas==30){
        $('.puntuacion').addClass("fa-crown");
    }else if(nPreguntas==40){
        $('.puntuacion').addClass("fa-heart");
    }else if(nPreguntas==50){
        $('.puntuacion').addClass("fa-flask");
    }else if(nPreguntas==60){
        $('.puntuacion').addClass("fa-bug");
    }else if(nPreguntas==70){
        $('.puntuacion').addClass("fa-beer");
    }else if(nPreguntas==80){
        $('.puntuacion').addClass("fa-smoking");
    }else if(nPreguntas==140){
        $('.puntuacion').addClass("fa-hand-spock");
    }



    //Actualizamos superEstrellas
    $('#headerSuperEstrellas').text("SuperEstrellas: " + superEstrellas);
};


//Cambiamos una de las respuestas por un hueco en blanco para que conteste el usuario
function quitarUnaOpcion() {
    respuestaOculta = Math.floor(Math.random() * 2);

    if (respuestaOculta == 0) {
        $('#base').text("");
        $('#base').removeClass("respuesta");
        $('#base').append('<input type="text" class="form-control" id="respuesta" > ');

    } else if (respuestaOculta == 1) {
        $('#pasado').text("");
        $('#pasado').removeClass("respuesta");
        $('#pasado').append('<input type="text" class="form-control" id="respuesta">');
    } else {
        $('#participio').text("");
        $('#participio').removeClass("respuesta");
        $('#participio').append('<input type="text" class="form-control" id="respuesta>');
    }


}


//pasa a la siguiente pregunta
function siguiente() {
    preguntaActual++;
    nuevaPregunta();
}


//Comprueba si la respuesta es correcta
function comprobar() {

    //Si acierta ponemos la siguiente pregunta
    if ($('#respuesta').val().localeCompare(verbos[arrayNumero[preguntaActual]][respuestaOculta]) == 0) {
        //Si no ha terminado las preguntas pasamos a la siguiente
        if (preguntaActual < nPreguntas) {
            //Si el usuario consigue 10 puntos obtiene una superEstrella y lo guardamos en las cookies
            if (puntos < 9) {
                puntos++;
            } else {
                puntos = 0;
                superEstrellas++;
                var strCookie = "superEstrellas=" + superEstrellas + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
                document.cookie = strCookie;
            }

            siguiente();

        } else {
            alert("You win!");
            $("#comprobar").attr("disabled", "disabled");
        }

    } else {//Si falla ponemos la respuesta correcta y cambiamos el botón
        $('#comprobar').text(verbos[arrayNumero[preguntaActual]][respuestaOculta]);
        $('#comprobar').removeClass();
        $('#comprobar').addClass("btn btn-danger btn-lg");
        $("#comprobar").attr("disabled", "disabled");
        alert("You lose :(");
    }
}

//Almacena las superestrellas que ha conseguido el usuario
function gestionarCookies() {
    //Si ya hay cookies guardadas
    if (document.cookie) {
        var lasCookies = document.cookie;
        //Obtenemos las superestrellas guardadas en las cookies
        superEstrellas = lasCookies.split('=').pop().split(';')[0];
    } else {//Si no hay cookies guardadas las creamos
        document.cookie = "superEstrellas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        superEstrellas = 0;
    }


}



