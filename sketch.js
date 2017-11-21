var showMenu = true;
var soccerActivated = false;
var fbIcon;
var surpriseIcon;
var surprise = false;
var returnKnap;
function preload() 
{
	surpriseIcon = loadImage("kartofler.png");
	fbIcon = loadImage("soccer.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	startButton1 = new startButton();
	football1 = new football();
	returnKnap = new returnButton();
} 

function windowResized() 
{
	resizeCanvas(windowWidth, windowHeight);
}

function draw() { 
  background(220);
	if (showMenu == true)  
	{
		startButton1.display();
	}
	
	if (soccerActivated == true) 
	{
		football1.display();
		returnKnap.display();
	}
	
	if (i1 > 0) i1--;
	if (surprise == true) 
	{
		image(surpriseIcon, 200, 200);
	}
}

function mousePressed() 
{
	
	if (showMenu == true) 
	{
		startButton1.collide();
		showMenu = false;
		soccerActivated = true;
	}
	
	if (soccerActivated == true) 
	{
		football1.collide();
	}
}
function circleCollision(boxx, boxy, boxw, boxh, circleX, circleY, circleR, amount) 
{
	var closeX = circleX;
	var closeY = circleY;
	if (closeX < boxx)
	{
		closeX = boxx;
	}
	if (closeX > boxx+boxw) 
	{
		closeX = boxx+boxw;
	}
	if (closeY < boxy)
	{
		closeY = boxy;
	}
	if (closeY > boxy+boxh)
	{ 
		closeY = boxy+boxh;
	}
	var d = dist(closeX, closeY, mouseX, mouseY);
	ellipse(closeX, closeY, 30, 30);
	if (d <= amount)
	{
		return true;
	} else {
		return false;
	}
	return closeX, closeY;
}


function startButton() 
{
	this.w = 200;
	this.h = 200;
	this.x = width/2-this.w/2;
	this.y = height/2-this.h/2;
	
	this.display = function() 
	{
		image(fbIcon,this.x, this.y, this.w, this.h);
		text("Fodbold", this.x, this.y);
	}
	
	this.collide = function() 
	{
		var c = circleCollision(this.x, this.y, this.w, this.h, mouseX, mouseY, 1, 10);
		print(c);
	}
}
var i1 = 0;
function football() 
{
	this.score = 0;
	this.score2 = 0;
	this.player1x = 20;
	this.playery = height/2-150/2;
	this.player2x = width-320;
	this.w = 300;
	this.h = 300;
	
	this.display = function() 
	{
		textSize(40);
		rect(this.player1x, this.playery, this.w, this.h); //player 1
		textAlign(CENTER);
		rect(this.player2x, this.playery, this.w, this.h); //player 2
		text(this.score + " - " + this.score2, width/2, height/2);
	}
	this.collide = function() 
	{
		var c = circleCollision(this.player1x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c == true && i1 == 0) 
		{
			this.score++;
			i1 = 20;
		}
		var c2 = circleCollision(this.player2x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c2 == true && i1 == 0) 
		{
			this.score2++;
			i1 = 10;
		}
	}
}
function returnButton() 
{
	this.x = 0;
	this.y = 200;
	this.w = width;
	this.h = 500;
	
	this.display = function() 
	{
		rect(this.x, this.y, this.w, this.h);
		print("alive");
	}
}



