
function suppliment(soce){
  var left = "";
  var right = "";
  var bar = 0;
  var result = new Array();

  right = soce.shift();
  while(right != "EOF"){
    left = right;
    right = soce.shift();
    
    if(left === "|"){
      bar++;
      if(bar % 2 === 0){
        left = ")";
      }
      else{
        left = "abs";
        soce.unshift(right);
        right = "(";
      }
    }

    if(right === "["){
      right = "floor";
      soce.unshift("(");
    }
    if( left === "]"){
      left = ")";
    }


    // "*"補間
    if((left === ")" || NUMBER.test(left) || VALUE.test(left) || VALIABLE.test(left))
        && (right === "(" || NUMBER.test(right) || VALUE.test(right) 
          || VALIABLE.test(right) || FUNCTION.test(right))){
      result.push(left);
      left = "*";
    }
    else if(left === "(" && right === "-"){
      result.push(left);
      left = "0";
    }
    result.push(left);

  }
  result.push("EOF");
  console.log("suppliment: " + result)
  return(result);
}

function revision(soce){
  var left = "";
  var right = "";
  var paren = 0;
  var flagP = false;
  var parenMem = new Array();
  var flagPMem = new Array();
  var result = new Array();

  right = soce.shift();
  while(left != "EOF"){
    left = right;
    right = soce.shift();
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
        right = soce.shift();
      }
      else{
        parenMem.push(paren);
        flagPMem.push(flagP);
        paren = 0;
        flagP = true;
        result.push(left);
        left = "(";
      }
    }
    // ")"補間
    else if(flagP && paren === 0
        && left != "SOF" && get_priority(left) < 2
        && (right === ")" || get_priority(right) === 1 || FUNCTION.test(right) || right === "EOF")){
      while(flagP && paren === 0){
        result.push(left);
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
      right = soce.shift();
    }
    result.push(left);
  }
  soce.unshift("SOF");
  console.log("revision: " + result)
  return(result);
}

function to_queue(soce){
  var buff = "";
  var sy = "";
  var queue = new Array("SOF");
  var triangle = false;
  var valiable = "";
  var result = new Array();

  sy = soce.charAt(0);
  for(i = 0; i < soce.length;){
    //console.log("sy= " + sy)
    buff = "";
    if(ALPHA.test(sy)){
      do{
        //console.log("alpha")
        buff += sy;
        if(buff === "x" || (buff === "t" && soce.charAt(i+1) != "a")){
          if(valiable === ""){
            valiable = buff;
          } 
          else{
            buff = valiable;
          }
          sy = soce.charAt(++i);
          break;
        }
        else if(VALUE.test(buff) || FUNCTION.test(buff)){
          if(TRIANGLE.test(buff)){
            triangle = true;
          }
          sy = soce.charAt(++i);
          break;
        }
        i++;
        sy = soce.charAt(i);
      } while(ALPHA.test(sy) && i < soce.length)
      queue.push(buff);
    }
    else if(NUMBER.test(sy)){
      do{
        //console.log("number")
        buff += sy;
        i++;
        sy = soce.charAt(i);
      } while(NUMBER.test(sy) && i < soce.length)
      queue.push(buff);
    }
    else{
      queue.push(sy);
      sy = soce.charAt(++i);
    }
  }
  queue.push("EOF");
  //console.log("to_queue: " + queue)
  return(queue);
}

function expression(soce){
  var buff = "";
  var sy = "";
  var cp = 0;

  /* "="まで読飛ばす */
  for(i = 0; i < soce.length; i++){
    if(soce.charAt(i) === "="){
      cp = i+1;
      break;
    }
  }

  for(i = cp; i < soce.length; i++){
    sy = soce.charAt(i);
    if(sy === " " || sy === "\n" || sy === "\t"){
      continue;
    }
    buff += sy;
  }     
  return(buff);
}

function analyze(soce){
  var result = new Array();

  soce = expression(soce);
  result = to_queue(soce);
  result = revision(result);
  result = suppliment(result);
  return(result);
}
