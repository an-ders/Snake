function Food(tail){
  this.size = 20;
  this.pos = {x:int(random(20)) * this.size, y:int(random(20)) * this.size};
  
  this.update = function(){
  }
  
  this.show = function(){
    noStroke();
    ///fill(180,220,80);
    rect(this.pos.x,this.pos.y,20,20);
  }
  this.eat = function(snake){
    if (snake.pos.x === this.pos.x && snake.pos.y === this.pos.y){
      return true;
    }
  }
  this.pickLocation = function(){
    this.pos = {x:int(random(20)) * this.size, y:int(random(20)) * this.size};
  }

}