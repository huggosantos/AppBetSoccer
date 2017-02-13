// Controller para fazer a impressão da ultima aposta realizada pelo agente
app.controller('imprimirUltima', function($scope, $http, $route, $location) { 
 $scope.mostrarLoader = function(){
  if($scope.aux==null || $scope.aux==false || $scope.aux==true){
   $scope.aux=false;   
   $scope.aux2=true;
 }
}
$scope.imprimirUltimaAposta = function() {
  $http.get('http://betsoccer.club/public/aposta/ultima/'+$scope.password).then(function(response) {
    $scope.ultimaAposta = response.data;
    ultimaAposta=response.data;
      /*for (var i in ultimaAposta.aposta.jogos) {
        console.log(i)
          console.log(ultimaAposta.cambista);
          console.log(ultimaAposta.aposta.jogos[i].data);
          console.log(ultimaAposta.aposta.jogos[i].data);
          console.log(ultimaAposta.aposta.jogos[i].times[0].descricao_time);
          console.log(ultimaAposta.aposta.jogos[i].times[1].descricao_time);
          console.log(ultimaAposta.palpites[i].tpalpite); 
          console.log(ultimaAposta.palpites[i].palpite);
      }
      */imprimirUltimaApostaCambista();
      $scope.aux2=false;
      $scope.aux=true;
    }).catch(function(err) {
      $scope.aux2=false;
      $scope.aux=true;
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
//----------------------------------------------FIM ULTIMA APOSTA-------------------------------------------------------------------------
