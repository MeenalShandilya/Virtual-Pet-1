var dog, dog1, HappyDog;
var dB, dogref;
var foodS;
var bg;

function preload() {
    dog1 = loadImage("images/dogImg.png");
    HappyDog = loadImage("images/dogImg1.png");
    bg = loadImage("field.png");
}

function setup(){
    dB = firebase.database();
    createCanvas(500,500);
    dog = createSprite(250,300,50,100);
    dog.addImage(dog1);
    dog.scale=0.3;

    dogref = dB.ref("food");
    dogref.on("value",readStock,showError);
}

function draw(){
    background(bg);

    if(keyWentDown(UP_ARROW)){
        updateStock(foodS);
        dog.addImage(HappyDog);        
    }
    textFont("Comic Sans MS");
    fill("red");
    textSize(20);
    text("Food Remaining: "+foodS,150,100);
    text("Press the up arrow to feed Padfoot.",100,50);
    drawSprites();
}
function readStock(data) {
    foodS = data.val();
}
function showError() {
    console.log("Cannot read the values from the database.");
}
function updateStock(any) {
    if (any<0) {
        any=0;
    } else if (any>0) {
       any=any-1;
    }
    dB.ref("/").update({
        food: any
    })
}