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



app.controller('aposta', function($scope, $http, $routeParams, $location) {  
  toTop();
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
    $(document).ready(function(){
    $('.collapsible').collapsible();
  });
 
  $http.get('http://betsocceroficial.herokuapp.com/aposta').then(function(response) {
  // var json = JSON.stringify(response.data)
//var json = JSON.parse(jso); 
  // window.localStorage.setItem("ArquivoServidor",response.data);
   $scope.aposta=response.data;
   $scope.teste=1;

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

