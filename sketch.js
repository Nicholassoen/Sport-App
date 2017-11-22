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
	foo = new p5.Speech();
	foo.speak("Voice initialized");
}

function windowResized() 
{
	resizeCanvas(windowWidth, windowHeight);
}

var noSleep;
function enableNoSleep() {
	noSleep = new NoSleep();
	noSleep.enable();
	document.removeEventListener('click', enableNoSleep, false);
}
// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
document.addEventListener('click', enableNoSleep, false);

function draw() { 
    background(220);
	fill(255, 255, 255);
	strokeWeight(1);
	if (showMenu == true)  
	{
		startButton1.display();
	}
	
	if (soccerActivated == true) 
	{
		football1.display();
		football1.update();
		returnKnap.display();
		drawTop();
	}
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
		returnKnap.collide();
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


var topHeight = 70;
initialized = false;
function drawTop() {
	strokeWeight(4);
	line(0, topHeight, width, topHeight);
	// 2/5 for each side
	line(2/5*width, 0, 2/5*width, topHeight);
	line(3/5*width, 0, 3/5*width, topHeight);
}

var inp;
function startInput() {
	inp = createInput("input text");
	inp.input(myInputEvent);
	inp.position(30, 40);

}


function myInputEvent(){
	console.log('you are typing: ', this.value());
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
var i2 = 0;
function football() 
{
	this.score = 0;
	this.score2 = 0;
	this.player1x = 0;
	this.playery = height/6
	this.player2x = width/2;
	this.w = width/2;
	this.h = height/1.44;
	this.col = color(255, 255, 255);
	this.col2 = color(255, 255, 255);
	
	this.display = function()
	{
		noStroke();
		textSize(40);
		fill(this.col);
		rect(this.player1x, this.playery, this.w, this.h); //player 1
		textAlign(CENTER); 
		fill(this.col2);
		rect(this.player2x, this.playery, this.w, this.h); //player 2
		stroke("black");
		strokeWeight(3);
		fill(0, 0, 0);
		text(this.score + " - " + this.score2, width/2, height/2);
		line(0, this.h+this.playery, width, this.playery+this.h); 
		line(width/2, 0, width/2, height);
	}
	
	this.collide = function()
	{
		var c = circleCollision(this.player1x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c == true && i1 == 0 && i2 == 0)
		{
			this.score++;
			i1 = 20;
			i2 = 20;
			this.col = color(255, 0, 0);
			foo.speak("team 1 scores with " + this.score + " and team 2 score is " + this.score2);
		}
		var c2 = circleCollision(this.player2x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c2 == true && i2 == 0 && i1 == 0) 
		{
			this.score2++;
			i2 = 20;
			i1 = 20;
			this.col2 = color(255, 0, 0);
			foo.speak("team 2 scores with " + this.score2 + " and team 1 score is " + this.score);
		}
	}
	
	this.update = function() 
	{
		if (i1 == 0) 
		{
			this.col = color(255, 255, 255);
		}
		if (i2 == 0) 
		{
			this.col2 = color(255, 255, 255);
		}
		if (i1 > 0) i1--;
		if (i2 > 0) i2--;
	}
}
function returnButton() 
{
	this.w = width/3;
	this.h = height/2-150/2;
	this.x = 0+this.w;
	this.y = height-40;
	
	this.display = function() 
	{
		noFill();
		strokeWeight(0);
		//fill(255, 0, 0);
		rect(this.x, this.y-this.h/6, this.w, this.h/3);
		strokeWeight(10);
		fill(220);
		ellipse(this.x+this.w/2, this.y, this.h/3);
	}
	
	this.collide = function() 
	{
		var c = circleCollision(this.x, this.y-this.h/6, this.w, this.h/3, mouseX, mouseY, 1, 1);
		if (c == true)
		{
			showMenu = true;
			soccerActivated = false;
		}
	}
}

function ourTriange(x, y, w, h, pointLeft)
{
    //Find square area at center
    if (w > h) {
	var diff = w - h;
	var x1 = Math.floor(x + diff/2);
	var y1 = y;
	var w1 = h;
	var h1 = h;
    } else {
	var diff = h - w;
	var x1 = x;
	var y1 = Math.floor(y + diff/2);
	var w1 = w;
	var h1 = w;
    }

    //Make margin
    var margin = Math.floor(Math.min(h,w)/10);
    x1 = x1+margin;
    y1 = y1+margin;
    h1 = h1 - 2*margin;
    w1 = w1 - 2*margin;
    
    if (pointLeft) {
	triangle(x1, y1+h1/2, x1+w1, y1, x1+w1, y1+h1);
    } else {
	triangle(x1, y1, x1, y1+h1, x1+w1, y1+h1/2);
    }
}
