function football()
{
	this.team1Score = 0;
	this.team2Score = 0;
	
	this.i1 = 0;
	this.i2 = 0;
	this.player1x = 0;
	this.playery = topHeight;
	this.player2x = width/2;
	this.w = width/2;
	this.h = height/1.44;
	this.col = color(255, 255, 255);
	this.col2 = color(255, 255, 255);
	this.col3 = color(255, 255, 255);
	this.startTime = 0;
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
		textSize(200);
		textAlign(CENTER);
		text(this.team1Score, this.w/2, this.h/2+150);
		
		text(this.team2Score, this.player1x+this.w*1.5, this.h/2+150);
	}
	
	this.collide = function()
	{
		var c = circleCollision(this.player1x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c == true && this.i1 == 0 && this.i2 == 0)
		{
			this.i1 = 20;
			this.i2 = 20;
			this.col = color(255, 0, 0);
			this.team1Score++;
			foo.speak(this.team1Score + "  " + this.team2Score + " to team 1");
		}
		var c2 = circleCollision(this.player2x, this.playery, this.w, this.h,
												 mouseX, mouseY, 1, 1);
		if (c2 == true && this.i2 == 0 && this.i1 == 0)
		{
			this.i2 = 20;
			this.i1 = 20;
			this.col2 = color(255, 0, 0);
			this.team2Score++;
		}
	}
	
	this.update = function() 
	{
		if (this.i1 == 0) 
		{
			this.col = color(255, 255, 255);
		}
		if (this.i2 == 0) 
		{
			this.col2 = color(255, 255, 255);
		}
		if (this.i1 > 0) this.i1--;
		if (this.i2 > 0) this.i2--;
	}
	this.ellipseX = width/2;
	this.ellipseY = topHeight/2;
	this.combinedTimeMin = 0;
	this.lastTime = 0;
	this.timeTextOutdated = function() {
		var d = new Date();
		console.log(round(d.getTime()/1000) +"!="+ this.lastTime);
		return round(d.getTime()/1000) != this.lastTime;
	};
	
	this.timer = function() 
	{
		fill(this.col3);
		ellipse(this.ellipseX, this.ellipseY, 120);
		fill(255, 255, 255);
		var date = new Date();
		var n = date.getTime();
		this.lastTime = round(date.getTime()/1000);
		var combinedTime = (this.lastTime-this.startTime);
		textAlign(CENTER);
		textSize(20);
		var timeText = Math.floor(combinedTime/60) + " : " + combinedTime%60;
		text(timeText, this.ellipseX, this.ellipseY);
		
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
		rect(x, y, 400, 400);
		
		rect(x+10, y+10, 400-20, 100-20);
		var c = cc();
		rect(x+10, y+105, 400-20, 100-20);
		rect(x+10, y+200, 400-20, 100-20);
		rect(x+10, y+300, 400-20, 100-20);
	}
}
