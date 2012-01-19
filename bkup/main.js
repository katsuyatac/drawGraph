
function main(soce){
  var result = new Array();
  var fx = new Array(); //RPN記法に変換したfx
  var range = new Array(); // 定義域(xMin, xMax, span)
  var coord = new Array(); // 計算結果の座標(x, y)
  var flagT = false;
  var flagV = false;
  var valiable = "NULL";

  result = analyze(soce);
  result = to_rpn(result);
  fx = result[0];
  range = result[1];

  flagT = check_triangle(fx);
  if(check_valiable(fx)){
    valiable = get_valiable(fx);
  }
    
  console.log("flagT = " + flagT)
  console.log("valiable = " + valiable)
  result = calclation(fx, range);
  coord.push(result[0]);
  coord.push(result[1]);
  range = result[2];

   draw(coord, range, flagT, valiable); 

  //console.log("main: " + fx)
  //console.log("main: " + range)
}

function test(v){
  switch(v){
    case 1:
      console.log("call main: tanxcosx, (-2pi, 2pi)")
      main("sinxcosx, (-2pi, 2pi)");
      break;
    case 2:
      console.log("call main: tanxcosx")
      main("tantcost");
      break;
    case 3:
      console.log("call main: 3x^2-4x+2, (-3, 5)")
      main("3x^2-4x+2, (0, 5)");
      break;
    case 4:
      console.log("call main: 3x^2-4x+2")
      main("3x^2-4x+2");
      break;
    default:
      console.log("call main: tanxcosx, (-2pi, 2pi)")
      main("sinxcosx, (-2pi, 2pi)");
      console.log("---------------------------------------------------")
      
      console.log("call main: tantcost")
      main("tantcost");
      console.log("---------------------------------------------------")
      
      console.log("call main: 3x^2-4x+2, (0, 5)")
      main("3x^2-4x+2, (0, 5)");
      console.log("---------------------------------------------------")
      
      console.log("call main: 3x^2-4x+2")
      main("3x^2-4x+2");
      console.log("---------------------------------------------------")
  }
}
