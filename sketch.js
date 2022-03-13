const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zom;
var zomImg;
var breakButton;
var backgroundImage;
var theme;
var stones = [];

function preload() {
  
  zomImg = loadImage("assets/zombie.png");
  backgroundImage = loadImage("./assets/background.png");
  theme = loadSound ("assets/Theme.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(25, { x: 80, y: height / 2 - 100 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 30);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  zom = createSprite(250,600,10,20);
  zom.addImage (zomImg);
  zom.scale = 0.2;


  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  // Title
  fill("black");
  textAlign("center");
  textSize(40);
  

  if(!theme.isPlaying()){
    theme.play();
    theme.setVolume(5);
    }

  bridge.show();

  for (var stone of stones) {
    stone.show();
  }

  

  drawSprites();
}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
