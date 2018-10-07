function Wall(x,y,w,h,r){

var options = {
angle: r,
isStatic: true
}

this.body = Bodies.rectangle(x,y,w,h,options);
this.w = w;
this.h = h;
this.r = r;
World.add(engine.world, this.body);

this.display = function(){

  var pos = this.body.position;
  var angle = this.body.angle;

  push();
  translate(pos.x, pos.y);
  rotate(angle);
  fill(255,0,0);
  noStroke();
  rectMode(CENTER)
  rect(0,0,this.w, this.h);
  pop();

}

}
