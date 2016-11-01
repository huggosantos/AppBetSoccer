function imprimirFactura()
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
  alert("TestPrin");
  window.DatecsPrinter.printText("IMPRIMI POHHA",'ISO-8859-1', 
    function() {
      printMyImage();
    }
    );
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


  
