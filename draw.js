function draw_graph(coord){
  var x = 0;
  var y = 0;
  ctxG.strokeStyle = '#000099';
  ctxG.beginPath();
  for(i = 0; i < coord[0].length; i++){
    x = coord[0][i];
    y = coord[1][i];
    if(i > 0 && (Math.abs(y - coord[1][i - 1]) > HEIGHT)){
      ctxG.moveTo(x, y);
    }
    else{
      ctxG.lineTo(x, y);
    }
  }
  ctxG.stroke();
}

function draw_axis(x0, y0, xMag, yMag, flagT, valiable){
  var xCheck = 0;
  var xInterval = 0;
  var yInterval = 0;

  ctxG.strokeStyle = '#008000';
  ctxG.strokeRect(0, 0, WIDTH, HEIGHT);
  // 軸の描画
  ctxG.strokeStyle = '#000000';
  ctxG.beginPath();
  // y軸
  ctxG.moveTo(x0,height);
  ctxG.lineTo(x0,1);
  ctxG.lineTo(x0-7,10);
  ctxG.moveTo(x0,1);
  ctxG.lineTo(x0+7,10);
  // x軸
  ctxG.moveTo(1,y0);
  ctxG.lineTo(width,y0);
  ctxG.lineTo(width-10,y0-7);
  ctxG.moveTo(width,y0);
  ctxG.lineTo(width-10,y0+7);
  ctxG.stroke();
  
  // 目盛り
  yInterval = 0.5;
  if(flagT){
    xCheck = Math.PI;
    xInterval = xCheck / 4;
  }
  else{
    xCheck = 1;
    xInterval = 0.5;
  }

  ctxG.font = "8pt 'Arial'";
  ctxG.beginPath();
  // y軸目盛り
  for(i = yInterval; y0-i*yMag > 10 || y0+i*yMag < height; i+=yInterval){
    if(i % 1 === 0){
      ctxG.moveTo(x0 - 6, y0 - i * yMag);
      ctxG.lineTo(x0 + 6, y0 - i * yMag);
      ctxG.moveTo(x0 - 6, y0 + i * yMag);
      ctxG.lineTo(x0 + 6, y0 + i * yMag);
      if(i === 1 || i % 5 === 0){
        ctxG.fillText(i, x0 + 7, y0 - i * yMag + 3);
        ctxG.fillText(-i, x0 + 7, y0 + i * yMag + 5);
      }
    }
    else{
      ctxG.moveTo(x0 - 3, y0 - i * yMag);
      ctxG.lineTo(x0 + 3, y0 - i * yMag);
      ctxG.moveTo(x0 - 3, y0 + i * yMag);
      ctxG.lineTo(x0 + 3, y0 + i * yMag);
    }
  }
  // x軸目盛り
  for(i = xInterval, count = 1, j = 0; x0-j*xMag > 0 || x0+j*xMag < width-10; i+= xInterval, j+=xInterval){
      if(i % xCheck < 0.001){
        ctxG.moveTo(x0 + i * xMag, y0 - 6);
        ctxG.lineTo(x0 + i * xMag, y0 + 6);
        ctxG.moveTo(x0 - i * xMag, y0 - 6);
        ctxG.lineTo(x0 - i * xMag, y0 + 6);
        if(xCheck === 1 && (i === 1 || i % 5 === 0)){
          ctxG.fillText(i, x0 + i * xMag - 3, y0 + 17);
          ctxG.fillText(-i, x0 - i * xMag - 3, y0 + 17);
        }
        if(xCheck === Math.PI && (i % Math.PI < 0.001 || i === Math.PI)){
          if(i === Math.PI){
            ctxG.fillText("pi", x0 + xCheck * xMag - 3, y0 + 17);
            ctxG.fillText("-pi", x0 - xCheck * xMag - 5, y0 + 17);
          }
          else{
            ctxG.fillText(count + "pi", x0 + i * xMag - 3, y0 + 17);
            ctxG.fillText(-count + "pi", x0 - i * xMag - 5, y0 + 17);
          }
          count += 1;
        }
      }
      else{
        ctxG.moveTo(x0 + i * xMag, y0 - 3);
        ctxG.lineTo(x0 + i * xMag, y0 + 3);
        ctxG.moveTo(x0 - i * xMag, y0 - 3);
        ctxG.lineTo(x0 - i * xMag, y0 + 3);
      }
  }
  ctxG.stroke();

  //軸の名前、原点のプロット
  ctxG.fillText("0", x0 - 13, y0 + 15);
  ctxG.fillText("f(" + valiable + ")", x0 - 20, 20);
  ctxG.fillText(valiable, width - 15, y0 - 10);
}
 
function re_calc(coord, x0, y0, xMag, yMag){
  var x = 0;
  var y = 0;
  var xResult = new Array();
  var yResult = new Array();
  var result = new Array();

  for(i = 0; i < coord[0].length; i++){
    x = coord[0][i];
    y = coord[1][i];
    x = x0 + x * xMag;
    if(y === Number.POSITIVE_INFINITY){
      y = 0;
    }
    else if(y === Number.NEGATIVE_INFINITY){
      y = HEIGHT;
    }
    else{
      y = y0 - y * yMag;
    }
    xResult.push(x);
    yResult.push(y);
  }
  result.push(xResult);
  result.push(yResult);
  return(result);
}

function adjust(coord, range){
  var margin = 50;
  var x0 = WIDTH / 2;
  var y0 = HEIGHT / 2;
  var dx = 0;
  var dy = 0;
  var xMag = 1;
  var yMag = 1;
  var xMax = 0;
  var xMin = 0;
  var yMax = 0;
  var yMin = 0;
  var result = new Array();

  /* 移動方向を求める */
  // x軸方向
  xMin = coord[0][0];
  xMax = coord[0][coord[0].length - 1];
  
  if(xMax < 0){
    dx = xMin / 2;
    xMag = (width - margin) / xMin;
  }
  else if(xMin > 0){
    dx = xMax / 2;
    xMag = (width - margin) / xMax;
  }
  else {
    dx = (xMin + xMax) / 2;
    if((xMax - xMin) != 0){
      xMag = (width - margin) / Math.abs(xMax - xMin);
    }
  }

  if(xMag > 150){
    xMag = 150;
  }
  if(xMag < 30){
    xMag = 30;
  }

  x0 -= (dx * xMag);
  if(x0 < margin){
    x0 = margin;
  }
  if(x0 > width - margin){
    x0 = width - margin;
  }

  // y軸方向
  yMax = coord[1][0];
  yMin = coord[1][0];
  for(i = 0; i < coord[0].length; i++){
    if(coord[1][i] === Number.POSITIVE_INFINITY
      || coord[1][i] === Number.NEGATIVE_INFINITY){
      continue;
    }
    if(yMax < coord[1][i]){
      yMax = coord[1][i];
    }
    if(yMin > coord[1][i]){
      yMax = coord[1][i];
    }
  }

  if(yMax < 0){
    dy = yMin / 2;
    yMag = (height - margin) / yMin;
  }
  else if(yMin > 0){
    dy = yMax / 2;
    yMag = (height - margin) / yMin;
  }
  else{
    if((yMag - yMin) != 0){
      yMag = (height - margin) / (Math.abs(yMin - yMin));
    }
  }

  if(yMag > 100){
    yMag = 100;
  }
  if(yMag < 30){
    yMag = 30;
  }

  y0 += (dy * yMag);
  if(y0 < margin){
    y0 = margin;
  }
  if(y0 > height - margin){
    y0 = height - margin;
  }

  result.push(x0);
  result.push(y0);
  result.push(xMag);
  result.push(yMag);
  console.log("adjust: " + result)
  return(result);
}

function draw(coord, range, flagT, valiable){
  var tmp = new Array();
  var x0 = 0;
  var y0 = 0;
  var xMag = 1;
  var yMag = 1;

  tmp = adjust(coord, range);
  x0 = tmp[0];
  y0 = tmp[1];
  xMag = tmp[2];
  yMag = tmp[3];

  //console.log("calc: " + coord[0].length)
  //console.log("calc: " + coord[1].length)
  coord = re_calc(coord, x0, y0, xMag, yMag);
  //console.log("re_calc: " + coord[0].length)
  //console.log("re_calc: " + coord[1].length)
  ctxG.clearRect(0, 0, WIDTH, HEIGHT);
  draw_axis(x0, y0, xMag, yMag, flagT, valiable);
  draw_graph(coord);
}
