function imprimirTodosJogos()
{
  window.DatecsPrinter.listBluetoothDevices(
    function (devices) {
      window.DatecsPrinter.connect(devices[0].address,printSomeTestText);
    },
    function (error) {
      swal(JSON.stringify(error));
    }
    );
}

function imprimirAposta()
{
  window.DatecsPrinter.listBluetoothDevices(
    function (devices) {
      window.DatecsPrinter.connect(devices[0].address,printSomeTestText2);
    },
    function (error) {
      swal(JSON.stringify(error));
    }
    );
}

function nomePapites(np){
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
  if(nome_palpites[np]=="min_gol_3"){
    vetorPalpitesCorretos="+2.5";
  } 
  if(nome_palpites[np]=="max_gol_2"){
    vetorPalpitesCorretos="-2.5";
  } 
  if(nome_palpites[np]=="ambas_gol"){
    vetorPalpitesCorretos="Ambas";
  }

  return vetorPalpitesCorretos;       
}

function toData(dateTime) {
var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time
var date = dateTime[0].split("-");
var dataFinal = date[2]+"/"+date[1]+"/"+date[0];
return dataFinal;   
}

function toHora(Time) {
var Time = Time.split(" ");//dateTime[0] = date, dateTime[1] = time
var time = Time[1].split(":");
var timeFinal = time[0]+":"+time[1];
return timeFinal;    
}

function printSomeTestText() {
 window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} );
 window.DatecsPrinter.printText("{b}{w}{h}BETSOCCER{/h}{/w}{/b}{CENTER}{br}",'ISO-8859-1', function(){} );
 var vetor;
 for(var datas in vetorHora){
  window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("{b}"+toData(vetorHora[datas])+"{CENTER}{/b}{br}",'ISO-8859-1', function(){});
  window.DatecsPrinter.printText("HORA  JOGO{br}",'ISO-8859-1', function(){});
  vetor=CampEmJogosPorData(vetorHora[datas]);
  for(var camp in vetor){
   window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} ); 
   window.DatecsPrinter.printText(vetor[camp]+"{CENTER}{br}",'ISO-8859-1',  function(){ });
   window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} );
   for(var jg in jsonServidor.jogos){
    if(jsonServidor.jogos[jg].campeonato.descricao_campeonato==vetor[camp] && toData(jsonServidor.jogos[jg].data)==toData(vetorHora[datas])){
      window.DatecsPrinter.printText(toHora("{b}"+vetorHora[datas])+"{/b}  {b}"+jsonServidor.jogos[jg].time[0].descricao_time+" VS {/b}{b}"+ jsonServidor.jogos[jg].time[1].descricao_time+"{/b}{br}",'ISO-8859-1',  function(){ });
      window.DatecsPrinter.printText("{s}Casa  Empate  Fora  Dupla  Gol1/2  +2.5  -2.5  Ambas {/s}{br}",'ISO-8859-1', function(){});
      window.DatecsPrinter.printText("{s}"+jsonServidor.jogos[jg].valor_casa.toFixed(2)+"   "+jsonServidor.jogos[jg].valor_empate.toFixed(2)+"   "+jsonServidor.jogos[jg].valor_fora.toFixed(2)+"   "+jsonServidor.jogos[jg].valor_dupla.toFixed(2)+"   "+jsonServidor.jogos[jg].valor_1_2.toFixed(2)+"   "+jsonServidor.jogos[jg].max_gol_2.toFixed(2)+"   "+jsonServidor.jogos[jg].min_gol_3.toFixed(2)+"   "+jsonServidor.jogos[jg].ambas_gol.toFixed(2)+"{/s}{br}",'ISO-8859-1', function(){});

    }

  }

}
}
window.DatecsPrinter.printText("{br}{br}{br}{br}{br}{br}",'ISO-8859-1', function(){} );
}


function printSomeTestText2() {
  window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("{b}{w}{h}BETSOCCER{/h}{/w}{/b}{CENTER}{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("{b}{w}COMPROVANTE{/w}{/b}{CENTER}{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("------------------------------------------------{br}{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("CÓDIGO APOSTA: {w}{b}"+jsonApostas.aposta.codigo+"{/b}{/w}{br}{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("DATA: "+toData(jsonApostas.aposta.created_at)+" AS "+toHora(jsonApostas.aposta.created_at)+" HRS{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("NOME APOSTADOR: {b}"+jsonApostas.aposta.nome_apostador+"{/b}{br}",'ISO-8859-1', function(){} );
  window.DatecsPrinter.printText("VALOR APOSTADO: {b}R$ "+jsonApostas.aposta.valor_aposta.toFixed(2)+"{/b}{br}RETORNO POSSIVEL: {w}{b}R$"+auxiliar.toFixed(2)+"{/b}{/w}{br}",'ISO-8859-1',  function(){ });

  for (var i in jogosIdAposta) {
    window.DatecsPrinter.printText("------------------------------------------------{br}",'ISO-8859-1', function(){} );
    window.DatecsPrinter.printText("{b}JOGO: "+casa[i]+" VS "+ fora[i]+"{/b}{br}",'ISO-8859-1',  function(){ });
    window.DatecsPrinter.printText("{b}PALPITE: {/b}"+nomePapites(i)+"{b}  VALOR PALPITE: {/b}"+palpites[i].toFixed(2)+"{br}",'ISO-8859-1',  function(){ });
  }
  window.DatecsPrinter.printText("{br}{br}{br}{br}{br}{br}",'ISO-8859-1', function(){} );
  location.reload();

}



function imprimirImagenDePrueba() 
{
  var imagen = document.getElementById("codigoDeBarrasFactura");
  var imageData = imagen.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
  window.DatecsPrinter.printImage(
    imageData, 
    canvas.width, 
    canvas.height, 
    1, 
    function() 
    {
      console.log('Impreso');
    },
    function (error) {
      swal(JSON.stringify(error)); 
    });
}
function printMyImage() {
  console.log("teste2");
  var image = new Image();
  image.src = 'img/logo.png';
  image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.height = 100;
    canvas.width = 100;
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
      var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype
      window.DatecsPrinter.printImage(
          imageData, //base64
          canvas.width, 
          canvas.height, 
          1, 
          function() {
            printMyBarcode();
          },
          function(error) {
            alert(JSON.stringify(error));
          }
          )
    };
  }

  function printMyBarcode() {
    window.DatecsPrinter.printBarcode(
    75, //here goes the barcode type code
    '13132498746313210584982011487', //your barcode data
    function() {
      alert('success!');
    },
    function() {
      alert(JSON.stringify(error));
    }
    );
  }


  
