var spaceship,spaceshipImage
var alien,alienImage,alienGroup
var bullet,bulletImage,bulletGroup

function preload(){
spaceshipImage = loadImage("images/sp.png")
alienImage = loadImage("images/Alien1.png")
bulletImage = loadImage("images/Laser.png")
}

function spawnAlien(x,y,z){
  for(var i = 0; i<x; i++){
    alien = createSprite(z+70*i,y,50,30)
    alien.addImage("a",alienImage)
    alien.scale = 0.4
    alienGroup.add(alien)
  }
}

function setup(){
createCanvas(700,900)
edges=createEdgeSprites()

spaceship = createSprite(340,830,50,50)
spaceship.addImage("sp",spaceshipImage)
spaceship.scale = 0.4

bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bulletImage);
  
  bullet.velocityY = -15;
  //bullet.lifetime = 100;
  bullet.scale = 0.1;

//bulletGroup=createGroup()
alienGroup=createGroup()

spawnAlien(9,150,70)
spawnAlien(7,250,140)
spawnAlien(5,350,210)
spawnAlien(3,450,280)
spawnAlien(1,550,350)
}

function draw(){
background("black")

spaceship.x = World.mouseX
  bullet.x = spaceship.x;
  alienGroup.setVelocityYEach(1.5)
drawSprites()

 bullet.bounceOff(spaceship)
 bullet.bounceOff(edges[2])
  bullet.bounceOff(alienGroup,removeAlien)

if(!alienGroup[0]){
bullet.destroy()
textSize(25)
fill("white")
text("Congratulations! you win",280,430)
}
if(alienGroup.isTouching(spaceship)){
  textSize(25)
  text("Try Again, You lost",20,430)
  alienGroup.setVelocityYEach(0)
  bullet.destroy()
}

}







function removeAlien(bullet,alien){
  alien.destroy()
  bullet.y=spaceship.y
  bullet.velocityY=-15
}