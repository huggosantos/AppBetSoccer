// controller para pegar os dados do agente 
app.controller('dadosCambista', function($scope, $http, $route, $location) { 
  $scope.mostrarLoader = function(){
    if($scope.teste==null || $scope.teste==false || $scope.teste==true){
     $scope.teste=false;   
     $scope.teste2=true;
   }
 }

 $scope.buscarDadosCambista = function() {   
  $http.get('http://betsoccer.club/public/aposta/ganhosApostas/'+$scope.password).then(function(response) {
    $scope.dados = response.data;
    $scope.teste2=false;
    $scope.teste=true;
  }).catch(function(err) {
   $scope.teste=false;
   $scope.teste2=false;
   if(err.status==400){
    Materialize.toast('Código de Segurança Inexistente', 4000);
  }else if(err.status==401){
    Materialize.toast('Código de Segurança Inativo', 4000);
  }else{
    Materialize.toast('Erro na comunicação!', 4000);
  }
});
}
toTop();
$(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });

$(document).ready(function(){
  $('ul.tabs').tabs();
});
});
//----------------------------------------------------FIM DADOS AGENTE---------------------------------------------------
