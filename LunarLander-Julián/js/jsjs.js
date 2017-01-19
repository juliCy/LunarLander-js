var y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g; //a= -g es para motor encendido
var dt = 0.016683;
var timer;
var gasolina=100;
var dificultad=1;
var gasolinaTotal=100
var intentos = 1;
var modeloNave=1;
var modeloLuna=1;
var timerFuel=null;

window.onload = function arrancarJuego(){
    //encender/apagar el motor al hacer click en la pantalla
    document.onclick = function () {
      if (a==g){
        encenderMotor();
      } else {
        apagarMotor();
      }
    }
    //CAPTURANDO EVENTOS DEL PANEL DERECHA
    document.getElementById("reanudar").onclick=function(){reanudar();};
    document.getElementById("pausa").onclick=function(){pausar();};
    document.getElementById("instrucciones").onclick=function(){mostrarInstrucciones();};
    document.getElementById("botonAjustes").onclick=function(){mostrarAjustes();};
    //CAPTURANDO EVENTOS PARA EL PANEL DERECHO EN SMARTPHONE
    document.getElementById("reanudaSmartphone").onclick=function(){reanudarSmartphone();};
    document.getElementById("pausaSmartphone").onclick=function(){pausarSmartphone();};
    document.getElementById("ayudaSmartphone").onclick=function(){mostrarInstruccionesSmartphone();};
    document.getElementById("botonAjustesSmartphone").onclick=function(){mostrarAjustesSmartphone();};  
    //EVENTOS DE FIN DEL JUEGO
    document.getElementById("jugarOtraVez").onclick=function(){reiniciarJuego();};
    document.getElementById("jugarOtraVezSmartphone").onclick=function(){reiniciarJuegoSmartphone();};  
    document.getElementById("jugarAgain").onclick=function(){reiniciarJuego();};
    document.getElementById("jugarAgainSmartphone").onclick=function(){reiniciarJuegoSmartphone();};
    
    //Empezar a mover nave
    start();

   
    //CON TECLADO (tecla ESPACIO)
    window.onkeydown=function(e) {
        var claveTecla;
        if (window.event)
            claveTecla = window.event.keyCode;
        else if (e)
            claveTecla = e.which;
        if ((claveTecla==32))
            {encenderMotor();
            }
    }
    window.onkeyup=apagarMotor;

}//TERMINA EL WINDOW.ONLOAD


//FUNCION EMPEZAR EL JUEGO
function start(){
    timer=setInterval(function(){ moverNave(); }, dt*1000);
}

//FUNCION PARAR NAVE Y CONTROLADORES
function stop(){
    clearInterval(timer);
}

//FUNCION PARA QUE CAIGA LA NAVE A TRAVES DE LA PANTALLA
function moverNave(){
    v +=a*dt;
    document.getElementById("velocidad").innerHTML=v.toFixed(2);
    y +=v*dt;
    document.getElementById("altura").innerHTML=y.toFixed(2);
    //mover hasta que top sea un 70% de la pantalla
    if (y<70){ 
        document.getElementById("nave").style.top = y+"%"; 
    } else { 
        stop();
        finalizarJuego();
    }   
}

//HACER QUE LOS DIVS IZQUIERDA Y DERECHA NO RECIBAN EVENTOS ONCLICK
function eventosOff() {
    document.getElementById("izquierda").style.pointerEvents='none';
    document.getElementById("derecha").style.pointerEvents='none';
}
//HACER QUE LOS DIVS IZQUIERDA Y DERECHA SI RECIBAN EVENTOS ONCLICK
function eventosOn() {
    document.getElementById("izquierda").style.pointerEvents='auto';
    document.getElementById("derecha").style.pointerEvents='auto';
}

//FUNCION PARA ACABAR EL JUEGO
function finalizarJuego() {
    if (v>5) {
            eventosOff();
            document.getElementById("inave").src="img/explosion.png";
            document.getElementById("gameOver").style.display="block";
        } else {
            document.getElementById("userWin").style.display="block";
            eventosOff();   
        }
}

//FUNCION QUE ACTUA EN CUANTO SE ENCIENDE EL MOTOR
function encenderMotor() {
    a=-g;
    document.getElementById("fuel").innerHTML=porcentajeGasolina();
    document.getElementById("inave").src= "img/motor.png";
    if (timerFuel==null) { 
            timerFuel=setInterval(function(){ actualizarGasolina(); }, 100);
            }
    if (gasolina<=0) {
            apagarMotor();
            document.getElementById("fuel").innerHTML=0;
        }
}

//CALCULO EL PORCENTAJE DE GASOLINA QUE QUEDA
function porcentajeGasolina() {
  var result= gasolina * 100 / gasolinaTotal;
  return result.toFixed(0);
}
//FUNCION QUE ACTUALIZA EL MARCADOR DE FUEL
function actualizarGasolina(){
    gasolina-=1;
    document.getElementById("fuel").innerHTML=porcentajeGasolina();
    if (gasolina<=0) {
        apagarMotor();
        document.getElementById("fuel").innerHTML=0;
    }
}
//FUNCION QUE RESPONDE AL MOMENTO DE APAGAR EL MOTOR DE LA NAVE
function apagarMotor() {
    a=g;
    clearInterval(timerFuel);
    timerFuel=null;
    document.getElementById("inave").src= "img/nave.png";
}

function mostrarInstrucciones() {
    pausar();
    eventosOff();
    document.getElementById("menuInstrucciones").style.display="block";
}

function ocultarInstrucciones() {
    document.getElementById("menuInstrucciones").style.display="none";
    eventosOn();
}
//reiniciar escritorio
function reiniciarJuego() {
    stop();
    document.getElementById("reanudar").style.display="none";
    document.getElementById("pausa").style.display="inline-block";
    y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    gasolina=gasolinaTotal;
    document.getElementById("fuel").innerHTML=porcentajeGasolina();
    document.getElementById("fuel").style.color="white";
    reanudar();
    clearInterval(timer);
    start();
    eventosOn();
    document.getElementById("gameOver").style.display="none";
    document.getElementById("userWin").style.display="none";
    document.getElementById("inave").src="img/nave.png";
    
}

function reanudar() {
    stop();
    start();
    document.getElementById("reanudar").style.display="none";
    document.getElementById("pausa").style.display="inline-block";
}
function pausar() {
    stop();
    document.getElementById("pausa").style.display="none";
    document.getElementById("reanudar").style.display="inline-block";
}

//reiniciar movil
function reanudarSmartphone() {
    start();
    document.getElementById("reanudaSmartphone").style.display="none";
    document.getElementById("pausaSmartphone").style.display="inline-block";
    document.getElementById("reiniciaSmartphone").style.display="none";
    document.getElementById("ayudaSmartphone").style.display="none";
    document.getElementById("botonAjustesSmartphone").style.display="none";
    document.getElementById('izquierda').style.display="inline-block";
    document.getElementById('nave').style.display="inline-block";
    document.getElementById('zonaAterrizaje').style.display="inline-block";
}

function pausarSmartphone() {
    stop();
    document.getElementById("pausaSmartphone").style.display="none";
    document.getElementById("reanudaSmartphone").style.display="inline-block";
    document.getElementById("ayudaSmartphone").style.display="inline-block";
    document.getElementById('derechaSmartphone').style.backgroundImage='url(img/fondo_menu.jpg)';
    document.getElementById('derechaSmartphone').style.backgroundSize='auto';
    document.getElementById('derechaSmartphone').style.backgroundRepeat='repeat';
    document.getElementById('derechaSmartphone').style.width='100%';    
}

function reiniciarJuegoSmartphone() {
    stop();
    y = 5; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    gasolina=gasolinaTotal;
    document.getElementById("fuel").innerHTML=porcentajeGasolina();
    document.getElementById("fuel").style.color="white";
    reanudarSmartphone();
    clearInterval(timer);
    start();
    eventosOn();
    document.getElementById("gameOver").style.display="none";
    document.getElementById("userWin").style.display="none";
    document.getElementById("inave").src="img/nave.png";   
}

function mostrarInstruccionesSmartphone() {
    pausarSmartphone();
    document.getElementById("menuInstrucciones").style.display="block";
}