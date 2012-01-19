
function main(soce){
  var result = new Array();
  var fx = new Array();
  var range = new Array();
  var coord = new Array();

  result = analyze(soce);
  result = to_rpn(result);
  fx = result[0];
  range = result[1];

  console.log("main: " + fx)
  console.log("main: " + range)
}
