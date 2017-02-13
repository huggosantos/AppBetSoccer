//----------Controller que faz a validação das apostas feitas pelo app cliente.------------------------------
app.controller('validarAposta', function($scope, $http, $route, $location) { 

  $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });

  $scope.toData = function(dateTime) {  
  var dateTime = dateTime.split(" "); //Cria um array com uma posição ["2016-07-10 12:40:10"]
  var date = dateTime[0].split("-"); //Separa A string aprtir do "-" Cria um Array com tres posições ["2016", "17", "10"]
  var dataFinal = date[2] + "/" +
  date[1];
  return dataFinal; //Retona a data No Padrao Brasileiro ["10/17/2016"]
}
 //Metodo que faz um split em string DataTime e retonar apenas a Hora
 $scope.toHora = function(dateTime) {
  var dateTime = dateTime.split(" "); //Cria um array com uma posição ["2016-07-10 12:40:10"]
  var time = dateTime[1].split(":"); //Separa a string aprtir do ":" Cria um Array com tres posições ["12", "40", "10"]
  var timeFinal = time[0] + ":" + time[1];
  return timeFinal; //Retona a hora descosiderando os segundos ["12:40"]
}

$scope.mostrarLoader = function(){
  if($scope.aux==null || $scope.aux==false || $scope.aux==true){
   $scope.aux=false;   
   $scope.aux2=true;
 }
}

$scope.validar = function() {
  var dadosAposta = JSON.stringify({
    codigo_aposta: $scope.codAposta,
    codigo_seguranca: $scope.codSeguranca
  });
  $http({
    url: 'http://betsocceroficial.herokuapp.com/aposta/validar',
    method: 'PUT',
    data: dadosAposta,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).
  success(function(resposta) {
    $scope.aux2=false;
    $scope.aux=false;
    Materialize.toast('Aposta foi validada com Sucesso', 6000);
  }).
  error(function(err) {
    $scope.aux2=false;
    $scope.aux=false;
    if(err.status==400){
      Materialize.toast('Usuário Inexistente', 4000);
    }else if(err.status==401){
     Materialize.toast('Usuário inátivo', 4000);
   }else if(err.status==403){
    Materialize.toast('Código da Aposta não encontrado', 4000);
  }else if(err.status==406){
   Materialize.toast('Aposta Já Ativa', 4000);
 }else{
  Materialize.toast('Erro na comunicação!', 4000);
}

});
}

var aptStatus;
$scope.BuscarAposta = function() {
  $http.get('http://betsoccer.club/public/aposta/consultar/'+$scope.codAposta).then(function(response) {
    $scope.aux2=false;
    $scope.aux=true;
    $scope.ApostaStatus = response.data;
    aptStatus = response.data;
  }).catch(function(err) {
    $scope.aux2=false;
    $scope.aux=false;
    if(err.status==403){
      Materialize.toast('Código não encontrado', 4000);
    }else{
      Materialize.toast('Erro na comunicação!', 4000);
    }

  });
}


$scope.verificaStatusAposta = function(statusAposta){
  if(statusAposta==true){
    return "Valida";
  }else{
    return "Aguardando Validação";
  }
}

$scope.apostaVencedora = function(statusAposta){
  if(statusAposta==true){
    return "Sim";
  }else{
    return "Não";
  }
}


$scope.retornaValorPalpite = function(ob){
  for(var i in aptStatus.palpites){
    if(ob==aptStatus.palpites[i].jogos_id){
      var x = aptStatus.palpites[i].palpite;
      return x;
    }
  }
}

$scope.retornaPalpite = function (ob){

  for(var i in aptStatus.palpites){
    if(ob==aptStatus.palpites[i].jogos_id){
      var x;
      if(aptStatus.palpites[i].tpalpite=="valor_casa"){
        x="Casa";
        return x;
      }else if(aptStatus.palpites[i].tpalpite=="valor_fora"){
        x="Fora";
        return x;
      } else if(aptStatus.palpites[i].tpalpite=="valor_empate"){
        x="Empate";
        return x;
      } else if(aptStatus.palpites[i].tpalpite=="valor_dupla"){
        x="Dupla";
        return x;
      } else if(aptStatus.palpites[i].tpalpite=="valor_1_2"){
        x="Gol 1/2";
        return x;
      } else if(aptStatus.palpites[i].tpalpite=="min_gol_3"){
        x="+2.5";
        return x;
      } else if(aptStatus.palpites[i].tpalpite=="max_gol_2"){
        x="-2.5";
        return x;
      } else if(aptStatus.palpites[i].tpalpite=="ambas_gol"){
        x="Ambas";
        return x;
      }
    }
  }
}
toTop();

});
//--------------------------FIM VALIDAÇÂO DE CODIGO DE APOSTA DO APP CLIENT-------------------------------------------------
