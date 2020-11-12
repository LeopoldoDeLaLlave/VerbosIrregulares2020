$(document).ready(() => {
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
    //Tenemos que cargarlo primero para que la función nueva pregunta exista
    $('#principal').load('partida.html');

}

//Pone una nueva pregunta
function nuevaPregunta() {
    //Ponemos el verbo en español en la pregunta
    $('#verboEsp').text(verbos[arrayNumero[preguntaActual]][3]);
    //Ponemos los verbos en inglés
    $('#base').text(verbos[arrayNumero[preguntaActual]][0]);
    $('#pasado').text(verbos[arrayNumero[preguntaActual]][1]);
    $('#participio').text(verbos[arrayNumero[preguntaActual]][2]);

};


//pasa a la siguiente pregunta
function siguiente() {
    preguntaActual++;
    nuevaPregunta();
}


