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

function get_range(soce){
  var range = new Array();
  var span = 0;

  if(true){//書き直す!!!
    span = Math.PI/4;
  }
  else{
    span = 0.001;
  }
  
  if(soce != "NULL"){
    range = calclation_freq(soce, 0);
  }
  else{
    if(triangle){
      range.push(Math.PI*(-4));
      range.push(Math.PI*4);
    }
    else{
      range.push(-50);
      range.push(50);
    }
  }
  range.push(span);
    return(range);
}

function calclation(read){
  var fx = new Array();
  var range = new Array();
  var flagValiable = false;
  var flagTriangle = false;
  var flagRange = false;

  fx = read[0];
  
  // fxに変数三角関数があるか調べる
  for(i = 0; i < fx.length && !flagValiable && !flagTriangle; i++){
    if(VARIABLE.test(fx[i])){
      flagValiable = true;
      continue;
    }
    if(TRIANGLE.teat(fx[i])){
      flagTriangle = true;
      continue;
    }
  }
  range = get_range(read[1], flagTriangle);
}
