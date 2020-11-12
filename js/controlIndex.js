$(document).ready(() => {
    crearArray();
    $('.btnNumPreguntas').click(abrir);
    $('.btnNumPreguntas').click(desordenarArray);
    $('#comprobar').click(siguiente);

});

//Guarda el número de preguntas con las que va a jugar el usuario
var nPreguntas = 0;
//Guarda el numero de verbos que hay
var arrayNumero = [];
//Guarda la pregunta que se está viendo 
var preguntaActual = 0;

//Nos va a crear un array con tantos números como preguntas haya
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
    $("#headerNumeroPreguntas").text(nPreguntas);
    $('#principal').load('partida.html');
    nuevaPregunta();

}

//Pone una nueva pregunta
function nuevaPregunta() {
    //Ponemos el verbo en español en la pregunta
    $('#verboEsp').text(verbos[nPreguntas][3]);
    //Ponemos los verbos en inglés
    $('#base').text(verbos[nPreguntas][0]);
    $('#pasado').text(verbos[nPreguntas][1]);
    $('#participio').text(verbos[nPreguntas][2]);
    console.log(preguntaActual);
    console.log(verbos[nPreguntas][2]);
};


//pasa a la siguiente pregunta
function siguiente() {
    console.log("hola");
    preguntaActual++;
    nuevaPregunta();
}


