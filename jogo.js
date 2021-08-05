var timerId = null; //Variavel que armazena a chamada de função settimeout

function IniciarJogo(){

var url = window.location.search;
var nivel_jogo = url.replace("?", "");
var tempo_segundos = 0;

if(nivel_jogo == 1) { // 1 Fácil - 120 segundos
  tempo_segundos = 120;
}

if(nivel_jogo == 2) { // 2 Médio - 60 segundos
  tempo_segundos = 60;
}

if(nivel_jogo == 3) { // 3 Impossivel - 30 segundos
  tempo_segundos = 30;
}

// Inserir segundos do cronometro
document.getElementById('cronometro').innerHTML = tempo_segundos;

// Quantidade de Patos
var qtde_patos = 40;
criar_patos(qtde_patos);

// Patos vivos
document.getElementById('patos_vivos').innerHTML = qtde_patos;

// Patos Mortos
document.getElementById('patos_mortos').innerHTML = 0;


contagem_tempo(tempo_segundos);

}
  function contagem_tempo(segundos){

    segundos = segundos - 1;

    if (segundos == - 1){
      clearTimeout(timerId); //para execução da função do setTimeout
      game_over();
      return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
  }

function game_over(){
  remove_eventos_patos();
  alert('Fim de jogo! Os patos FUGIRAM!!!')
} 



function criar_patos(qtde_patos){

  for(var i = 1; i <= qtde_patos; i++){

var patos = document.createElement("img");
patos.src = 'img/pato.png';
patos.id = 'p'+i;
patos.onclick = function(){matar(this);}

document.getElementById('cenario').appendChild(patos);
  }
}
 function matar(m){
   var id_patos = m.id;
   document.getElementById(id_patos).setAttribute("onclick", "");
   document.getElementById(id_patos).src = 'img/pato_morto.png';
   pontuacao(-1);
  }

function pontuacao(acao){
  var patos_vivos = document.getElementById('patos_vivos').innerHTML;
  var patos_mortos = document.getElementById('patos_mortos').innerHTML;


patos_vivos = parseInt(patos_vivos);
patos_mortos = parseInt(patos_mortos);

patos_vivos = patos_vivos + acao;
patos_mortos = patos_mortos - acao;

document.getElementById('patos_vivos').innerHTML = patos_vivos;
document.getElementById('patos_mortos').innerHTML = patos_mortos;

situacao_jogo(patos_vivos);
}

function remove_eventos_patos(){
  var i = 1; //contador para recuperar balões por id

// percorre os elementos por id e so irá sair do laço quando nao houver correspondência com os elementos
while(document.getElementById('p'+i)){
  //retira evento onclick do elemento
  document.getElementById('p'+i).onclick= '';
  i++; //faz a alteração da variavel
  }
}







function situacao_jogo(patos_vivos){
  if(patos_vivos == 0){
    alert('Parabéns! Acabou com o ecossistema');
    parar_jogo();
  }
}

function parar_jogo(){
  clearTimeout(timerId);
}