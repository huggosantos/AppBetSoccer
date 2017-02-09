//Controler parar gerenciar tela onde o agente podera escolher entre compartilhar ou imprimir bet
app.controller('comprovante', function($scope, $http, $route, $location) { 

$scope.jsonComprovante=jsonApostas;
//console.log("comprovante"+jsonApostas.aposta.apostador);
  $scope.enviarWhatsApp = function(){
    html2canvas($('#print'),{
      onrendered: function(canvas) {
        var img = canvas.toDataURL();
          //window.open(img);
          window.plugins.socialsharing.shareViaWhatsApp('Sua Aposta no BETSOCCER',img, null , function () {alert( 'Aposta Compartilhada')}, function ( errormsg) {alert ("Erro ao tentar Compartilhar!")});
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
  for(var i in jsonApostas.palpites){
    if(ob==jsonApostas.palpites[i].jogos_id){
      var x = jsonApostas.palpites[i].palpite;
      return x;
    }
  }
}

$scope.retornaPalpite = function (ob){
console.log("ob"+ob);
  for(var i in jsonApostas.palpites){
    if(ob==jsonApostas.palpites[i].jogos_id){
      var x;
      if(jsonApostas.palpites[i].tpalpite=="valor_casa"){
        x="Casa";
        return x;
      }else if(jsonApostas.palpites[i].tpalpite=="valor_fora"){
        x="Fora";
        return x;
      } else if(jsonApostas.palpites[i].tpalpite=="valor_empate"){
        x="Empate";
        return x;
      } else if(jsonApostas.palpites[i].tpalpite=="valor_dupla"){
        x="Dupla";
        return x;
      } else if(jsonApostas.palpites[i].tpalpite=="valor_1_2"){
        x="Gol 1/2";
        return x;
      } else if(jsonApostas.palpites[i].tpalpite=="min_gol_3"){
        x="+2.5";
        return x;
      } else if(jsonApostas.palpites[i].tpalpite=="max_gol_2"){
        x="-2.5";
        return x;
      } else if(jsonApostas.palpites[i].tpalpite=="ambas_gol"){
        x="Ambas";
        return x;
      }
    }
  }
}
toTop();
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

});