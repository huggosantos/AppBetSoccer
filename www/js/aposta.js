 app.controller('aposta', function($scope, $http, $routeParams, $location, $rootScope) {

    //recebe o valor da aposta
    $scope.enviarValor = function(){
      usarNaApostas =
      testeA = $scope.valor;
    }


    $scope.buscar = function() {
      $http.get('http://betsoccer.club/public/aposta').then(function(response) {
        // var json = JSON.stringify(response.data)
        // var json = JSON.parse(jso); 
        // window.localStorage.setItem("ArquivoServidor",response.data); 

        for (var k in response.data.jogos) {
          if (k == 0) {
            vetor.push(response.data.jogos[k].campeonato.descricao_campeonato);
          } else {
            if (!dadosCamp(vetor, response.data.jogos[k].campeonato.descricao_campeonato)) {
              vetor.push(response.data.jogos[k].campeonato.descricao_campeonato);
            }
          }
          if (k == 0) {
            vetorHora.push(response.data.jogos[k].data);
          } else {
            if (!dadosHora(vetorHora, toData(response.data.jogos[k].data))) {
              vetorHora.push(response.data.jogos[k].data);
            }
          }      
        }

        //Metodo que faz um split em string DataTime e retonar apenas a Data
        $scope.toData = function(dateTime) {

                var dateTime = dateTime.split(" "); //Cria um array com uma posição ["2016-07-10 12:40:10"]
                var date = dateTime[0].split("-"); //Separa A string aprtir do "-" Cria um Array com tres posições ["2016", "17", "10"]
                var dataFinal = date[2] + "/" +
                date[1] + "/" + date[0];
                return dataFinal; //Retona a data No Padrao Brasileiro ["10/17/2016"]
              }
            //Metodo que faz um split em string DataTime e retonar apenas a Hora
            $scope.toHora = function(dateTime) {
            var dateTime = dateTime.split(" "); //Cria um array com uma posição ["2016-07-10 12:40:10"]

            var time = dateTime[1].split(":"); //Separa a string aprtir do ":" Cria um Array com tres posições ["12", "40", "10"]
            var timeFinal = time[0] + ":" + time[1];

            return timeFinal; //Retona a hora descosiderando os segundos ["12:40"]

          }

        //Metodo para verifica se a data passada ja exite no vertorHora
        function dadosHora(vetorHora, dataTime) {
          for (var i in vetorHora) {
            if (toData(vetorHora[i]) == dataTime) {
              return true;
            }
          }
          return false;
        }
        /*
          Metodo que que recebe uma hora->DataTime e retornar um vetor com os campeonatos
          que tenha relação com algum jogo e a hora passada
          */
          $scope.CampEmJogos = function(hora) {
            aux = new Array();
            //Inteira pelos jogos quem vem do Web service
            for (var k in response.data.jogos) {
                //verifica se alum jogo.data e igual a data passada por paramentro
                if ($scope.toData(hora) == $scope.toData(response.data.jogos[k].data)) {
                    //vefica se esse se o campeonato não ja foi inserido no vertor
                    if (!dadosCamp(aux, response.data.jogos[k].campeonato.descricao_campeonato)) {
                        //Por fim insere no array o campeonato
                        aux.push(response.data.jogos[k].campeonato.descricao_campeonato);
                      }

                    }
                  }

                  return aux;
                };

                $scope.campeonatos = vetor;
                $scope.horas = vetorHora;
                $scope.aposta = response.data;
                jsonServidor = response.data;
        //window.localStorage.setItem("jsonServidor",response.data);
        //window.localStorage.setItem("todosCampeonatos",aux);
        //window.localStorage.setItem("todasDatas",vetorHora);

      }).catch(function(err){
       Materialize.toast('Erro na comunicação!', 4000);
     }

     );

    }

$scope.timeCasa=casa;
$scope.timeFora=fora;
$scope.palpiteNumero=palpites;

$scope.nomePapites= function(np){
  var vetorPalpitesCorretos;

  if(nome_palpites[np]=="valor_casa"){
    vetorPalpitesCorretos="Casa";
  }
  if(nome_palpites[np]=="valor_fora"){
    vetorPalpitesCorretos="Fora";
  } 
  if(nome_palpites[np]=="valor_empate"){
    vetorPalpitesCorretos="Empate";
  } 
  if(nome_palpites[np]=="valor_dupla"){
    vetorPalpitesCorretos="Dupla";
  } 
  if(nome_palpites[np]=="valor_1_2"){
    vetorPalpitesCorretos="Gol 1/2";
  } 
  if(nome_palpites[np]=="max_gol_2"){
    vetorPalpitesCorretos="-2.5";
  } 
  if(nome_palpites[np]=="min_gol_3"){
    vetorPalpitesCorretos="+2.5";
  } 
  if(nome_palpites[np]=="ambas_gol"){
    vetorPalpitesCorretos="Ambas";
  }

  return vetorPalpitesCorretos;       
}

$scope.tamanhoVetor = function(){
  var array = new Array();
  for(var i in  nome_palpites){
    array.push(i);
  }
  return array;
}
$scope.jsonApostasDinamicas = function(){
  var arrayJson= new Array();
  for(var i in  nome_palpites){
   var dadosAposta = JSON.stringify({
    casa: $scope.timeCasa[i],
    fora: $scope.timeFora[i],
    valorPalpite: $scope.palpiteNumero[i],
  });
   arrayJson.push(dadosAposta);
   console.log(arrayJson);
   console.log("dados Dina"+dadosAposta);
 }

 return arrayJson;
}
    toTop();// Rola a pagina pra cima

    // Ativa a função do modal na rota, função do materialize
    $(document).ready(function() {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();
      });

  });















 

