var canvas;
var backGround, backGroundImg;
var alien_img, battleShip_img
var alien, battleShip;
var earth, earthImg;
var alien2,alien2_img;
var missile, missileImg;
var score=0;
var blast, blastImg
var gameState=1;
var life=3;
var backBoard;
var gameOver,gameOver_img;
var back,back_img;
var laser,laser_img;

  function preload() {
      earthImg = loadImage("earth.jpg");
      backGroundImg= loadImage("star.jpg");
      battleShip_img = loadImage("battleship.png");
      alien_img = loadImage("alien.png");
      missileImg = loadImage("missile.png");
      blastImg = loadImage("blastImage.png");
      alien2_img  = loadImage("alien2.png");  
      gameOver_img = loadImage("gameOver.png");      
      back_img = loadImage("back.jpg");         
      laser_img = loadImage("laser.webp"); 
  }

function setup(){
    createCanvas(1500,800);

    backGround = createSprite(width/2,height/2,100,100);
    backGround.addImage(backGroundImg);
    
    earth=createSprite(1300,400,50,50);
    earth.addImage(earthImg);
    earth.scale= 1.5;

    battleShip = createSprite(1100,World.mouseY,50,50);
    battleShip.addImage(battleShip_img);
    battleShip.scale=0.3;

    back = createSprite(1150,400,50,50);
    back.addImage(back_img);
    back.scale=0.5;
    back.visible=false; 

    alienGroup = new Group();
    missileGroup = new Group();
    alien2Group = new Group();
    laserGroup = new Group();

   
    
    
   // missile = createSprite(200,200,50,50);
   // missile.addImage(missileImg);
   // missile.scale = 0.3;

   
}

function draw(){
  //battleShip.y = World.mouseY;
  if(gameState===1){
    battleShip.y= World.mouseY
  }
   if (frameCount % 80 === 0) {
      drawAliens();  
    }

      if(frameCount%85 ===0){
        shootLaser();
      }

   if(frameCount% 100 === 0){
     createAliens();
   }

    if(keyDown("space")){
      shootMissile();
    }

    if(missileGroup.collide(alienGroup)){
      handleAlienCollision();
    }

    if(missileGroup.collide(alien2Group)){
      handleAlien2Collision();
    }

    if(alienGroup.isTouching(back)){
      gameOver= createSprite(750,400,20,20);
      gameOver.addImage(gameOver_img);
      text("REFRESH THE PAGE TO PLAY AGAIN",750,400);
      alien2Group.destroyEach();
      laserGroup.destroyEach();
      missileGroup.destroyEach();
      alien.velocityX=0;
      alien.visible=false;
      gameState=2;
    
    }

    if(alien2Group.isTouching(back)){
      gameOver= createSprite(750,400,20,20);
      gameOver.addImage(gameOver_img);
      text("REFRESH THE PAGE TO PLAY AGAIN",750,400);
      alien2Group.destroyEach();
      laserGroup.destroyEach();
      missileGroup.destroyEach();
      alien2.velocityX=0;
      alien2.visible=false;
      gameState=2
    }

    if(laserGroup.isTouching(battleShip)){
      gameOver= createSprite(750,400,20,20);
      gameOver.addImage(gameOver_img);
      text("REFRESH THE PAGE TO PLAY AGAIN",750,400);
      alien2Group.destroyEach();
      laserGroup.destroyEach();
      missileGroup.destroyEach();
      laser.velocityX=0;
      laser.visible=false;
      gameState=2;
    }

   // if(gameState===2){
   //   alienGroup.destroyEach();
    //  alien2Group.destroyEach();
     // missileGroup.destroyEach();
     // gameOver= createSprite(750,400,20,20);
     // gameOver.addImage(gameOver_img);
  //  }

   

  drawSprites();
  textSize(20);
  fill("white")
 // score = text("Score:"+0,10,40);
  value = text("Score:"+score,10,40);

 // textSize(20);
 // fill("white");
 // input = text("Life:"+life,1400,40)
}

 function drawAliens(){
   alien= createSprite(100,random(20,780),40,40);
   alien.addImage(alien_img);
   alien.scale = 0.5;
   alien.velocityX = 15;
   alien.lifetime = 400;
   alienGroup.add(alien);
 }

 function createAliens(){
  alien2= createSprite(100,random(30,750),40,40);
  alien2.addImage(alien2_img);
  alien2.scale = 0.3;
  alien2.velocityX = 15;
  alien2.lifetime = 400;
  alien2Group.add(alien2);
 }
 function shootMissile(){
  missile= createSprite(1050,battleShip.y, 50,20)
  missile.addImage(missileImg)
  missile.scale=0.12
  missile.velocityX=-7;
  missileGroup.add(missile)
}

 function shootLaser(){
     laser= createSprite(100,random(20,780),20,20);
     laser.addImage(laser_img);
     laser.scale=0.12;
     laser.velocityX=15;
     laserGroup.add(laser);
 }

function handleAlienCollision(){
  blast= createSprite(alien.x+60, alien.y, 50,50);
  blast.addImage(blastImg);
  blast.scale=0.3;
  blast.life=20;
  score=score+1
  alienGroup.destroyEach();
  missileGroup.destroyEach();
}

function handleAlien2Collision(){ 
  blast= createSprite(alien2.x+60, alien2.y, 50,50);
  blast.addImage(blastImg);
  blast.scale=0.3;
  blast.life=20;
  score=score+1
  alien2Group.destroyEach();
  missileGroup.destroyEach();
  }


function handleGameover(alienGroup){

  alienGroup.destroyEach();
  laserGroup.destroyEach();
  gameState = 2;

  swal({
    title: `Game Over`,
    text: "Oops you lost the game....!!!",
   text: "Your Score is " + score,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize: "100x100",
   confirmButtonText: "Thanks For Playing"
 });
}

 

