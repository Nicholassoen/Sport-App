function bEvent(name, p11, p12, p13, p21, p22, p23) {
	this.name = name;
	this.p11 = p11;
	this.p12 = p12;
	this.p13 = p13;
	this.p21 = p21;
	this.p22 = p22;
	this.p23 = p23;
}

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
	
	this.col = color(255, 255, 255);
	this.col2 = color(255, 255, 255);

	this.resized = function() {
		this.player1x = 0;
		this.playery = topHeight;
		this.player2x = width/2;
		this.w = width/2;
		this.h = height-topHeight-bottomHeight;
	}
	this.resized();
	
	this.display = function()
	{
		noStroke();
		textSize(topHeight/2);
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
		textSize(height/10);
		offset1 = this.playery + 2*this.h/10;
		offset2 = this.playery + 5*this.h/10;
		offset3 = this.playery + 8*this.h/10;
		
		text(this.score, this.player1x+this.w/2, offset1);
		text(this.score12, this.player1x+this.w/2, offset2);
		text(this.score13, this.player1x+this.w/2, offset3);
		
		
		text(this.score2, this.player2x+this.w/2, offset1);
		text(this.score22, this.player2x+this.w/2, offset2);
		text(this.score23, this.player2x+this.w/2, offset3);
		
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

	this.doubleClickDisabled = false;
	this.collide = function()
	{
		if (this.doubleClickDisabled) {
			return;
		}

		var clicked = false;
		if (cc(this.player1x, this.playery, this.w, this.h)) {
			this.addEvent();
			this.clickLeft();
			clicked = true;
		} else if (cc(this.player2x, this.playery, this.w, this.h)) {
			this.addEvent();
			this.clickRight();
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

	this.clickLeft = function() {
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
			foo.speak(this.score13 + "  " + this.score23 + " to " + topBox1.leftName);
			if (this.score13 == 11) 
			{
				this.player1Score++;
			}
		}		
		this.col = color(255, 0, 0);
	}

	this.clickRight = function() {
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
		this.col2 = color(255, 0, 0);
	}


	this.reset = function() {
		this.addEvent();
		
		badminton.score = 0;
		badminton.score12 = 0;
		badminton.score13 = 0;
				
		badminton.score2 = 0;
		badminton.score22 = 0;
		badminton.score23 = 0;
				
		badminton.player1Score = 0;
		badminton.player2Score = 0;
	}
	
	/*Event queue functions */
	this.eventQ = [];
	this.eventQRedo = [];

	this.getState = function() {
		var e = new bEvent("point",
				   this.score, this.score12, this.score13,
				   this.score2, this.score22, this.score23
				  );
		return e;
	}
	
	this.addEvent = function() {
		var e = this.getState();
		this.eventQ.push(e);
	}
	this.addEvent(); //Initial state (0-0)

	this.applyE = function(e) {
		this.score = e.p11;
		this.score12 = e.p12;
		this.score13 = e.p13;
		this.score21 = e.p21;
		this.score22 = e.p22;
		this.score23 = e.p23;
	}

	this.undo = function() {
		if (this.eventQ.length > 0) {
			var eNow = this.getState();
			this.eventQRedo.push(eNow);
			var e = this.eventQ.pop();
			this.applyE(e);
		}
	}

	this.redo = function() {
		console.log("here3");
		if (this.eventQRedo.length > 0) {
			console.log("here4");
			var eNow = this.getState();
			this.eventQ.push(eNow);
			var e = this.eventQRedo.pop();
			this.applyE(e);
		}		
	}
}

