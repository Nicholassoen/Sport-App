var showMenu = true;
var badmintonActivated = false;
var soccerActivated = false;
var badmintonIcon;
var badIcon;
var surpriseIcon;
var surprise = false;
var timerStarted = true;
var bottomBox1;
function preload()
{
	surpriseIcon = loadImage("kartofler.png");
	badmintonIcon = loadImage("badminton.svg");
	soccerIcon = loadImage("soccer.png");
}

var foo;
function setup() {
	createCanvas(windowWidth, windowHeight);
	startButton1 = new startButton();
	badminton = new Badminton();
	Football = new football();
	topBox1 = new topBox();
	bottomBox1 = new bottomBox();
	foo = new p5.Speech();
	foo.speak("Voice initialized");
	frameRate(30);
}

function windowResized() 
{
	resizeCanvas(windowWidth, windowHeight);
	bottomBox1.resized();
}

var noSleep;
function enableNoSleep() {
	noSleep = new NoSleep();
	noSleep.enable();
	document.removeEventListener('click', enableNoSleep, false);
}
// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
document.addEventListener('click', enableNoSleep, false);
var mouseDelay = 0;


var modified = true;
function draw() {
	if (!modified) {
		if (!(soccerActivated && Football.timeTextOutdated())) {
			//console.log("not updating");
			return;			
		}
	}
	modified = false;
	//console.log("updating");
	
	background(220);
	fill(255, 255, 255);
	strokeWeight(1);
	if (mouseDelay > 0) mouseDelay--;
	if (showMenu == true)  
	{
		startButton1.display();
		startButton1.resetButton();
	}

	if (badmintonActivated == true) 
	{
		badminton.display();
		badminton.update();
		badminton.saet();
		bottomBox1.display();
		topBox1.display();
	}
	if (soccerActivated == true) 
	{
		Football.display();
		Football.update();
		bottomBox1.display();
		topBox1.display();
		Football.timer();
		Football.showMenu();
	}
	if (surprise == true) 
	{
		image(surpriseIcon, 200, 200);
	}
}
function mousePressed()
{
	modified = true;
	if (mouseDelay < 2) mouseDelay++;
	if (showMenu == true)
	{
		startButton1.collide();
		startButton1.resetButtonCollide();
	}
	
	if (badmintonActivated == true) 
	{
		badminton.collide();
		bottomBox1.collide();
		topBox1.collide();
	}
	if (soccerActivated) 
	{
		Football.collide();
		Football.collide();
		bottomBox1.collide();
		topBox1.collide();
		Football.clickedTimer();
	}

	return false
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
	//ellipse(closeX, closeY, 30, 30);
	if (d <= amount)
	{
		return true;
	} else {
		return false;
	}
}

function cc(x, y, w, h) {
	return circleCollision(x, y, w, h, mouseX, mouseY, 1, 1);
}

var topHeight = 110;
function topBox() {
	this.leftName = "Player 1";
	this.rightName = "Player 2";
	this.editName = "none";
	this.input = null;
	this.leftBox = null;
	this.middleBox = null;
	this.rightBox = null;
	this.collide = function() {
		if (cc(0,0,2/5*width, topHeight)) {
			//Player 1 name
			if (this.editName === "none") {
				this.input = createInput(this.leftName);
				this.editName = "left";
				this.placeInput();
				var tthis = this;
				setTimeout(function() {tthis.input.elt.focus();}, 1);
			} else {
				this.stopInput();
			}
		} else if (cc(3/5*width, 0, 2/5*width, topHeight)) {
			//Player 2 name
			if (this.editName === "none") {
				this.input = createInput(this.rightName);
				this.editName = "right";
				this.placeInput();
				var tthis = this;
				setTimeout(function() {tthis.input.elt.focus();}, 1);
			} else {
				this.stopInput();
			}
		} else if (this.input) {
			this.stopInput();
		}
	}

	//Must be called after this.display
	this.placeInput = function() {
		if (!this.input) {
			return;
		}

		if (this.editName === "left") {
			var box = this.leftBox;
		} else {
			var box = this.rightBox;
		}

		var mbox = box.addMargin(10);
		this.input.size(mbox.w, mbox.h);
		this.input.position(mbox.x, mbox.y);
		this.input.elt.style.fontSize = (mbox.h*(2/3))+"px";
		if (!this.input.elt.onkeypress) {
			var that = this;
			this.input.elt.onkeypress = function(e) {
				if (e.keyCode == 13) {
					that.stopInput();
				}
			}
		}
	}
	
	this.display = function() {
		this.leftBox = new boks(0, 0, 2/5*width, topHeight);
		this.middleBox = new boks(2/5*width, 0, 1/5*width, topHeight);
		this.rightBox = new boks(3/5*width, 0, 2/5*width, topHeight);

		var leftm = this.leftBox.addMargin(10);

		var rightm = this.rightBox.addMargin(10);

		noFill();
		strokeWeight(3);
		textSize(leftm.h*9/10);
		if (this.editName !== "left") {
			text(this.leftName, leftm.x, leftm.y, leftm.w, leftm.h);
		}
		if (this.editName !== "right") {
			text(this.rightName, rightm.x, rightm.y, rightm.w, rightm.h);
		}
		
		strokeWeight(4);
		line(0, topHeight, width, topHeight);
		// 2/5 for each side
		line(2/5*width, 0, 2/5*width, topHeight);
		line(3/5*width, 0, 3/5*width, topHeight);

		this.placeInput();
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
			this.leftName = this.input.value();
			this.removeElement();
			break;
		case "right":
			this.rightName = this.input.value();
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
	
	var w = 100;
	var h = 100;
	var x = width/2;
	var y = 50;
	this.resetButton = function() 
	{
		fill(255, 255, 255);
		rect(x-w/2, y, w, h);
		fill(255, 0, 0);
		textAlign(CENTER);
		text("Reset", x+w/12, y+h/2);
	}
	this.resetButtonCollide = function() 
	{
		var d = cc(x, y, w, h);
		print(d);
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
	this.h = height-topHeight-bottomHeight;
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

		//vertical divider line
		line(width/2, topHeight, width/2, height-bottomHeight);
		
		//Sætene
		textAlign(CENTER);
	}
	
	this.saet = function() 
	{
		textSize(100);
		text(this.score, this.player1x+this.w/2, this.playery*2);
		text(this.score12, this.player1x+this.w/2, this.playery*3);
		text(this.score13, this.player1x+this.w/2, this.playery*4);
		
		
		text(this.score2, this.player2x+this.w/2, this.playery*2);
		text(this.score22, this.player2x+this.w/2, this.playery*3);
		text(this.score23, this.player2x+this.w/2, this.playery*4);
		
		if (this.player1Score == 2 && this.player2Score == 1 || this.player1Score == 2 && this.player2Score == 0 || this.player1Score == 3) 
		{
			foo.speak(topBox1.leftName + " won the match");
			textSize(80);
			fill(255, 0, 0);
			text(topBox1.leftName + " won the match", width/2, height/2);
		}
		
		if (this.player2Score == 2 && this.player1Score == 1 || this.player2Score == 2 && this.player1Score == 0 || this.player2Score == 3)
		{
			textSize(80);
			fill(255, 0, 0);
			text(topBox1.rightName + " won the match", width/2, height/2);
			foo.speak(topBox1.rightName + " won the match");
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
				foo.speak(this.score + "  " + this.score2 + " to " + topBox1.leftName);
				if (this.score == 11) 
				{
					this.player1Score++;
				}
			} else if(this.score12 != 11 && this.score22 != 11)
			{
				if (this.score == 11) foo.speak("Sæt færdig gjort");
				this.score12++;
				foo.speak(this.score12 + "  " + this.score22 + " to " + topBox1.leftName);
				if (this.score12 == 11) 
				{
					this.player1Score++;
				}
			} else if(this.score13 != 11 && this.score23 != 11) 
			{
				if (this.score12 == 11) foo.speak("Sæt færdig gjort");
				this.score13++;
				this.player1Score++;
				foo.speak(this.score13 + "  " + this.score23 + " to " + topBox1.leftName);
				if (this.score13 == 11) 
				{
					this.player1Score++;
				}
			}
			i1 = 20;
			i2 = 20;
			this.col = color(255, 0, 0);
		}
		var c2 = circleCollision(this.player2x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c2 == true && i2 == 0 && i1 == 0)
		{
			if (this.score2 != 11 && this.score != 11) {
				this.score2++;
				foo.speak(this.score2 + "  " + this.score + " to " + topBox1.rightName);
				if (this.score2 == 11) 
				{
					this.player2Score++;
				}
			} else if(this.score22 != 11 && this.score12 != 11)
			{
				if (this.score2 == 11) foo.speak("Sæt færdig gjort");
				this.score22++;
				foo.speak(this.score22 + "  " + this.score12 + " to " + topBox1.rightName);
				if (this.score22 == 11) 
				{
					this.player2Score++;
				}
			} else if(this.score23 != 11 && this.score13 != 11) 
			{
				if (this.score22 == 11) foo.speak("Sæt færdig gjort");
				this.score23++;
				foo.speak(this.score23 + "  " + this.score13 + " to " + topBox1.rightName);
				if (this.score23 == 11) 
				{
					this.player2Score++;
				}
			}		
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

var bottomHeight = 150;
function bottomBox() {
	this.makeBoxes = function() {
		this.boxLeft = new boks(0, height-bottomHeight, width/3, bottomHeight);
		this.boxCenter = new boks(width/3, height-bottomHeight, width/3, bottomHeight);
		this.boxRight = new boks(2*width/3, height-bottomHeight, width/3, bottomHeight);

		var margin = min(width, bottomHeight)/10;
		this.boxLeftM = this.boxLeft.addMargin(margin);
		this.boxCenterM = this.boxCenter.addMargin(margin);
		this.boxRightM = this.boxRight.addMargin(margin);
	}
	this.makeBoxes();

	this.resized = function() {
		this.makeBoxes();
	}
	
	this.display = function() 
	this.collide = function() 
	{
		if (this.boxCenter.cc()) {
			showMenu = true;
			badmintonActivated = false;
			soccerActivated = false;
		}
	}
}

function ourTriangle(box, pointLeft)
{
	//Find square area at center
	if (box.w > box.h) {
		var diff = box.w - box.h;
		var x1 = Math.floor(box.x + diff/2);
		var y1 = box.y;
		var w1 = box.h;
		var h1 = box.h;
	} else {
		var diff = box.h - box.w;
		var x1 = box.x;
		var y1 = Math.floor(box.y + diff/2);
		var w1 = box.w;
		var h1 = box.w;
	}

	if (pointLeft) {
		triangle(x1, y1+h1/2, x1+w1, y1, x1+w1, y1+h1);
	} else {
		triangle(x1, y1, x1, y1+h1, x1+w1, y1+h1/2);
	}
}

function boks(x, y, w ,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
        var that = this
  
	this.addMargin = function(margin) {
		//Make margin
		x1 = this.x + margin;
		y1 = this.y + margin;
		w1 = this.w - 2*margin;
		h1 = this.h - 2*margin;
		return new boks(x1, y1, w1, h1);
	};

	this.cc = function() {
		return circleCollision(this.x, this.y, this.w, this.h, mouseX, mouseY, 1, 1);
	}
}
/*if (cc == true) 
		{
			badminton.score = 0;
			badminton.score12 = 0;
			badminton.score13 = 0;
			
			badminton.score2 = 0;
			badminton.score22 = 0;
			badminton.score23 = 0;
			
			badminton.player1Score = 0;
			badminton.player2Score = 0;
		}*/