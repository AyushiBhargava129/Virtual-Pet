class Food{
  constructor(){
    this.foodStock = 0;
    this.lastFed;
    this.image1 = loadImage("Images/Milk.png");   
  }
    updateFoodStock(foodStock){
      this.foodStock=foodStock;
    }

    getFedTime(lastFed){
      this.lastfed = lastFed;
    }

    deductFood(){
      if(this.foodStock>0){ 
       this.foodStock=this.foodStock-1;
      } 
    }

    getFoodStock(){
      return this.foodStock; 
    }
    
    display(){
      var x = 80, y = 100;

      imageMode(CENTER);
      image(this.image1, 720, 220, 70, 70);

      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image1,x,y,50,50);
          x=x+30;
        }
      }

      
    }
}

/*
if(this.foodstock != 0){
        for(var i=0; i<this.foodStock; i++){
          if(i%10 == 0){
            x = 80;
            y = y+50;
          }
        } image(this.image1,x,y,50,50);
          x=x+30; 
      }
      */