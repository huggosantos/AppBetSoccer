    var app = angular.module('MyApp', ['ngRoute']);

    app.config(function($routeProvider) {
      /*ROTAS*/
      $routeProvider
      .when('/aposta', {
        templateUrl: 'paginas/aposta.html',
        controller: 'aposta'
      })
      .when('/dadosCambista', {
        templateUrl: 'paginas/dadosCambista.html',
        controller: 'dadosCambista'
      })
      .when('/dadosPorAposta', {
        templateUrl: 'paginas/dadosPorAposta.html',
        controller: 'dadosPorAposta'
      })
      .when('/imprimirUltima', {
        templateUrl: 'paginas/imprimirUltima.html',
        controller: 'imprimirUltima'
      })
      .when('/acertoCambista', {
        templateUrl: 'paginas/acertoCambista.html',
        controller: 'acertoCambista'
      })
      .when('/validarAposta', {
        templateUrl: 'paginas/validarAposta.html',
        controller: 'validarAposta'
      })
      .when('/comprovante', {
        templateUrl: 'paginas/comprovante.html',
        controller: 'comprovante'
      })
      .otherwise('/aposta', {
        templateUrl: 'paginas/aposta.html',
        controller: 'aposta'
      });
    }).run(function() {
    //remove 300ms delay touch
    //FastClick.attach(document.body);
  });

    function toTop() {
      $('html, body').animate({
        scrollTop: 0
      }, 800, 'linear');
    }

var vetor = new Array(); //Vetor de Campeonatos Total
var vetorHora = new Array(); //Vetor com as datas Dos jogos
var aux = new Array(); //Vetor que armazera o camponatos Teporariamente/ Camp que estjam relacionados com uma data e jogo em comum
var jsonServidor;
var jogosIdAposta = new Array(); //Vetor para armazenar os id dos jogos que apostado
var palpites = new Array(); //Vetor para armezenar os palpites selecionados
var nome_palpites = new Array(); //Vetor para armazenar os nome do palpites Exemplo Casa Fora Empate
var casa = new Array(); //Array que armazena o nome do time da casa
var fora = new Array(); //Array que armazena o nome do time visitante
var contador = 0; //Contador para gerenciar o indece do vetores ->>palpite,jogoIdAposta,nome_palpites,casa,fora
//Vetor que armazena os tipo de aposta
var tpapites = ["valor_casa", "valor_fora", "valor_empate", "valor_dupla", "valor_1_2", "max_gol_2", "min_gol_3", "ambas_gol"];
var auxiliar=0; //recebe o valor da aposta para mostrar na view
var testeA=0; //recebe o valor da aposta
var copiaJsonAposta;
var jsonApostas;

var datasJogos = new Array();// vetor que guarda as datas dos jogos das apostas;
var ultimaAposta;//variavel q guarda a ultima aposta do cambista;



app.controller('controlCollapseible', function($scope, $http, $route, $location, $rootScope) {
  $(document).ready(function() {
    $('.collapsible').collapsible();
  });
  var allRadios = new Array();

    //Metodo que verifica no jogo o nome do palpite a parte do valor passado.
    //params j = jogo Obejeto  | p=palpite Double
    function nomePapite(j, p) {
        //intera dentro do vetor com os tipo de palpites
        for (var i in tpapites) {
            //compara o valor do jogo na possição dos palpites e verifica se e igual o valor do palpite passado
            if (j[tpapites[i]] == p) {
                //Retonar um tipo de palpite Exemplo valor_casa / valor_fora
                return tpapites[i];
              }
            }
          }
          $scope.jogosContem = function(){
            if(response.data.jogos[0]==null ||response.data.jogos[0]== undefined){
              return true;
            }else{ 
              return false;
            }
          }

      // Função para deschecar um radio
    // Adicionar ou remover dados das aposta dos arrays de acordo com os radios.
    $scope.check = function(event,j, p) {

      var teste = event.currentTarget.id;
      var np = teste.split("@");
        //console.log(teste2[0]+" "+teste2[1]+" "+teste);
        //Pega a classe do inpunt clicado
        var classe = event.currentTarget.className;
        //Pega todos inputs da mesma classe do input clicado
        var elems = document.getElementsByClassName(event.currentTarget.className);
        //salva o estado atual do input passado
        var currentState = event.currentTarget.checked;        
        var elemsLength = elems.length;

        for(i=0; i<elemsLength; i++)
        {
          if(elems[i].type === "checkbox")
          {
            elems[i].checked = false;   
          }
        }
        if (currentState == false) {
          var indice = jogosIdAposta.indexOf(j.id);
            //Pega o indice do jogo atual
            allRadios.splice(indice,1);
            datasJogos.splice(indice, 1);
            jogosIdAposta.splice(indice, 1); //Remove id do jogo na possição indice
            palpites.splice(indice, 1); //Remove palpite do jogo na possição indice
            nome_palpites.splice(indice, 1); //Remove Tpalpite do jogo na possição indice
            casa.splice(indice, 1); //Remove o time da casa na possição indice
            fora.splice(indice, 1); //Remove o time visitante do jogo na possição indice 
            contador--; //Decremento o contator usando em todos o arrays
          } else if(allRadios.indexOf(classe) == -1) {
            //console.log("2---"+allRadios.indexOf(classe));            
            datasJogos[contador]= j.data;
            jogosIdAposta[contador] = j.id;
            palpites[contador] = p;
            casa[contador] = j.time[0].descricao_time;
            fora[contador] = j.time[1].descricao_time;
            nome_palpites[contador] = np[0];
            allRadios[contador] = classe;
            contador++;
          }else if(allRadios.indexOf(classe) != -1){            
            var indice = jogosIdAposta.indexOf(j.id);
            datasJogos[indice]= j.data;
            jogosIdAposta[indice] = j.id;
            palpites[indice] = p;
            casa[indice] = j.time[0].descricao_time;
            fora[indice] = j.time[1].descricao_time;
            nome_palpites[indice] = np[0];
          }
          event.currentTarget.checked = currentState;
        }
    //Verifica palpites com valor padrao escolhoido para desabilitar
    $scope.verificaPalpite = function(valor){
      if(valor<=1){
        return true;
      }else{ 
        return false;
      }
    }
    // verifica se o valor é o padrao escolhido pelo servidor  e coloca traço
    $scope.PalpiteColocarTraco = function(valor){
      if(valor<=1){
        var traco="-----";
        return traco;
      }else{ 
        return valor;
      }
    }
    /*Metodo que controla o Json que será enviado ao servidor
      parametros -> j = id_jogos | p = palpite double | t = tipo de palpite string 
      parametros -> c = descrição_time visitante  String | f = descricao_time visitante String
      */
      $scope.montarJsonServidor = function(j, p, t) {
        var dadosAposta = JSON.stringify({
          codigo_seguranca: $scope.password,
          valor_aposta: $scope.valor,
          nome_apostador: $scope.nome,
          jogo: j,
          valorPalpite: p,
          tpalpite: t
        });

        console.log("dados "+dadosAposta);
        return dadosAposta;
      }

    //Metodo que envia um json para o servidor com os dados das aposta.
    $scope.enviar = function() {
      var json = $scope.montarJsonServidor(jogosIdAposta, palpites, nome_palpites);
      $http({
        url: 'http://betsocceroficial.herokuapp.com/aposta/apostar',
        method: 'POST',
        data: json,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).
      success(function(resposta) {
       // Materialize.toast('Aposta realizada Com Sucesso', 4000);
       jsonApostas = resposta;
        //console.log(jsonApostas);
        //imprimirAposta();
        $location.path("/comprovante");
        Materialize.toast('Aposta realizada Com Sucesso', 4000);
      }).
      error(function(data) {
        Materialize.toast('Erro na comunicação!', 4000);
        $scope.error = true;

      });

    }
    var contAux;
    $scope.re = function retornoPossivel(){
      auxiliar=testeA;
      for (var k in palpites) {
        auxiliar = auxiliar * palpites[k];           
      }
      return auxiliar.toFixed(2);
    }

  });



   

    function dadosCamp(vetor, valor) {
      for (var i in vetor) {
        if (vetor[i] == valor) {
          return true;
        }
      }
      return false;
    }

    function CampEmJogosPorData(hora) {
      aux = new Array();
    //percorre
    for (var k in jsonServidor.jogos) {
        //console.log("--------------------");
        if (toData(hora) == toData(jsonServidor.jogos[k].data)) {
            //console.log("Json data -> "+response.data.jogos[k].data);
            if (!dadosCamp(aux, jsonServidor.jogos[k].campeonato.descricao_campeonato)) {
              aux.push(jsonServidor.jogos[k].campeonato.descricao_campeonato);
            }
            //console.log("Camp Aux -> "+aux);
          }
        }
        return aux;
      };



      app.elememt(document).ready(function() {
        alert("entrei");
        window.broadcaster.addEventListener("DatecsPrinter.connectionStatus", function(e) {
          if (e.isConnected) {
            alert('connect impress');
          }
        });
      });
