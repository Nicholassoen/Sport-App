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
	modified = true;
	resizeCanvas(windowWidth, windowHeight);
	bottomBox1.resized();
	Football.resized();
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
	}

	if (badmintonActivated == true) 
	{
		badminton.display();
		badminton.saet();
		bottomBox1.display();
		topBox1.display();
		bottomBox1.resetButton();
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
	}
	
	if (badmintonActivated == true) 
	{
		badminton.collide();
		bottomBox1.collide();
		bottomBox1.resetButtonCollide();
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
		text("Reset", width/2, y+h/2);
	}
	this.resetButtonCollide = function() 
	{
		var d = cc(x, y, w, h);
		print(d);
		if (cc == true) 
		{
			badminton.score = 0;
			badminton.score12 = 0;
			badminton.score13 = 0;
			
			badminton.score2 = 0;
			badminton.score22 = 0;
			badminton.score23 = 0;
			
			badminton.player1Score = 0;
			badminton.player2Score = 0;
			
			
		}
		
	}
}
var bottomHeight = 150;
function bottomBox() {
	this.makeBoxes = function() {
		this.boxLeft = new boks(0, height-bottomHeight, width/4, bottomHeight);
		this.boxCenter = new boks(width/4, height-bottomHeight, width/3, bottomHeight);
		this.boxCenterRight = new boks(2*width/4, height-bottomHeight, width/4, bottomHeight);
		this.boxRight = new boks(3*width/4, height-bottomHeight, width/3, bottomHeight);

		var margin = min(width, bottomHeight)/10;
		this.boxLeftM = this.boxLeft.addMargin(margin);
		this.boxCenterM = this.boxCenter.addMargin(margin);
		this.boxRightM = this.boxRight.addMargin(margin);
	}
	this.makeBoxes();
	this.display = function() 
	{
		//line on top of bottom box
		line(0, height-bottomHeight, width,  height-bottomHeight);

		//Return bottom
		strokeWeight(10);
		fill(220);
		ellipse(this.boxCenterM.x+this.boxCenterM.w/2,
			this.boxCenterM.y+this.boxCenterM.h/2,
			min(this.boxCenterM.w, this.boxCenterM.h)
		       );

		//Undo button
		ourTriangle(this.boxLeftM, true);

		//Redo button
		ourTriangle(this.boxRightM, false);
	}
	this.resized = function() {
		this.makeBoxes();
	}
	this.collide = function() 
	{
		if (this.boxCenter.cc()) {
			showMenu = true;
			badmintonActivated = false;
			soccerActivated = false;
		}
	}
	
	this.resetButton = function() 
	{
		fill(255, 255, 255);
		rect(this.boxCenterRight.x, this.boxCenterRight.y, this.boxCenterRight.w, this.boxCenterRight.h);
		fill(255, 0, 0);
		textAlign(CENTER);
		text("Reset", this.boxCenterRight.x+this.boxCenterRight.w/2, this.boxCenterRight.y+this.boxCenterRight.h/2);
	}
	this.resetButtonCollide = function() 
	{
		if (this.boxCenterRight == true) 
		{
			badminton.score = 0;
			badminton.score12 = 0;
			badminton.score13 = 0;
			
			badminton.score2 = 0;
			badminton.score22 = 0;
			badminton.score23 = 0;
			
			badminton.player1Score = 0;
			badminton.player2Score = 0;
			
			
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