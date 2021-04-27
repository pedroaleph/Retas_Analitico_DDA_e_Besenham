//pontos
let P1 = [0, 0], P2 = [0, 0];
let reta, menu, mode = false, button;
let P1_0, P1_1, P2_0, P2_1;
let tamanho;
let x1 = [0], y1 = [0], x2 = [0], y2 = [0];
let Dx, Dy;
let X, Y, m, b;
function setup() {
  const canvas = 400;
  const c = createCanvas(canvas, canvas);
  c.position(0 , 45);
  P1_0 = createInput();
  P1_0.size(30);
  P1_1 = createInput();
  P1_1.size(30);
  P2_0 = createInput();
  P2_0.size(30);
  P2_0.position(85 , 0);
  P2_1 = createInput();
  P2_1.size(30);
  P2_1.position(120 , 0);
  
  menu = createSelect();
  menu.size(80, 20);
  menu.position(0, 23);
  menu.option('Analitico');
  menu.option('DDA');
  menu.option('Bresenham');
  
  button = createButton('Desenhar reta');
  button.position(83, 22);
  button.mousePressed(myEvent);
}

//funcao que simula um pixel
function pixel( A, B){
  tamanho = 30;
  A = round(A) * tamanho;
  B = round(B) * tamanho;
  fill(100);
  //point(A/tamanho, B/tamanho);
  rect(A, B,  tamanho, tamanho);
  //print(A, B);
}

function troca_pontos(){
  x1 = P2[0];
  x2 = P1[0];
  y1 = P2[1];
  y2 = P1[1];
  //print(x1, y1, x2, y2);
}

function analitico(){
  if(x1 != x2){
    if (x2 < x1) {
      troca_pontos();
    }
    X = x1;
    m = Dy/Dx;
    b = y2 - m * x2;
    
    while(X <= x2){
      Y = m * X + b;
      pixel( X, Y);
      X++;
    }   
  }
  else{
    X = x1;
    Y = y1;
    while (Y <= y2){
      pixel( X, Y);
      Y++;
    }
  }
}

function dda(){
  let incremento;
  if (abs(Dx) > abs(Dy)){
    if (x2 < x1) {
      troca_pontos();
    }
    Y = y1;
    X = x1;
    incremento = Dy / Dx;
    while (X <= x2) {
      pixel( X, Y);
      Y += incremento;
      X++;
    }
  }
  else{
    if (y2 < y1) {
      troca_pontos();
    }
    Y = y1;
    X = x1;
    incremento = Dx / Dy;
    while (Y <= y2) {
      pixel( X, Y);
      X += incremento;
      Y++;
    }
  }
}

function bresenham(){
  let i = 1;
  if (abs(Dx) >= abs(Dy)){
    if (x2 < x1) {
      troca_pontos();
      dx = - dx;
      dy = - dy;
    }
    if (dy < 0) {
      dy = - dy;
      i = - 1;
    }
    X = x1;
    Y = y1;
    let p  = 2 * dy - dx;
    while(X <= x2){
      pixel( X , Y);
      if (p >= 0){
        Y += i;
        p += 2 * (dy - dx);
      }
      else{
        p += 2 * dy;
      }
      X ++;
    }
  }
  else{
    
    if (y2 < y1) {
      troca_pontos();
      dy = - dy;
      dx = - dx;
    }
    if (dx < 0) {
      dx = - dx;
      i = - 1;
    }
    X = x1;
    Y = y1;
    let p  = 2 * dx - dy;
    while(Y <= y2){
      pixel( X , Y);
      if (p >= 0){
        X += i;
        p += 2 * (dx - dy);
      }
      else{
        p += 2 * dx;
      }
      Y ++;
    }
  }
}

function draw() {
  background(220);
  //rect(0, 0, 100);
  //text("Digite P1 e P2, selecione a reta", 0,180);
    //rect(0, 0, 100);
    P1 = [parseInt(P1_0.value(), 10), parseInt(P1_1.value(), 10)];
    P2 = [parseInt(P2_0.value(), 10), parseInt(P2_1.value(), 10)];
    x1 = P1[0]; y1 = P1[1]; x2 = P2[0]; y2 = P2[1];
    Dx = x2 - x1; Dy = y2 - y1;
    dx = Dx; dy = Dy;
    //print(reta);
    if (reta == 'Analitico')
      analitico();
    if (reta == 'DDA')
      dda();
    if (reta == 'Bresenham')
      bresenham();
    //mode = false;
  
}

function myEvent() {
  reta = menu.value();
  //background(200);
  redraw();
}