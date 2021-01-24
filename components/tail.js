function Tail(x, y, colour){
  
  this.pos = {x:0, y:0};
  this.pos.x = x;
  this.pos.y = y;
  this.colour = colour;
  
  this.update = function (x, y){
    this.pos.x = x;
    this.pos.y = y;
  }
  
  this.show = function(){
    noStroke();
    rect(this.pos.x,this.pos.y,20,20);
  }
}