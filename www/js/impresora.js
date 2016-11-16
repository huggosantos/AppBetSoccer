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
function printSomeTestText() {
 window.DatecsPrinter.printText("--------------------------------------------{br}",'ISO-8859-1', function(){} );
 window.DatecsPrinter.printText("{h}BETSOCCER{/h}{CENTER}{br}",'ISO-8859-1', function(){} );
 window.DatecsPrinter.printText("--------------------------------------------{br}",'ISO-8859-1', function(){} );
 for(var datas in vetorHora){
  window.DatecsPrinter.printText(toData(vetorHora[datas])+"{CENTER}",'ISO-8859-1',  function(){ });
  for(var camp in aux){
   window.DatecsPrinter.printText("{b}"+aux[camp]+"{/b}{CENTER}",'ISO-8859-1',  function(){ });
    for(var jg in jsonServidor.jogos){
      if(jsonServidor.jogos[jg].campeonato.descricao_campeonato==aux[camp] && jsonServidor.jogos[jg].data==vetorHora[datas]){
        window.DatecsPrinter.printText(vetorHora[datas]+" "+jsonServidor.jogos[jg].time[0].descricao_time+" {b}VS{/b} "+ jsonServidor.jogos[jg].time[0].descricao_time,'ISO-8859-1',  function(){ });
      }

    }

 }
}
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


  
