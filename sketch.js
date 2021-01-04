//Create variables here

var dog;
var dogimg,happyDogimg;
var database;
var foodS;
var foodStock;


function preload()
{
  //load images here
  dogimg=loadImage("images/doglmg.png");
  happyDogimg=loadImage("images/doglmg1.png");
  
}

function setup() {
  createCanvas(400, 400);

  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  foodStock.set(20);
  
  dog=createSprite(200,200);
  dog.addImage(dogimg);
  dog.scale(0.2);
  
}


function draw() {  
background("green");
if(food!=undefined){

  textSize(20);
  fill(255);
  text("Note: Press UP_ARROW to feed DRAGO milk",20,20);
  text("Food remaning: "+foodS,120,120);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDogimg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);
  }

  if(food===0){
    food=20;
  }

  //text("x= "+mouseX+" y= "+mouseY,mouseX,mouseY);
  drawSprites();
  }
}


function readStock(data){

  foodS=data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    food:x
  });
  

}



