

// Controllers para pegar os dados por aposta dos cambistas
app.controller('teste', function($scope, $http, $route, $location) { 
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
});

app.controller('dadosPorAposta', function($scope, $http, $route, $location) { 
 $scope.mostrarLoader = function(){
  if($scope.aux==null || $scope.aux==false || $scope.aux==true){
   $scope.aux=false;   
   $scope.aux2=true;
 }
} 


$scope.buscarDadosPorAposta = function() {
  $http.get('http://betsoccer.club/public/aposta/premiosApostas/'+$scope.password).then(function(response) {
    $scope.dadosPorAposta = response.data;
    $scope.aux2=false;
    $scope.aux=true;
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
          toTop();
          $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });

          $(document).ready(function(){
            $('ul.tabs').tabs();
          });


        });

//------------------------------------------FIM DADOS POR APOSTA------------------------------------------------------------------------
