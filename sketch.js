//Create variables here
var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodObj=new Food();
  foodObj.getFoodStock();

  feed=createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(780,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
  //add styles here
  function readStock(data) {
    foodS=data.val();
  }
  
  
  function writeStock(x){
    if(x<=0){
      x=0;
    }else{
      x=x-1;
    } 
    database.ref('/').update({
      Food:x
    })
  }
  foodObj.foodStock+=1;
  function addFoods(){
  database.ref('/').update({
    Food:foodObj.foodStock
  })

}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);
}

