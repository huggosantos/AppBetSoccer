var app = angular.module('MyApp', ['ngRoute']);

app.config(function($routeProvider) {
  /*ROTAS*/
  $routeProvider
  .when('/formularioChamado', {
    templateUrl: 'paginas/formularioChamado.html',
    controller: 'formularioChamado'
  })
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




app.controller('aposta', function($scope, $http, $routeParams, $location) {  
  toTop();
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });


  

});

app.elememt(document).ready(function(){
  alert("entrei");
  window.broadcaster.addEventListener( "DatecsPrinter.connectionStatus", function(e) {
    if (e.isConnected) {
      alert('connect impress');
    }
  }); } );


app.controller('formularioChamado', function($scope, $http, $routeParams, $location) {

 toTop();
 $scope.enviarForm = function(chamado){
   var value = window.localStorage.getItem("chave");
   console.log(value);
   if(latitude==undefined){
     Materialize.toast('Chamado não enviado, Ativar geolocalização !', 7000)
   }
   else if($scope.chamado.tipo==true && value==undefined){
     Materialize.toast('Chamado não enviado, Enviar Foto !', 7000)
   }else{

     console.log(value);
     pararCaptura();
     window.localStorage.removeItem("chave");
     $http({
      url: 'https://modulosamu.herokuapp.com/chamado/store',
      method: 'POST',
      data: {
        nome: $scope.chamado.nome,
        numero: $scope.chamado.numero,
        rua: $scope.chamado.rua,
        bairro: $scope.chamado.bairro,
        cidade: $scope.chamado.cidade,
        ref: $scope.chamado.ref,
        clinico: $scope.chamado.tipo,
        latitude: latitude,
        longitude: longitude,
        descricao: $scope.chamado.descricao,
        img: value,

      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      }

    }).
     success(function (data) {
      $scope.success = true;
      alert(data);
      latitude=undefined;
      longitude=undefined;
      $location.path("/sobre");
      $scope.user = {};
    }).
     error(function (data) {
      $scope.error = true;

    }); 
   }
 }


});