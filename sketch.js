var dog,sadDog,happyDog;
var feed, addFood;
var foodObj;
var lastFed;
var database;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food(720, 220, 70, 70);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);

  foodObj.display();

  /*fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastfed = data.val();
  })*/

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val()
  })

  /*if(lastFed !== undefined){
    fill(255, 255, 255);
    if(lastFed>= 12){
      text("Last fed :", lastFed%12 + "PM", 350, 30);
    }else if(lastFed === 0){
      text("Last Fed : 12 AM",350, 30);
    }else{
      text("Last Fed:" + lastFed + "AM", 350, 30);
    }
  }*/

  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }
 

  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  var foodStockVal = foodObj.getFoodStock();

  if(foodStockVal<=0){
    foodObj.updateFoodStock(foodStockVal*0)
  }else{
    foodObj.updateFoodStock(foodStockVal-1)
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

/* 
1.Time is forever undefined.
2.Food is getting made, but is not getting displayed.
*/