/****************************************
 * Sprite constructor
 */
Kinetic.Sprite = function(config, layerType){
	var animations = config.animations || new Array();
	var currentAnimation = config.currentAnimation || 0;
	
	// we need in inherit the SHAPE properties/methods in order for us to add this to the stage.
	for (var key in animations[currentAnimation]) {
        this[key] = animations[currentAnimation][key];
    }
	
	this.animations = animations;
	this.currentAnimation = currentAnimation;

	this.animate = function(timeDelta){
		
		var anim = this.animations[this.currentAnimation];
		anim.animate(timeDelta);
		this.drawFunc = anim.drawFunc;
	}
	
	this.start = function() {
		this.animations[this.currentAnimation].start();
	}
};

/****************************************
 * Animation constructor
 */
Kinetic.Animation = function(config){
	var frames = config.frames;
	var currFrame = config.currFrame || 0;

    /*
     * copy shape methods and properties to
     * Image object
     */
    for (var key in frames[currFrame]) {
        this[key] = frames[currFrame][key];
    }

	// The storyline is an array of integers that determines which order the frames are played in. 
	// If not supplied, it will play in order the frames are added ( {0, 1, 2, ... n} ):
	if (config.storyLine)
	{
		this.storyLine = config.storyLine;
	} else {
		var sl = new Array(frames.length);
		for (var s = 0; s < frames.length; s++)
			sl[s] = s;
		this.storyLine = sl;
	}
	
	// the speed, in milliseconds, that the animation should switch to the next frame:
	this.speed = config.speed || 1000;
	
	// the method to call when the animation is complete.
	this.callBack = config.callBack;
	
	// during the game loop, we decrement this variable by how much time elapsed.
	this.currTime = config.speed;
	
	this.loop = config.loop;
	if (!config.loop) this.loop = true;
	
	// retain specific settings that pertain to this object
	this["frames"] = frames;
	this["currFrame"] = currFrame;
	
	this.animating = true;
	
	this.start = function(){
		this.currFrame = 0;
		this.animating = true;
	}
	
	this.animate = function(timeDelta){
		this.currTime -= timeDelta;
		
		if (this.currTime <= 0) {
			this.currTime = this.speed + this.currTime;
			if (this.currTime < 0) this.currTime = this.speed; //eat up any "catchup"
			var nextFrame = this.currFrame + 1;
			if (nextFrame < this.storyLine.length) {
				this.currFrame = nextFrame;
			} else {
				if (this.callBack && this.animating) this.callBack();
				if (this.loop)
					this.currFrame = 0;
				else
					this.animating = false;
			}
		}
		//reset which draw function is called when the stage is re-drawn
		this.drawFunc = this.frames[this.storyLine[this.currFrame]].drawFunc;
	}
};

/****************************************
 * frame constructor
 */
Kinetic.Frame = function(config, layerType){
    this.image = config.image;
	
    var sX = config.imageData[0];
    var sY = config.imageData[1];
    var sW = config.imageData[2];
    var sH = config.imageData[3];
	
    var dX = config.imageData[4] || 0;
    var dY = config.imageData[5] || 0;
    var dW = config.imageData[6] || sW;
    var dH = config.imageData[7] || sH;
	
    var drawImage = function(){
        var context = this.getContext();
		context.drawImage(this.image, sX, sY, sW, sH, dX, dY, dW, dH);
        context.beginPath();
        context.rect(dX, dY, dW, dH);
        context.closePath();
    };
    var shape = new Kinetic.Shape(drawImage, layerType);
    
    /*
     * copy shape methods and properties to
     * Image object
     */
    for (var key in shape) {
        this[key] = shape[key];
    }
	
};