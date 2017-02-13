
//Controller para realizar o acerto com os agentes, pra consumir o servico é necessario o cod. Seguranca do cambista e do ADM.
app.controller('acertoCambista', function($scope, $http, $route, $location) { 
 $scope.mostrarLoader = function(){
  if($scope.aux==null || $scope.aux==false || $scope.aux==true){
   $scope.aux=false;   
   $scope.aux2=true;
 }
}
$scope.acertar = function() {
  $http.get('http://betsoccer.club/public/cambista/acerto/'+$scope.codCambista+'/'+$scope.codAdm).then(function(response) {
    $scope.aux2=false;
    $scope.aux=true;
    Materialize.toast('Acerto realizado Com Sucesso', 6000);
  }).catch(function(err) {
    $scope.aux2=false;
    $scope.aux=false;
    if(err.status==400){
      Materialize.toast('Código de Segurança Inexistente', 4000);
    }else if(err.status==401){
      Materialize.toast('Código de Segurança Inativo', 4000);
    }else{
      Materialize.toast('Erro na comunicação!', 4000);
    }

  });
}

});
//---------------------------------------------------FIM ACERTO-----------------------------------------------------------------
