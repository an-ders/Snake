var s;
var f;
var tail = [];
var addTail = false;

var state;
var SCREEN_SIZE = 420;
/* game states
death
rainbow colour
*/

function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE);
  f = new Food();
  s = new Snake(SCREEN_SIZE);
  frameRate(10);
  state = 0;
  
  font = loadFont("/Snake/components/American Captain.ttf");

}

function draw() {
  console.log(state);
  if (state == 0){//-----------------------------------------START
    background(130,130,130);
    
    fill(85,180,220);

    textFont(font);
    textAlign(CENTER);
    textSize(90);
    text("Press Space", SCREEN_SIZE/2,150);
    textSize(40);
    text("to", SCREEN_SIZE/2,220);
    textSize(90);
    text("START", SCREEN_SIZE/2,320);
    
  }else if (state == 3){//----------------------------------PAUSE
    background(130,130,130);

    s.show();
    f.show();
    tail.forEach((object) => object.show());
    fill(90,150,200);
    textSize(100);
    text("PAUSED", SCREEN_SIZE/2,30+SCREEN_SIZE/2);
    
  }else if (state == 2){//--------------------------------DIED
    background(130,130,130);
    
    textFont(font);
    textAlign(CENTER);
    fill(160,90,200,70);
    rect(0,0,SCREEN_SIZE,SCREEN_SIZE);
    fill(160,90,200);
    textSize(80);
    text("GAME OVER", SCREEN_SIZE/2,150);
    text("SCORE: " + tail.length, SCREEN_SIZE/2,330);
    
  }else if (state == 1){//------------------------------RUNNING
    background(130,130,130);
    var lastLoc = {x: s.pos.x, y: s.pos.y};
    var temp;
    if (addTail){
      chooseColour();
      tail.push(new Tail(s.pos.x, s.pos.y));
      addTail = false;
    }
    s.update();
    for (var i = tail.length -1; i>-1; i--){
      temp = {x: tail[i].pos.x, y: tail[i].pos.y}
      tail[i].update(lastLoc.x, lastLoc.y);
      lastLoc = temp;
    }
    if(f.eat(s)){
      f.pickLocation();
      addTail = true;
    }
    s.show();
    f.show();
    tail.forEach((object) => object.show());
    
    died(s, tail);
    
  }
}

function keyPressed(){
  if (state == 0){
    if (keyCode == 32){
      state = 1;
    }

  }else if (state == 3){
    if (key === "p"){
      state = 1;
    }
    
  }else if (state == 1){
    if (key === "w"){
      s.dir(0,-1);
    }else if (key === "a"){
      s.dir(-1,0);
    }else if (key === "s"){
      s.dir(0,1);
    }else if (key === "d"){
      s.dir(1,0);
    }else if (key === "p"){
      state = 3;
    }
  }else if (state == 2){
    if (keyCode == 32){
      state = 0;
      f = new Food();
      s = new Snake(SCREEN_SIZE);
      var addTail = false;
      tail = [];
    }
  }
}

function died(snake, tail){
  tail.forEach(function (object, index){ 
    if (object.pos.x == snake.pos.x && object.pos.y == snake.pos.y){
      state = 2;
    }});
}

var colourCount = 0;
var countUp = true;


function chooseColour(){
  if (countUp)
  {
    ++colourCount;
    if (colourCount >= 6)
      countUp = false;
  }
  else
  {
    --colourCount;
    if (colourCount <= 0)
      countUp = true;
  }switch(colourCount){
    case(0):
      fill(225,81,81);
      break;
    case(1):
      fill(224, 150, 81);
      break;
    case(2):
      fill(245, 226,15);
      break;
    case(3):
      fill(180,245,15);
      break;
    case(4):
      fill(15,203,245);
      break;
    case(5):
      fill(57,15,245);
      break;
    case(6):
      fill(122,15,245);
      break;
  }
}
               
              
  

