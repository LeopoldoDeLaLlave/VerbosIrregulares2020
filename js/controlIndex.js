$(document).ready(() => {
    //Controlamos las superEstrellas
    gestionarCookies();
    $('#headerSuperEstrellas').text("SuperEstrellas: " + superEstrellas);
    $('.btnNumPreguntas').click(abrir);

    //si el jugador dejó la partida abierta la abre desde el punto donse la dejó
    if (preguntasContestadas > 0) {
        recargada = true;
        abrir();
    }





});

//Guarda el número de preguntas con las que va a jugar el usuario
var nPreguntas;

//Guarda la pregunta aleatoria que se está viendo 
var preguntaActual = 0;

//Guarda cuantas preguntas llevamos
var preguntasContestadas = 0;

//Nos indica que respuesta esta oculta
var respuestaOculta;

//Puntos que lleva el jugador
var puntos;


//SuperEstrellas que lleva el jugador
var superEstrellas;

//Nos indica si la partida está siendo recargada
var recargada = false;



//Abre una pregunta
function abrir() {
    nPreguntas = $(this).text() ? $(this).text() : nPreguntas;
    document.cookie = "nPreguntas=" + nPreguntas + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    $("#headerNumeroPreguntas").text(preguntasContestadas + "/" + nPreguntas);
    //Tenemos que cargarlo primero para que la función nueva pregunta exista
    $('#principal').load('partida.html');

}

//Pone una nueva pregunta
function nuevaPregunta() {
    //Si estamos recargando la página usamos la última pregunta que apareció,
    //Si no usamos una aleatoria
    if (recargada) {
        preguntaActual = parseInt(getCookieValue("preguntaActual"));
    } else {
        preguntaActual = Math.floor(Math.random() * (verbos.length - 1));
        document.cookie = "preguntaActual=" + preguntaActual + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    }



    //Ponemos el verbo en español en la pregunta
    $('#verboEsp').text(verbos[preguntaActual][3]);
    //Ponemos los verbos en inglés
    $('#soluciones').html("");
    $('#soluciones').append('<div  class="col-4 d-flex flex-column respuesta " id="base" >' + verbos[preguntaActual][0] + '</div>');
    $('#soluciones').append('<div  class="col-4 d-flex flex-column respuesta " id="pasado">' + verbos[preguntaActual][1] + '</div>');
    $('#soluciones').append('<div  class="col-4 d-flex flex-column respuesta " id="participio" ">' + verbos[preguntaActual][2] + '</div>');
    quitarUnaOpcion();
    //Ponemos cuantas preguntas lleva
    $("#headerNumeroPreguntas").text(preguntasContestadas + "/" + nPreguntas);



    //Ponemos tantas estrellas como puntos lleve el jugador
    $('#puntos').text("");
    for (let i = 0; i < puntos; i++) {

        $('#puntos').append('<i class="puntuacion fas"></i>');
    }

    //En función del número de preguntas los puntos tendrán un ícono u otro

    if (nPreguntas == 10) {
        $('.puntuacion').addClass("fa-star");
    } else if (nPreguntas == 20) {
        $('.puntuacion').addClass("fa-gem");
    } else if (nPreguntas == 30) {
        $('.puntuacion').addClass("fa-crown");
    } else if (nPreguntas == 40) {
        $('.puntuacion').addClass("fa-heart");
    } else if (nPreguntas == 50) {
        $('.puntuacion').addClass("fa-flask");
    } else if (nPreguntas == 60) {
        $('.puntuacion').addClass("fa-bug");
    } else if (nPreguntas == 70) {
        $('.puntuacion').addClass("fa-beer");
    } else if (nPreguntas == 80) {
        $('.puntuacion').addClass("fa-smoking");
    } else if (nPreguntas == 140) {
        $('.puntuacion').addClass("fa-hand-spock");
    }



    //Actualizamos superEstrellas
    $('#headerSuperEstrellas').text("SuperEstrellas: " + superEstrellas);
};


//Cambiamos una de las respuestas por un hueco en blanco para que conteste el usuario
function quitarUnaOpcion() {

    //Si estamos recargando la página usamos la última respuesta oculta apareció,
    //Si no usamos una aleatoria
    if (recargada) {
        respuestaOculta = parseInt(getCookieValue("respuestaOculta"));
        recargada = false;
    } else {
        respuestaOculta = Math.floor(Math.random() * 2);
        document.cookie = "respuestaOculta=" + respuestaOculta + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    }


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
    preguntasContestadas++;
    document.cookie = "preguntasContestadas=" + preguntasContestadas + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    nuevaPregunta();
}


//Comprueba si la respuesta es correcta
function comprobar() {

    //Esta es la respuesta que tiene que dar el usuario
    const verboComparar = verbos[preguntaActual][respuestaOculta];


    //En caso de que hay más de una respuesta lo tenemos en cuenta
    if (verboComparar.includes("/")) {
        var verbo1 = verboComparar.substr(0, verboComparar.indexOf('/'));
        var verbo2 = verboComparar.split('/')[1];;
    }

    //Si acierta ponemos la siguiente pregunta
    if ($('#respuesta').val().localeCompare(verboComparar) == 0 || (verboComparar.includes("/") &&
        ($('#respuesta').val().localeCompare(verbo1) == 0
            || $('#respuesta').val().localeCompare(verbo2) == 0))) {
        //Si no ha terminado las preguntas pasamos a la siguiente
        if (preguntasContestadas < nPreguntas) {
            //Si el usuario consigue 10 puntos obtiene una superEstrella y lo guardamos en las cookies
            if (puntos < 9) {
                puntos++;
                //Vsmos guardando los puntos en las cookies
                document.cookie = "puntos=" + puntos + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
            } else {
                puntos = 0;
                document.cookie = "puntos=" + puntos + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
                superEstrellas++;
                document.cookie = "superEstrellas=" + superEstrellas + "; expires=Thu, 18 Dec 2100 12:00:00 UTC";
            }

            siguiente();

        } else {
            alert("You win!");
            $("#comprobar").attr("disabled", "disabled");
            reiniciarValores()
        }

    } else {//Si falla ponemos la respuesta correcta y cambiamos el botón
        $('#comprobar').text(verbos[preguntaActual][respuestaOculta]);
        $('#comprobar').removeClass();
        $('#comprobar').addClass("btn btn-danger btn-lg");
        $("#comprobar").attr("disabled", "disabled");
        alert("You lose :(");
        reiniciarValores()
    }
}

//Le das el nombre de una cookie y te devuelve su valor
function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
    return result ? result.pop() : ""
}


//Almacena las superestrellas que ha conseguido el usuario
function gestionarCookies() {
    //Si ya hay cookies guardadas
    if (document.cookie) {
        //Obtenemos las superestrellas guardadas en las cookies
        superEstrellas = getCookieValue("superEstrellas");
        puntos = parseInt(getCookieValue("puntos"));
        preguntasContestadas = parseInt(getCookieValue("preguntasContestadas"));
        nPreguntas = parseInt(getCookieValue("nPreguntas"));

    } else {//Si no hay cookies guardadas las creamos
        document.cookie = "superEstrellas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.cookie = "puntos=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.cookie = "preguntasContestadas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        document.cookie = "nPreguntas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
        puntos = 0;
        superEstrellas = 0;
        preguntasContestadas = 0
        nPreguntas = 0;
    }


}

//Al cambiar el nive se reinician los valores, menos las superestrellas
function reiniciarValores() {
    document.cookie = "puntos=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    document.cookie = "preguntasContestadas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
    document.cookie = "nPreguntas=0; expires=Thu, 18 Dec 2100 12:00:00 UTC";
}



