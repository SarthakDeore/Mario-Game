var PLAY=1;
var END=0;
var gameState=PLAY;

var mario, mariorunning,mario_collided;
var ground,groundImage;
var bg;
var brick,bricksGroup,brikImage;
var obstacle,obstaclesGroup,obstacleImage;
var score;
var gameOver,gameoverImage;
var restart,restartImage;
var jumpSound,dieSound,checkpointSound;



function preload(){
  
  //loading the images
  bg=loadImage("bg.png");
  mariorunning=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  groundImage=loadImage("ground2.png");
  brickImage=loadImage("brick.png");
  obstacleImage=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  
  mario_collided=loadAnimation("collided.png");
  
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
}

function setup(){
  
  //creating play area
  createCanvas(600,400);
  
  score=0;
  
  //creating mario sprite and adding animation
  mario=createSprite(30,320,20,30);
  mario.addAnimation("mario",mariorunning);
  
  //creating ground sprite and adding image
  ground=createSprite(300,380,600,10);
  ground.addImage("resetingground",groundImage);
  ground.velocityX=-2;
  
  gameOver=createSprite(300,200,40,40);
  gameOver.addImage("gameover",gameoverImage);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  restart=createSprite(300,240,40,40);
  restart.addImage("restart",restartImage);
  restart.visible=false;
  restart.scale=0.4;
  
  //creating edge sprite
  edges=createEdgeSprites();
  
  obstaclesGroup=new Group();
  bricksGroup=new Group();
}

function draw(){
  
  //creating background
  background(bg);
  
  textSize(20);
  text("Score: "+score,430,30);
  
  
  if (gameState===PLAY){
    //giving conditions for making the mario jump
    if(keyDown("space")&& mario.y>=321){
    mario.velocityY=-10;
    jumpSound.play();
    }
    if(score>0 && score%20===0){
      checkpointSound.play();
      
    }
    
    if(bricksGroup.isTouching(mario)){
      score=score+1;
      
    }
    console.log(gameState);
  //reseting the ground
  if(ground.x<0){
    ground.x=300;
    }
    
  //giving gravity to mario
  mario.velocityY=mario.velocityY+0.8;
    
    
  //calling a function named as spawnbricks
  spawnbricks();
  spawnobstacles();
    
    if(obstaclesGroup.isTouching(mario)){
      gameState=END;
      dieSound.play();
      
    }
    
  }
  else if(gameState===END){
    ground.velocityX=0;
    
    bricksGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    bricksGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    mario.changeAnimation(mario_collided);
    mario.velocityY=0;
    
    gameOver.visible=true;
    restart.visible=true;
  }
  
  //colliding mario with the ground
  mario.collide(ground);
  
  if(mousePressedOver(restart)){
   
    reset();
    
  }
  
  //displaying sprites
  drawSprites();
  
}

//defining the function spawnbricks
function spawnbricks(){
  
  //giving framecount to calculate the distance of bricks
  if (frameCount%30===0){
    
  //creating bricks sprite and adding image and giving velocityx
  bricks=createSprite(600,350,40,40);
  bricks.addImage("spawningImage",brickImage);
  bricks.velocityX=-10;
    
  //making the bricks appear randomly
  bricks.y=Math.round(random(250,300))
    
  
    
  //making the depth of the mario greater than the bricks
  bricks.depth=mario.depth;
  mario.depth=mario.depth+1;
    
  bricks.lifetime=60;
  bricksGroup.add(bricks);
}
}
function spawnobstacles(){
  if (frameCount%70===0){
  obstacle=createSprite(600,320,20,20);
  obstacle.velocityX=-4;
  obstacle.addAnimation("obstacle",obstacleImage);
  obstacle.lifetime=150;
  obstaclesGroup.add(obstacle);
}

}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  score=0;
  
  
  
}




