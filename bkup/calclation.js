
function calclation_freq(fx, v){
  var stack = new Array();
  var tmp = "";
  var left = 0;
  var right = 0;
  var coord = new Array();

  for(i = 0; i < fx.length; i++){
    tmp = fx[i];
    switch(tmp){
      // 演算子
      case "+":
        right = stack.pop();
        left = stack.pop();
        stack.push(left + right);
        break;
      case "-":
        right = stack.pop();
        left = stack.pop();
        stack.push(left - right);
        break;
      case "*":
        right = stack.pop();
        left = stack.pop();
        stack.push(left * right);
        break;
      case "/":
        right = stack.pop();
        left = stack.pop();
        stack.push(left / right);
        break;
      case "^":
        right = stack.pop();
        left = stack.pop();
        stack.push(Math.pow(left, right));
        break;
      case ",":
        right = stack.pop();
        left = stack.pop();
        coord.push(Math.min(left, right));
        coord.push(Math.max(left, right));
        return(coord);
      // 関数
      case "sin":
        left = stack.pop();
        stack.push(Math.sin(left));
        break;
      case "cos":
        left = stack.pop();
        stack.push(Math.cos(left));
        break;
      case "tan":
        left = stack.pop();
        stack.push(Math.tan(left));
        break;
      case "log":
        left = stack.pop();
        stack.push(Math.log(left));
        break;
      case "exp":
        left = stack.pop();
        stack.push(Math.EXP(left));
        break;
      case "floor":
        left = stack.pop();
        stack.push(Math.floor(left));
        break;
      case "abs":
        left = stack.pop();
        stack.push(Math.abs(left));
        break;
      // 変数
      case "x": case "t":
        stack.push(Number(v));
        break;
      // 定数
      case "pi":
        stack.push(Math.PI);
        break;
      case "e":
        stack.push(Math.E);
        break;
      // 数値
      default:
        stack.push(Number(tmp));
        break;
    }
  }
  result = stack.pop();
  return(result);
}

function get_range(soce, range){
  var result = new Array();
  var span = 0;
  var flagT = false;
  
  flagT = check_triangle(soce);
  if(range != "NULL"){
    result = calclation_freq(range, 0);
  }
  else{
    if(flagT){
      result.push(Math.PI * (-3));
      result.push(Math.PI * 3);
    }
    else{
      result.push(-10);
      result.push(10);
    }
  }
  if(flagT){
    span = Math.PI / 3000;
  }
  else{
    span = 0.001;
  }
  result.push(span);
  return(result);
}

function prepare(soce, xMin, xMax, span){
  var x = 0;
  var y = 0;
  var flagV = false;
  var result = new Array();
  var xResult = new Array();
  var yResult = new Array();

  flagV = check_valiable(soce);
  if(flagV){
    for(x = xMin; x < xMax; x+= span){
      x = Math.round(x*1000)/1000;
      y = calclation_freq(soce, x);
      if(isNaN(y)){
        continue;
      }
      if(xResult.length > 0 
        && Math.abs(x - xResult[xResult.length - 1]) > (span + span / 10)){
        if(x > 0){
          console.log("no push")
          continue;
        }
        else{
          xResult.pop();
          yResult.pop();
          console.log("delete")
        }
      }
      xResult.push(x);
      yResult.push(y);
    }
  }
  else{
    y = calclation(soce, 0);
    if(!isNaN(y)){
      xResult.push(0);
      yResult.push(y);
    }
  }
  result.push(xResult);
  result.push(yResult);
  return(result);
}
    

function calclation(soce, range){
  var xMin = 0;
  var xMax = 0;
  var span = 0;
  var result = new Array();

  range = get_range(soce, range);
  xMin = range[0];
  xMax = range[1];
  span = range[2];

  result = prepare(soce, xMin, xMax, span);
  result.push(range);

  //console.log("x: " + result[0].length)
  //console.log("y: " + result[1].length)
  //console.log("range: " + result[2])

  return(result);
  
}
