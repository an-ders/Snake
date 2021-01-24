function Snake(screenSize){
  this.pos = {x:200, y:200};
  this.v = {x:null,y:null};
  this.size = 20;
  this.total = 0;
  this.tail = [];
  this.screenSize = screenSize;
  
  this.update = function(){
    this.pos.x += this.v.x;
    this.pos.y += this.v.y;
    if (this.pos.x  >= this.screenSize){
      this.pos.x = 0;
    }else if (this.pos.x <= -this.size){
      this.pos.x = this.screenSize - this.size;
    }else if (this.pos.y  >= this.screenSize){
      this.pos.y = 0;
    }else if (this.pos.y <= -this.size){
      this.pos.y = this.screenSize - this.size;
    }
  }
  
  this.show = function(){
    noStroke();
    rect(this.pos.x,this.pos.y,20,20);
  }
  
  this.dir = function(x, y){
    if (!(this.v.x == x || this.v.y == y)){
    this.v.x = x*this.size;
    this.v.y = y*this.size;
    }
  }
}