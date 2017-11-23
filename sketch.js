var showMenu = true;
var badmintonActivated = false;
var soccerActivated = false;
var badmintonIcon;
var badIcon;
var surpriseIcon;
var surprise = false;
var returnKnap;
var timerStarted = true;
function preload()
{
	surpriseIcon = loadImage("kartofler.png");
	badmintonIcon = loadImage("badminton.svg");
	soccerIcon = loadImage("soccer.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	startButton1 = new startButton();
	badminton = new Badminton();
	Football = new football();
	topBox1 = new topBox();
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
	
	if (badmintonActivated == true) 
	{
		badminton.display();
		badminton.update();
		badminton.saet();
		returnKnap.display();
		topBox1.display();
	}
	if (soccerActivated == true) 
	{
		Football.display();
		Football.update();
		returnKnap.display();
		topBox1.display();
		Football.timer();
		Football.showMenu();
	}
	if (surprise == true) 
	{
		image(surpriseIcon, 200, 200);
	}
}
var mouseDelay = 0;
function mousePressed()
{
	if (mouseDelay < 2) mouseDelay++;
	if (showMenu == true)
	{
		startButton1.collide();
	}
	
	if (badmintonActivated == true) 
	{
		badminton.collide();
		returnKnap.collide();
		topBox1.collide();
	}
	if (soccerActivated) 
	{
		if (mouseDelay == 2) {
			Football.collide();
		}
		returnKnap.collide();
		topBox1.collide();
		Football.clickedTimer();
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
}

function cc(x, y, w, h) {
	return circleCollision(x, y, w, h ,mouseX, mouseY, 1, 1);
}

var topHeight = 110;
function topBox() {
	this.leftName = "Player 1";
	this.rightName = "Player 2";
	this.editName = "none";
	this.input = null;
	this.collide = function() {
		if (cc(0,0,2/5*width, topHeight)) {
			//Player 1 name
			if (this.editName === "none") {
				this.input = createInput(this.leftName);
				this.input.position(30, 40);
				this.editName = "left";
				var tthis = this;
				setTimeout(function() {tthis.input.elt.focus();}, 1);
			} else {
				this.stopInput();
			}
		} else if (cc(3/5*width, 0, 2/5*width, topHeight)) {
			//Player 2 name
			if (this.editName === "none") {
				this.input = createInput(this.leftName);
				this.input.position(30, 40);
				this.editName = "right";
				var tthis = this;
				setTimeout(function() {tthis.input.elt.focus();}, 1);
			} else {
				this.stopInput();
			}
		}
	}
	
	this.display = function() {
		strokeWeight(4);
		line(0, topHeight, width, topHeight);
		// 2/5 for each side
		line(2/5*width, 0, 2/5*width, topHeight);
		line(3/5*width, 0, 3/5*width, topHeight);
	}

	this.removeElement = function() {
		this.input.remove();
		this.input = null;
		this.editName = "none";
	}
	
	this.stopInput = function() {
		switch (this.editName) {
		case "none":
			break;
		case "left":
			this.leftName = this.input.value;
			this.removeElement();
			break;
		case "right":
			this.rightName = this.input.value;
			this.removeElement();
			break;
		}
	}
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
	this.x = 50;
	this.y = height/2;
	
	this.sx = 250;
	
	this.display = function() 
	{
		image(badmintonIcon,this.x, this.y/2, this.w, this.h);
		image(soccerIcon, this.x*6, this.y/2, this.w, this.h);
	}
	
	this.collide = function() 
	{
		var c = circleCollision(this.x, this.y/2, this.w, this.h, mouseX, mouseY, 1, 10);
		if (c == true) 
		{
			showMenu = false;
			badmintonActivated = true;
		}
		var cs = cc(this.x*6, this.y/2, this.w, this.h);
		if (cs == true) 
		{
			showMenu = false;
			soccerActivated = true;
		}
	}
}
var i1 = 0;
var i2 = 0;
function Badminton()
{
	this.score = 0;
	this.score12 = 0;
	this.score13 = 0;
	
	this.score2 = 0;
	this.score22 = 0;
	this.score23 = 0;
	
	this.player1Score = 0;
	this.player2Score = 0;
	
	this.player1x = 0;
	this.playery = topHeight;
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
		line(0, this.h+this.playery, width, this.playery+this.h); 
		line(width/2, topHeight, width/2, height);
		
		//Sætene
		textAlign(CENTER);
	}
	
	this.saet = function() 
	{
		text(this.score, this.player1x+this.w/2, this.playery*2);
		text(this.score12, this.player1x+this.w/2, this.playery*3);
		text(this.score13, this.player1x+this.w/2, this.playery*4);
		
		
		text(this.score2, this.player2x+this.w/2, this.playery*2);
		text(this.score22, this.player2x+this.w/2, this.playery*3);
		text(this.score23, this.player2x+this.w/2, this.playery*4);
		
		if (this.player1Score == 22 && this.player2Score != 22|| this.player1Score == 33) 
		{
			foo.speak("Player 1 won the match");
			textSize(80);
			text("Player 1 has won the match", width/2, height/21);
		}
		
		if (this.player2Score == 22 && this.player1Score < 11|| this.player2Score == 33) 
		{
			textSize(80);
			text("Player 2 has won the match", width/2, height/2);
		}
	}
	
	this.collide = function()
	{
		var c = circleCollision(this.player1x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c == true && i1 == 0 && i2 == 0)
		{
			if (this.score != 11 && this.score2 != 11) {
				this.score++;
				this.player1Score++;
				foo.speak(this.score + "  " + this.score2 + " to player 1");
			} else if(this.score12 != 11 && this.score22 != 11)
			{
				if (this.score == 11) foo.speak("Sæt færdig gjort");
				this.score12++;
				this.player1Score++;
				foo.speak(this.score12 + "  " + this.score22 + " to player 1");
			} else if(this.score13 != 11 && this.score23 != 11) 
			{
				if (this.score12 == 11) foo.speak("Sæt færdig gjort");
				this.score13++;
				this.player1Score++;
				foo.speak(this.score13 + "  " + this.score23 + " to player 1");
			}
			i1 = 20;
			i2 = 20;
			this.col = color(255, 0, 0);
		}
		var c2 = circleCollision(this.player2x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c2 == true && i2 == 0 && i1 == 0)
		{
			
			i2 = 20;
			i1 = 20;
			this.col2 = color(255, 0, 0);
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
	this.y = height-35;
	
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
			badmintonActivated = false;
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
