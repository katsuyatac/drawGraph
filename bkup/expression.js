function suppliment(fx){
  var left = "";
  var right = "";
  var result = new Array();

  right = fx.shift();
  while(right != "EOF"){
    left = right;
    right = fx.shift();
    // "*"補間
    if((left === ")" || NUMBER.test(left) || VALUE.test(left) || VALIABLE.test(left))
        && (right === "(" || NUMBER.test(right) || VALUE.test(right) 
          || VALIABLE.test(right) || FUNCTION.test(right))){
      fx.push(left);
      left = "*";
    }
    else if(left === "(" && right === "-"){
      fx.push(left);
      left = "0";
    }
    fx.push(left);

  }
  fx.push("EOF");
  result = fx;
  console.log("suppliment: " + result)
  return(result);
}

function revision(fx){
  var left = "";
  var right = "";
  var paren = 0;
  var flagP = false;
  var parenMem = new Array();
  var flagPMem = new Array();
  var result = new Array();

  right = fx.shift();
  while(left != "EOF"){
    left = right;
    right = fx.shift();
    if(left === "("){
      paren++;
    }
    if(left === ")"){
      paren--;
    }
    // "("補間
    if(((left === "SOF" || get_priority(left) === 1 || left === "^")
          && get_priority(right) === 1)
        || (FUNCTION.test(left) && right != "(")){
      if(right === "+"){
        right = fx.shift();
      }
      else{
        parenMem.push(paren);
        flagPMem.push(flagP);
        paren = 0;
        flagP = true;
        fx.push(left);
        left = "(";
      }
    }
    // ")"補間
    else if(flagP && paren === 0
        && left != "SOF" && get_priority(left) < 2
        && (right === ")" || get_priority(right) === 1 || FUNCTION.test(right) || right === "EOF")){
      while(flagP && paren === 0){
        fx.push(left);
        left = ")";
        paren = parenMem.pop();
        flagP = flagPMem.pop();
      }
    }
    // 連続演算子処理
    else if(get_priority(left) === 1 && get_priority(right) === 1){
      if(left === right){
        left = "+";
      }
      else{
        left = "-";
      }
      right = fx.shift();
    }
    fx.push(left);
  }
  fx.unshift("SOF");
  result = suppliment(fx);
  console.log("revision: " + result)
  return(result);
}

function to_queue(fx){
  var buff = "";
  var sy = "";
  var queue = new Array("SOF");
  var triangle = false;
  var valiable = "";
  var result = new Array();

  sy = fx.charAt(0);
  for(i = 0; i < fx.length;){
    //console.log("sy= " + sy)
    buff = "";
    if(ALPHA.test(sy)){
      do{
        //console.log("alpha")
        buff += sy;
        if(buff === "x" || (buff === "t" && fx.charAt(i+1) != "a")){
          if(valiable === ""){
            valiable = buff;
          } 
          else{
            buff = valiable;
          }
          sy = fx.charAt(++i);
          break;
        }
        else if(VALUE.test(buff) || FUNCTION.test(buff)){
          if(TRIANGLE.test(buff)){
            triangle = true;
          }
          sy = fx.charAt(++i);
          break;
        }
        i++;
        sy = fx.charAt(i);
      } while(ALPHA.test(sy) && i < fx.length)
      queue.push(buff);
    }
    else if(NUMBER.test(sy)){
      do{
        //console.log("number")
        buff += sy;
        i++;
        sy = fx.charAt(i);
      } while(NUMBER.test(sy) && i < fx.length)
      queue.push(buff);
    }
    else{
      queue.push(sy);
      sy = fx.charAt(++i);
    }
  }
  queue.push("EOF");
  result = revision(queue);
  console.log("to_queue" + result)
  return(result);
}

function expression(fx){
  var buff = "";
  var sy = "";
  var cp = 0;
  var result = new Array();

  /* "="まで読飛ばす */
  for(i = 0; i < fx.length; i++){
    if(fx.charAt(i) === "="){
      cp = i+1;
      break;
    }
  }

  for(i = cp; i < fx.length; i++){
    sy = fx.charAt(i);
    if(sy === " " || sy === "\n" || sy === "\t"){
      continue;
    }
    buff += sy;
  }     
  result = to_queue(buff);
  return(result);
}
