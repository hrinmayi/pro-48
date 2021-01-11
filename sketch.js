var bg,bgimg,bg2;
var gameState=0;
var seed,seedimg,fimg;
var f=[];
var w=[];
var wimg,fer,war,fgroup,wgroup;
var ground, human,humanimg,humangrp;
var score=0;
var life=5;
var seed2,bg2img;
var zombie,zombieimg,zgroup,bg3img,treeimg,saplingimg;
var white,black,restart,gameover,restartimg,gameoverimg;

function preload(){
    bgimg=loadImage("BG1.png");
    seedimg=loadImage("mangoSeed.png");
    seed2=loadImage("seed2.png");
    humanimg=loadImage("human.png");
    fimg=loadImage("fertilizer.png");
    wimg=loadImage("wateringCan.png");
    bg2img=loadImage("bg2.jpg");
    zombieimg=loadImage("zombie.png");
    bg3img=loadImage("bg3.jpg");
    treeimg=loadImage("mango tree.png");
    saplingimg=loadImage("sapling.png");
    restartimg=loadImage("restart.png");
    gameoverimg=loadImage("gameover.png");
    }
function setup(){
    canvar=createCanvas(900,650)
    
        bg=createSprite(700,350,1200,650);
        bg.addImage(bgimg);
        bg.scale=2.69;      
        bg2=createSprite(2095,350,1200,650);
        bg2.addImage(bgimg);
        bg2.scale=2.69;    
        seed=createSprite(100,550,10,10);
        seed.addImage(seedimg);
        seed.scale=0.7;
        ground=createSprite(700,585,1400,20);
        ground.visible=false;
        zgroup=createGroup();
        humangrp=createGroup();
        fgroup=createGroup();
        wgroup=createGroup();
        gameover=createSprite(450,300,10,10);
        gameover.addImage(gameoverimg);
        gameover.scale=0.5;
        gameover.visible=false;
        restart=createSprite(450,400,10,10);
        restart.addImage(restartimg);
        restart.scale=0.5;
        restart.visible=false;
       
    
}
function draw(){
    background("green");

    bg.velocityX=-(4+score/20);
    bg2.velocityX=-(4+score/20);

    if(gameState === 0){
       
        seed.debug=false;
        seed.setCollider("circle",5,-10,40);
        if(keyDown(UP_ARROW) && seed.y>350){
            seed.velocityY=-10;  
        }
        seed.velocityY+=1;
        restart.visible=false;
        gameover.visible=false;
       
        humans();
        fertilizer();
        water();
    }
    
    if(gameState===1){
        seed.addImage(seed2);
        seed.scale=0.2;
        seed.debug=false;
        seed.setCollider("rectangle",0,10,50,190);
        ground.y=570;
        seed.collide(ground);
        bg.addImage(bg2img);
        bg2.addImage(bg2img);
        if(keyDown(UP_ARROW) && seed.y>350){
            seed.velocityY=-10;  
        }
        seed.velocityY+=1;
        restart.visible=false;
        gameover.visible=false;
        humans();
        fertilizer();
        water();
    }

    if(bg.x<0){
        bg.x=700;
    }
    if(bg2.x<700){
        bg2.x=2095
    }
    
    if(humangrp.isTouching(seed)){
        life-=1;
        humangrp.destroyEach();

    }
    
    if(fgroup.isTouching(seed)){
        score+=10;
        fgroup.destroyEach();
    }

    if(wgroup.isTouching(seed)){
        score+=5;
        wgroup.destroyEach();
    }
    if(score >= 20){
        gameState=1;
    }
    if(score >= 50){
        gameState=2;
    }
    if(gameState === 2){
        seed.addImage(saplingimg);
        seed.scale=0.3;
        seed.debug=false;
        seed.setCollider("rectangle",0,10,50,190);
        ground.y=550;
        seed.collide(ground);
        bg.addImage(bg3img);
        bg2.addImage(bg3img);
        bg.width=1000;
        bg2.width=1000;
        bg.y=330;
        bg2.y=330;
        bg.scale=2.8;
        bg2.scale=2.8;
        if(keyDown(UP_ARROW) && seed.y>350){
            seed.velocityY=-10;  
        }
        seed.velocityY+=1;
        restart.visible=false;
        gameover.visible=false;
        zombies();
        fertilizer();
        water();
    }
    if(zgroup.isTouching(seed)){
        life-=1;
        zgroup.destroyEach();
    }

    if(score >= 80){
        gameState="end";
    }

    if(life===0){
        gameState="over";
    }
   
    seed.collide(ground);

    drawSprites();

    if(gameState === "end"){
        background("white");
        fgroup.setVelocityXEach(0);
        war.velocityX=0;
        humangrp.setVelocityXEach(0);
        zgroup.setVelocityXEach(0);
        humangrp.destroyEach();
        zgroup.destroyEach();
        war.destroy();
        fgroup.destroyEach();
        bg.destroy();
        bg2.destroy();
        seed.addImage(treeimg);
        seed.scale=1;
        seed.x=450;
        seed.y=325;
        drawSprites();
        textSize(30);
        fill("black");
        text("SAVE TREES!",350,630);
    }
    if(gameState==="over"){
        bg.velocityX=0;
        bg2.velocityX=0;
        fgroup.setVelocityXEach(0);
        wgroup.setVelocityXEach(0);
        bg2.velocityX=0;
        humangrp.setVelocityXEach(0);
        zgroup.setVelocityXEach(0);
        restart.visible=true;
        gameover.visible=true;
        if(mousePressedOver(restart)){
            gameState=0;
            humangrp.destroyEach();
            fgroup.destroyEach();
            wgroup.destroyEach();
            zgroup.destroyEach();
            score=0;
            life=5;
        }
    }

    
    textSize(30);
    fill("black");
    text("life of seed: "+life,650,50);
    text("score: "+score,650,90);

}
function humans(){
    if(frameCount %350 === 0){
        human=createSprite(900,530,10,10);
        human.addImage(humanimg);
        human.velocityX=-(4+score/20);
        human.scale=0.8;
        human.lifetime=1400/3;
        humangrp.add(human);
        human.debug=false;
        human .setCollider("rectangle",0,0,100,100)
    } 
}
function fertilizer(){
    if(frameCount %300 === 0){
        fer=createSprite(900,random (300,450))
        fer.addImage(fimg);
        fer.velocityX=-(4+score/20);
        fer.scale=0.2;
        fgroup.add(fer);
    }
}

function water(){
    if(frameCount %250 === 0){
       
        war=createSprite(900,random (300,450))
        war.addImage(wimg);
        war.velocityX=-(4+score/20);
        war.scale=0.6;
        wgroup.add(war);
        
    }
}

function zombies(){
    if(frameCount %260 === 0){
        zombie=createSprite(900,530,10,10);
        zombie.addImage(zombieimg);
        zombie.velocityX=-(4+score/20);
        zombie.scale=0.6;
        zombie.lifetime=1400/3;
        zgroup.add(zombie);
        zombie.debug=false;
        zombie .setCollider("rectangle",0,0,100,100)
    } 
}
