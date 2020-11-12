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

//Nos indica que respuesta esta oculta
var respuestaOculta;

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
    $("#headerNumeroPreguntas").text("0/"+nPreguntas);
    //Tenemos que cargarlo primero para que la función nueva pregunta exista
    $('#principal').load('partida.html');

}

//Pone una nueva pregunta
function nuevaPregunta() {
    //Ponemos el verbo en español en la pregunta
    $('#verboEsp').text(verbos[arrayNumero[preguntaActual]][3]);
    //Ponemos los verbos en inglés
    $('#soluciones').html("");
    $('#soluciones').append('<button type="button" class="btn btn-warning btn-lg" id="base">'+verbos[arrayNumero[preguntaActual]][0]+'</button>');
    $('#soluciones').append('<button type="button" class="btn btn-warning btn-lg" id="pasado">'+verbos[arrayNumero[preguntaActual]][1]+'</button>');
    $('#soluciones').append('<button type="button" class="btn btn-warning btn-lg" id="participio">'+verbos[arrayNumero[preguntaActual]][2]+'</button>');
    quitarUnaOpcion();
    //Ponemos cuantas preguntas lleva
    $("#headerNumeroPreguntas").text(preguntaActual+"/"+nPreguntas);
};

//Cambiamos una de las respuestas por un hueco en blanco para que conteste el usuario
function quitarUnaOpcion(){
   respuestaOculta = Math.floor(Math.random() * 2);

    if(respuestaOculta == 0){
        $('#base').html("");
        $('#base').append('<input type="text" id="respuesta" >');
        
    }else if(respuestaOculta == 1){
        $('#pasado').html("");
        $('#pasado').append('<input type="text" id="respuesta" >');
    }else{
        $('#participio').html("");
        $('#participio').append('<input type="text" id="respuesta" >');
    }

    
}


//pasa a la siguiente pregunta
function siguiente() {
    preguntaActual++;
    nuevaPregunta();
}


//Comprueba si la respuesta es correcta
function comprobar(){

    //Si acierta ponemos la siguiente pregunta
    if($('#respuesta').val().localeCompare(verbos[arrayNumero[preguntaActual]][respuestaOculta])==0){
        //Si no ha terminado las preguntas pasamos a la siguiente
        if(preguntaActual<nPreguntas){
            siguiente();
        }else{
          alert("You win!");
          $("#comprobar").attr("disabled","disabled");
        }
        
    }else{//Si falla ponemos la respuesta correcta y cambiamos el botón
        $('#comprobar').text(verbos[arrayNumero[preguntaActual]][respuestaOculta]);
        $('#comprobar').removeClass();
        $('#comprobar').addClass("btn btn-danger btn-lg");
        $("#comprobar").attr("disabled","disabled");
        alert("You lose :(");
    }
}




