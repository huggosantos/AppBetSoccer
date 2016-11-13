var app = angular.module('MyApp', ['ngRoute']);

app.config(function($routeProvider) {
  /*ROTAS*/
  $routeProvider
  .when('/aposta', {
    templateUrl: 'paginas/aposta.html',
    controller: 'aposta'
  })
  .otherwise('/aposta', {
   templateUrl: 'templates/aposta.html',
   controller: 'home'
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

app.controller('controlCollapseible', function($scope) { 
 $(document).ready(function(){
  $('.collapsible').collapsible();
});
});

var vetor = new Array();
var vetorHora = new Array();
var aux = new Array();
var count=0;

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

function dadosHora(vetorHora,valor2){
  for(var i in vetorHora){
    if(vetorHora[i]==valor2){
      return true;
    }
  }
  return false;
}
function dadosCamp(vetor, valor){
  for(var i in vetor){
    if(vetor[i]==valor){
      return true;
    }
  }
  return false;
}

for(var i in vetor){
  //console.log(vetor[i]);
}
for(var i in vetorHora){
  //console.log(vetorHora[i]);
}


$scope.CampEmJogos = function(hora){
  console.log("View data-> "+hora);
  for(var k in response.data.jogos){
    console.log("-------------------");
    if(hora==response.data.jogos[k].data){
      console.log("Json data -> "+response.data.jogos[k].data);
      aux[]=response.data.jogos[k].campeonato.descricao_campeonato;
      console.log("Camp Aux -> "+aux);
      break;
    }

  }
  return aux;
};

for(var i in aux){
  //console.log(aux[i]);
}

$scope.campeonatos=vetor;
$scope.horas=vetorHora;
$scope.aposta=response.data;


}, function(err) {
  console.log(err);
});


});


app.elememt(document).ready(function(){
  alert("entrei");
  window.broadcaster.addEventListener( "DatecsPrinter.connectionStatus", function(e) {
    if (e.isConnected) {
      alert('connect impress');
    }
  }); 
});

