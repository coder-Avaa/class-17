  var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  var score = 0, ground, invisibleGround;

function preload(){
 //load images for the sprites 
  monkey_running =                          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  //create the canvas
  createCanvas(500, 500);
  //name the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  //create the ground and invisibleGround
  ground = createSprite(300, 470, 1050, 20);
  ground.velocityX = -(5 + 3* score / 40);
  ground.shapeColor = "brown";
  invisibleGround = createSprite(300, 474, 1050, 20);
  invisibleGround.velocityX = -(5 + 3* score / 40);
  invisibleGround.visible = false;
  //create the monkey
  monkey = createSprite(40, 445);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
 
}


function draw() {
 //colour the background
  background("orange");
  //display score
  text("score = " + score, 50, 50);
  
  //infinite the ground and invisibleGround
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
  //jump monkey
  if(keyDown("space")&& monkey.y >= 250) {
    monkey.velocityY = -12;  
  }
  monkey.velocityY = monkey.velocityY + 0.7;
  monkey.collide(invisibleGround);
  //name the function
  spawnfood();
  obstaclespawn();
  if (bananaGroup.isTouching(monkey)) {
     bananaGroup.destroyEach();
     score = score + 3;
  }
  drawSprites();
}
function spawnfood() {
 if (frameCount % 50 === 0) {
   banana = createSprite(550, Math.round(random(150, 380)), 20, 30);
   banana.velocityX = -(5 + 3* score / 33);
   banana.addAnimation("banana.png", bananaImage);
   banana.visible = true;
   banana.scale = 0.1;
   banana.lifetime = 130;
   monkey.depth = banana.depth;
   monkey.depth = monkey.depth + 1
   bananaGroup.add(banana);
   
   }
}
function obstaclespawn() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(520, 425);
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.velocityX = -(4 + 3* score / 44);
    obstacle.visible = true;
  }
}




