var app = angular.module('MyApp', ['ngRoute']);

app.config(function($routeProvider) {
  /*ROTAS*/
  $routeProvider
  .when('/aposta', {
    templateUrl: 'paginas/aposta.html',
    controller: 'aposta'
  })
  .when('/dadosCambista', {
    templateUrl: 'paginas/dadosCambista.html',
    controller: 'dadosCambista'
  })
  .otherwise('/aposta', {
   templateUrl: 'templates/aposta.html',
   controller: 'aposta'
 });
}).run(function() {
    //remove 300ms delay touch
    //FastClick.attach(document.body);
  });

function toTop(){
  $('html, body').animate({
    scrollTop: 0
  }, 800, 'linear');
}

var jogosIdAposta = new Array();
var palpites = new Array();
var contador=0;

app.controller('controlCollapseible', function($scope) { 
 $(document).ready(function(){
  $('.collapsible').collapsible();
});
 var allRadios = new Array();

   // Função para deschecar um radio
 $scope.check = function (id,p) {
   // Verifica se a possição do input atual está null
  if(allRadios[$(this).attr('name')]!=null){
    var indice = jogosIdAposta.indexOf(id);
    console.log("Removendo Jogo "+id+" E Palpite"+p);   //Remove o id do jogo do array
    //console.log("nulo"+ jogosIdAposta.indexOf(id));
    jogosIdAposta.splice(indice,1);
    palpites.splice(indice,1);
    contador--;
    console.log("decrementando contador -1:"+contador);
    //jogosIdAposta[indice]=null;      //Remove o um palpite do array
    //palpites[indice]=null;                 //Seta o input.checked para false 
    this.checked = false;                               //Seta a posição atual do input para null 
    allRadios[$(this).attr('name')] = null;
  }else{   
    console.log("Adcionando Jogo "+id+" E Palpite "+p); 
    jogosIdAposta[contador]=id;
    palpites[contador]=p;
    contador++;
    console.log("Incrementando contador +1:"+contador);
    allRadios[$(this).attr('name')] = this;
  }
    console.log("Imprimindo Vetor com Apostas");
  for (var i in jogosIdAposta) {
    //if (jogosIdAposta[i] != null) {
    console.log("Id do Jogo......:"+jogosIdAposta[i]);
    console.log("Valor do Palpite:"+palpites[i]);
    //}else{
      //console.log("nulo "+ jogosIdAposta.indexOf(null));
    //}
  }
  
  $scope.montar = function(){
    console.log(montarJson(jogosIdAposta,palpites));
  }
}

function montarJson(j,p){
      var dadosAposta = JSON.stringify({aposta:{
      
      jogos : j,
      valorPalpite : p
    
  }});
 return dadosAposta;
}

});

var vetor = new Array();
var vetorHora = new Array();
var aux = new Array();
var jsonServidor;

app.controller('aposta', function($scope, $http, $routeParams, $location) {  
  toTop();
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

 $http.get('http://betsocceroficial.herokuapp.com/aposta').then(function(response) {
// var json = JSON.stringify(response.data)
// var json = JSON.parse(jso); 
// window.localStorage.setItem("ArquivoServidor",response.data); 

for(var k in response.data.jogos){ 
  if(k==0){
    vetor.push(response.data.jogos[k].campeonato.descricao_campeonato);
  }else{
    if(!dadosCamp(vetor,response.data.jogos[k].campeonato.descricao_campeonato)){
      vetor.push(response.data.jogos[k].campeonato.descricao_campeonato);
    }
  }
  if(k==0){
    vetorHora.push(response.data.jogos[k].data);
  } else{
    if(!dadosHora(vetorHora,response.data.jogos[k].data)){
      vetorHora.push(response.data.jogos[k].data);
    }
  }
}
$scope.toData = function(dateTime) {

var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time

var date = dateTime[0].split("-");
var dataFinal = date[2]+"/"+date[1]+"/"+date[0];

return dataFinal;   
}

$scope.toHora = function(Time) {
var Time = Time.split(" ");//dateTime[0] = date, dateTime[1] = time

var time = Time[1].split(":");
var timeFinal = time[0]+":"+time[1];

return timeFinal;
    
}

function dadosHora(vetorHora,valor2){
  for(var i in vetorHora){
    if(vetorHora[i]==valor2){
      return true;
    }
  }
  return false;
}
$scope.CampEmJogos = function(hora){
  aux=new Array();
  //console.log("View data-> "+hora);
  for(var k in response.data.jogos){
  //console.log("--------------------");
    if(hora==response.data.jogos[k].data){
  //console.log("Json data -> "+response.data.jogos[k].data);
      if(!dadosCamp(aux,response.data.jogos[k].campeonato.descricao_campeonato)){
        aux.push(response.data.jogos[k].campeonato.descricao_campeonato);
      }
  //console.log("Camp Aux -> "+aux);
    }
  }
  return aux;
};

$scope.campeonatos=vetor;
$scope.horas=vetorHora;
$scope.aposta=response.data;
jsonServidor=response.data;
//window.localStorage.setItem("jsonServidor",response.data);
//window.localStorage.setItem("todosCampeonatos",aux);
//window.localStorage.setItem("todasDatas",vetorHora);


}, function(err) {
  console.log(err);
});


});


app.controller('dadosCambista', function($scope, $http, $routeParams, $location) { 
 toTop();
}); 

function dadosCamp(vetor, valor){
  for(var i in vetor){
    if(vetor[i]==valor){
      return true;
    }
  }
  return false;
}

function CampEmJogosPorData(hora){
  aux=new Array();
  //console.log("View data-> "+hora);
  for(var k in jsonServidor.jogos){
  //console.log("--------------------");
    if(hora==jsonServidor.jogos[k].data){
  //console.log("Json data -> "+response.data.jogos[k].data);
      if(!dadosCamp(aux,jsonServidor.jogos[k].campeonato.descricao_campeonato)){
        aux.push(jsonServidor.jogos[k].campeonato.descricao_campeonato);
      }
  //console.log("Camp Aux -> "+aux);
    }
  }
  return aux;
};

app.controller('MainCtrl', ['$scope', function (scope) {

}]); 

app.elememt(document).ready(function(){
  alert("entrei");
  window.broadcaster.addEventListener( "DatecsPrinter.connectionStatus", function(e) {
    if (e.isConnected) {
      alert('connect impress');
    }
  }); 
});

