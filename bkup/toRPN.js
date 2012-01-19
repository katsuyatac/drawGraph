function get_priority(token){
  if(FUNCTION.test(token)){
    return(4);
  }
  switch(token){
    case "+": case "-": case ",":
      return(1);
    case "*": case "/":
      return(2);
    case "^":
      return(3);
    default:
      return(0);
  }
}

/* Reverse Polish Notation */
function to_rpn_freq(soce){
  var buffer = new Array();
  var stack = new Array();
  var token = "";
  var tmp = "";
  var sPriority = 0;
  var fPriority = 0;
  
  //console.log("to_rpn_freqIN: " + soce)
  if(soce === "NULL"){
    return("NULL");
  }

  while(token != "EOF"){
    token = soce.shift();
    if(token === "SOF"){
      continue;
    }
    if(token === "EOF"){
      while(stack.length != 0){
        tmp = stack.pop();
        buffer.push(tmp);
      }
    }
    else if(NUMBER.test(token) || VALIABLE.test(token) || VALUE.test(token)){
      buffer.push(token);
    }
    else if(token === ")"){
      tmp = stack.pop();
      while(tmp != "("){
        buffer.push(tmp);
        tmp = stack.pop();
      }
    }
    else if(token === "("){
      stack.push(token);
    }
    else{
      while(stack.length != 0){
        fPriority = get_priority(token);
        sPriority = get_priority(stack[stack.length - 1]);
        if(fPriority > sPriority){
          break;
        }
        tmp = stack.pop();
        buffer.push(tmp);
      }
      stack.push(token);
    }
  }
  //console.log("to_rpn_freqOUT: " + buffer)     
  return(buffer);
}

function sprit(soce){
  var token = "";
  var tmp = new Array();
  var result = new Array();

  token = soce.shift();
  while(token != "," && token != "EOF" && soce.length > 0){
    tmp.push(token);
    token = soce.shift();
  }
  tmp.push("EOF");
  tmp.push("EOF")
  result.push(tmp);
  if(token === "EOF"){
    result.push("NULL");
    return(result);
  }

  tmp = new Array();
  token = soce.shift();
  while(token != "EOF" && soce.length > 0){
    tmp.push(token);
    token = soce.shift();
  }
  tmp.push("EOF");
  result.push(tmp);
  return(result);
}


function to_rpn(soce){
  var tmp = new Array();
  var left = new Array();
  var right = new Array();
  var token = "";
  var result = new Array();

  tmp = sprit(soce);
  left = tmp[0];
  left = to_rpn_freq(left);
  result.push(left);

  right = tmp[1];
  right = to_rpn_freq(right);
  result.push(right);
  console.log("to_rpn: " + result)
  return(result);
}

