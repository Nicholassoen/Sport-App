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
	}
}