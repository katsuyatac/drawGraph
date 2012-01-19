var WIDTH = 800;
var HEIGHT = 640;
var width = WIDTH - 1;
var height = HEIGHT - 1;
var NUMBER = new RegExp("[0-9]+");
var ALPHA = new RegExp("[a-z]");
var VALUE = new RegExp("pi|^e$");
var VALIABLE = new RegExp("^x$|^t$");
var FUNCTION = new RegExp("sin|cos|tan|log|exp|abs|floor|abs");
var TRIANGLE = new RegExp("sin|cos|tan");

/* ページがロードされた時の処理 */
window.addEventListener("load", function(){
  graph = document.getElementById("graph");
  ctxG = graph.getContext('2d');
  console.log(FUNCTION.test("cei"))
  console.log(VALIABLE.test("cei"))
  console.log(VALUE.test("cei"))
  console.log(TRIANGLE.test("cei"))
}, false);


function check_triangle(soce){
  for(i = 0; i < soce.length; i++){
    if(TRIANGLE.test(soce[i])){
      return(true);
    }
  }
  return(false);
}

function check_valiable(soce){
  for(i = 0; i < soce.length; i++){
    if(VALIABLE.test(soce[i])){
      return(true);
    }
  }
  return(false);
}

function get_valiable(soce){
  token = "";
  for(i = 0; i < soce.length; i++){
    token = soce[i];
    //console.log(token)
    if(VALIABLE.test(token)){
      return(token);
    }
  }
  return("NULL");
}


