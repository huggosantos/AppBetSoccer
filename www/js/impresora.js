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
    if(jsonServidor.jogos[jg].campeonato.descricao_campeonato==vetor[camp] && jsonServidor.jogos[jg].data==vetorHora[datas]){
      window.DatecsPrinter.printText(toHora("{b}"+vetorHora[datas])+"  "+jsonServidor.jogos[jg].time[0].descricao_time+" VS "+ jsonServidor.jogos[jg].time[1].descricao_time+"{/b}{br}",'ISO-8859-1',  function(){ });
      window.DatecsPrinter.printText("{s}Casa  Empate  Fora  Dupla  Gol1/2  +2.5  -2.5  Ambas {/s}{br}",'ISO-8859-1', function(){});
      window.DatecsPrinter.printText("{s}"+jsonServidor.jogos[jg].valor_casa+"   "+jsonServidor.jogos[jg].valor_empate+"    "+jsonServidor.jogos[jg].valor_fora+"    "+jsonServidor.jogos[jg].valor_dupla+"    "+jsonServidor.jogos[jg].valor_1_2+"    "+jsonServidor.jogos[jg].max_gol_2+"    "+jsonServidor.jogos[jg].min_gol_3+"    "+jsonServidor.jogos[jg].ambas_gol+"{/s}{br}",'ISO-8859-1', function(){});
       
    }

  }

}
}
window.DatecsPrinter.printText("{br}{br}{br}{br}{br}{br}",'ISO-8859-1', function(){} );
}

function printSomeTestText2() {
  var jogo=window.localStorage.getItem("jsonServidor");
  var campeonatos=window.localStorage.getItem("todosCampeonatos");
  var datas=window.localStorage.getItem("todasDatas");
  for(var k in jogo){
   window.DatecsPrinter.printText(jogo.jogos[k].campeonato.descricao_campeonato,'ISO-8859-1', function() { 
    alert("Impreso");
  },function() { 
    alert("Erro ao Imprimir");}
    );
 }
 alert("TestPrin"+jogo.jogos[1].campeonato.descricao_campeonato);

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


  
