Matter.use(
  'matter-attractors'
);

var Engine = Matter.Engine,
//  Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events;

let img;
let img2;

let largeRect = 119;
let smallRect = 40;
let speed = 0.001;
var boundWidth = 27;
var playMode = "sustain"

var mConstraint;


var engine;
var world;
var boxes = [];
var boundaries = [];
var attractors = [];

var drums = [];

function soundPreload(){
  for(var i = 0; i<5; i++){
  drums[i] = loadSound("assets/drum_0"+i+".mp3");
  drums[i].playMode(playMode);
}
}

function setup() {
  var canvas = createCanvas(1000, 1000);

  soundPreload();

  engine = Engine.create();
  world = Engine.world;
  engine.world.gravity.y = 1;
  Engine.run(engine);



  img = loadImage("assets/Provocative_Percussion_Blank.png");
  img2 = loadImage("assets/Provocative_Percussion.png");

   boxes.push(new Box(276,292,largeRect,largeRect,.83, "large"));
   boxes.push(new Box(140,367,largeRect,largeRect,.08, "large"));
   boxes.push(new Box(685,342,largeRect,largeRect,.5, "large"));
   boxes.push(new Box(851,289,largeRect,largeRect,1.25, "large"));
   boxes.push(new Box(244,570,largeRect,largeRect,.64, "large"));
   boxes.push(new Box(154,679,largeRect,largeRect,.38, "large"));
   boxes.push(new Box(351,802,largeRect,largeRect,1.31, "large"));
   boxes.push(new Box(664,669,largeRect,largeRect,-.12, "large"));
   boxes.push(new Box(844,584,largeRect,largeRect,1.11, "large"));
   boxes.push(new Box(782,791,largeRect,largeRect,.275, "large"));

   boxes.push(new Box(479,281,smallRect,smallRect,-.218, "small"));
   boxes.push(new Box(80,470,smallRect,smallRect,.5, "small"));
   boxes.push(new Box(441,440,smallRect,smallRect,.28, "small"));
   boxes.push(new Box(547,484,smallRect,smallRect,.65, "small"));
   boxes.push(new Box(844,410,smallRect,smallRect,.274, "small"));
   boxes.push(new Box(400,598,smallRect,smallRect,.266, "small"));
   boxes.push(new Box(439,660,smallRect,smallRect,-.1, "small"));
   boxes.push(new Box(587,747,smallRect,smallRect,-.59, "small"));
   boxes.push(new Box(256,838,smallRect,smallRect,.26, "small"));

   boundaries.push(new Boundary(canvas.width/2, canvas.height, canvas.width, boundWidth, 0));
   boundaries.push(new Boundary(0, canvas.height/2, boundWidth, canvas.height, 0));
   boundaries.push(new Boundary(canvas.width, canvas.height/2, boundWidth, canvas.height, 0));
   boundaries.push(new Boundary(canvas.height/2, 0, canvas.width, boundWidth, 0));

  //  function collision(event){
  //
  //    var pairs = event.pairs;
  //    var bodyA = pairs.bodyA;
  //    var bodyB = pairs.bodyB;
  //
  //  console.log(event.pairs);
  //  if(drums[0].isPlaying){
  //  drums[0].play();
  //  }
  //
  //  }
  //
  // Events.on(engine, 'collisionStart', collision);


  Events.on(engine, 'collisionStart', function(event) {
       console.log("Evento: ", event)
       var pairs = event.pairs;
       // console.log("Pair no visible: ", pairs)
       // console.log("Pair visible: ", pairs[0]);
        console.log("colision between " + pairs[0].bodyA.label + " - " + pairs[0].bodyB.label);

        if(pairs[0].bodyA.label == "large" && pairs[0].bodyB.label == "large"){
            drums[1].play();
        }
        else if(pairs[0].bodyA.label == "small" && pairs[0].bodyA.label == "small"){
            drums[0].play();
        }
        else if(pairs[0].bodyA.label == "small" && pairs[0].bodyA.label == "large"){
            drums[2].play();
        }
        else if(pairs[0].bodyA.label == "large" && pairs[0].bodyA.label == "small"){
            drums[4].play();
        }
      // console.log(pairs[0].bodyA.id);
  });

   // var options = {
   //
   // bodyA: boxes[0].body,
   // bodyB: boxes[1].body,
   // length: 50,
   // stiffness: 0.2
   //
   // }
   //
   // var spring = Constraint.create(options);
   // World.add(engine.world, spring);

//console.log(boxes[0]);

// var attractiveBody = Bodies.circle(
//     100,
//     100,
//     50,
//     {
//     isStatic: true,
//
//     // example of an attractor function that
//     // returns a force vector that applies to bodyB
//     plugin: {
//       attractors: [
//         function(bodyA, bodyB) {
//           return {
//             x: (bodyA.position.x - bodyB.position.x) * 1e-6,
//             y: (bodyA.position.y - bodyB.position.y) * 1e-6,
//           };
//         }
//       ]
//     }
//   });
//
//   World.add(engine.world, attractiveBody);

//attractors.push(new Attractor(canvas.width/2, canvas.height/2, 10,10,0));




var canvasMouse = Mouse.create(canvas.elt);
canvasMouse.pixelRatio = pixelDensity();
var options = {
  mouse:canvasMouse,
  stiffness: .2,
};


mConstraint = MouseConstraint.create(engine, options);
World.add(engine.world, mConstraint);

}

function draw() {

image(img, 0, 0)

for(var i=0; i<boxes.length; i++){
  boxes[i].show();
}

if (mConstraint.body){
  var pos = mConstraint.body.position;
  var m = mConstraint.mouse.position;
  var offset = mConstraint.constraint.pointB;
  stroke(0,255,0);
  //line(pos.x+offset.x, pos.y+offset.y, m.x, m.y);
}

for(var i=0; i<boundaries.length; i++){
//boundaries[i].show();
}

for(var i=0; i<attractors.length; i++){
//attractors[0].show();
}




}


function mousePressed(){

//drums[0].play();
//console.log()

}

function mouseDragged(){
//boxes.push(new Box(mouseX,mouseY,smallRect,smallRect,0))
  //  boxes.push(new Box(mouseX,mouseY,largeRect,largeRect,0))
}

function windowResized(){
 resizeCanvas(windowWidth, windowHeight);
// console.log(windowWidth, windowHeight);

}
