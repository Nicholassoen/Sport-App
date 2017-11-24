function football()
{
	this.team1Score = 0;
	this.team2Score = 0;
	
	this.col = color(255, 255, 255);
	this.col2 = color(255, 255, 255);
	this.col3 = color(255, 255, 255);
	this.startTime = 0;
	this.maxTime = 5;

	this.resized = function() {
		this.player1x = 0;
		this.playery = topHeight;
		this.player2x = width/2;
		this.w = width/2;
		this.h = height - topHeight - bottomHeight;
		this.ellipseX = width/2;
		this.ellipseY = topHeight/2;
	};
	this.resized();

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
		line(width/2, topHeight, width/2, height-bottomHeight);
		textSize(200);
		textAlign(CENTER);
		text(this.team1Score, this.w/2, this.h/2+150);
		
		text(this.team2Score, this.player1x+this.w*1.5, this.h/2+150);
	}

	this.doubleClickDisabled = false;
	this.collide = function()
	{
		if (this.doubleClickDisabled) {
			return;
		}
		
		var c = circleCollision(this.player1x, this.playery, this.w, this.h,
					mouseX, mouseY, 1, 1);
		var clicked = false;
		if (c == true)
		{
			this.col = color(255, 0, 0);
			this.team1Score++;
			foo.speak(this.team1Score + "  " + this.team2Score + " til " + topBox1.leftName);
			clicked = true;
		}
		var c2 = circleCollision(this.player2x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c2 == true)
		{
			this.col2 = color(255, 0, 0);
			this.team2Score++;
			foo.speak(this.team2Score + "  " + this.team1Score + " til " + topBox1.rightName);
			clicked = true;
		}

		if (clicked) {
			this.doubleClickDisabled = true;
			var that = this;
			setTimeout(function() {that.doubleClickDisabled=false;}, 100);
			setTimeout(function() {
				that.col = color(255, 255, 255);
				that.col2 = color(255, 255, 255);
				modified = true;
			}, 300);
		}

	}
	
	this.timerStarted = false;
	this.combinedTimeMin = 0;
	this.lastTime = 0;
	this.timeTextOutdated = function() {
		var d = new Date();
		return round(d.getTime()/1000) != this.lastTime;
	};
	
	this.timer = function() 
	{
		fill(this.col3);
		ellipse(this.ellipseX, this.ellipseY, 120);
		fill(255, 255, 255);
		textAlign(CENTER);
		textSize(20);
		console.log(timerStarted);
		if (this.timerStarted) {
			var date = new Date();
			var n = date.getTime();
			this.lastTime = round(date.getTime()/1000);
			var combinedTime = (this.lastTime-this.startTime);
			var secondText = combinedTime%60;
			if (secondText < 10) {
				secondText = "0" + secondText;
			}
			var timeText = Math.floor(combinedTime/60) + " : " + secondText;
		} else {
			var timeText = "0 : 00";
		}
		text(timeText, this.ellipseX, this.ellipseY);
		if (secondText >= this.maxTime*60) 
		{
			text("Spillet er færdigt", width/2, height/2);
			foo.speak("Spillet er færdigt")
		}
		if (Math.floor(combinedTime/60) >= 45)
		{
			this.col3 = color(255, 0, 0);
		} else {
			this.col3 = color(255, 255, 255);
		}
	}
	this.clickedTimer = function()
	{
		var d = dist(this.ellipseX, this.ellipseY, mouseX, mouseY);
		if (d < 120) {
			if (this.timerStarted === false) {
				this.timerStarted = true;
			}
			var date = new Date();
			var ne = date.getTime();
			this.startTime = round(date.getTime()/1000);
			this.combinedTimeMin = 0;
		}
	}
	
	this.showMenu = function() 
	{
		var x = width/2-200;
		var y = 80;
		var w = 400-20;
		var h = 100-20;
		rect(x, y, 400, 400);
		
		rect(x+10, y+10, w, h);
		text("10 minutter" ,x+10+w/2, y+10+h/2);
		
		rect(x+10, y+105, w, h);
		text("20 minutter" ,x+10+w/2, y+105+h/2);
		
		rect(x+10, y+200, w, h);
		text("30 minutter" ,x+10+w/2, y+200+h/2);
		
		rect(x+10, y+300, w, h);
		text("45 minutter" ,x+10+w/2, y+300+h/2);
	}
	this.clickedMenu = function() 
	{
		var x = width/2-200;
		var y = 80;
		var w = 400-20;
		var h = 100-20;
		
		var c = cc(x+10, y+10, w, h);
		if (c) {this.maxTime = 10; showSoccerMenu = false;}
		
		var c2 = cc(x+10, y+105, w, h);
		if (c2) {this.maxTime = 20; showSoccerMenu = false;}
		
		var c3 = cc(x+10, y+200, w, h);
		if (c3) {this.maxTime = 30; showSoccerMenu = false;}
		
		var c4 = cc(x+10, y+300, w, h);
		if (c4) {this.maxTime = 45; showSoccerMenu = false;}
	}
}
