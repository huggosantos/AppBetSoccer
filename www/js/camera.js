
function capturarImagem(){
 navigator.camera.getPicture(onSuccess, onFail,
 {
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.CAMERA
}
);
}

function onSuccess(imageURL) {
    var image = document.getElementById('htmlImagem');
    //image.src = btoa(imageURL);

   //image.src = "data:image/jpeg;base64," + imageURL;
   //imgEnviar = image.src;
  // alert(imgEnviar);
              // var imgEnviar = JSON.stringify(imageURL); 
//alert(imageURL);
 //alert(imageURL);
    //alert("Save Into Local Storage");
    //Save into local storage
    window.localStorage.setItem("chave",imageURL);
    //alert("DONE");
   //alert(window.localStorage.getItem("chave"));
             //var imgEnviar = imageURL;
               //console.log(imgEnviar);
           }

           function onFail(message) {
            alert('bug: ' + message);
        }
/*
var teste = "helow";
  var encodedString = btoa(teste);
console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
var decodedString = atob(encodedString);
console.log(decodedString); // Outputs: "Hello World!"
 */