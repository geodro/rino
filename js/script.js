/* Author: 
	George Dumitrescu
*/

var a = 0;

/*
window.ondevicemotion = function(event) {
   var x = Math.round(event.accelerationIncludingGravity.x*1/1);
   var y = Math.round(event.accelerationIncludingGravity.y*1/1);
   var z = Math.round(event.accelerationIncludingGravity.z*1/1);
   
   if(x >= 0) { x = '+' + x}
   if(y >= 0) { y = '+' + y}
   if(z >= 0) { z = '+' + z}
   
   x_dom.text(x);
   y_dom.text(y);
   z_dom.text(z);
}
*/

function GCircle(parent, x, y, radius) {

	var $this = this;
	
	$this.display = true;
	$this.over = false;
	
	$this.x = x;
	$this.y = y;
	
	$this.radius = radius;
	if ($this.radius == undefined)
		$this.radius = 50.0;
	
	$this.run = function (processing, a) {
	
		if ($this.display == true) {
	
			$this.radius = $this.radius + processing.sin( processing.frameCount / 4 );
		
			if ($this.over == false)
				processing.fill( 0, 121, 184);
			else
				processing.fill(10, 10, 100);
		
		
		
			if (processing.mouseX > a + this.x - $this.radius/2 && processing.mouseX < a + this.x + $this.radius/2 && processing.mouseY > $this.y - $this.radius / 2 && processing.mouseY < $this.y + $this.radius / 2) {
			
				$this.over = true;
			      
			} else {
			
				$this.over = false;
				
			}
			
			processing.ellipse(a + $this.x, $this.y, $this.radius, $this.radius );
		
		}
		
	
	}
	
	return $this;

}

var panorama = new function() {

	var $this = this;				
	
	$this.a = 0;
	
	$this.selector = undefined;
	//$this.width = 3889;
	//$this.height = 748;
	
	$this.width = 13434;
	$this.height = 2609;
	
	$this.currentWidth = 0;
	$this.currentHeight = 0;
	
	$this.canvas = undefined;
	
	$this.p = undefined;
	
	$this.radius = 50.0;
	
	$this.sketch = new Processing.Sketch();
	
	$this.circles = new Array();
	
	$this.run = function (selector, processing) {

		$this.selector = selector;
		
		$this.canvas = document.getElementById("canvas1");
	
		if ($this.selector == undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.update();
		
		$this.sketch.imageCache.add('img/bkg.jpg');
		
		for ($i = 0; $i < 3; $i++) {
		
			xRand = Math.round(Math.random()*10);
			yRand = Math.round(Math.random()*5);
			$this.circles[$i] = new GCircle($this, $i*100*xRand*2, 100*yRand);
		
		}
		
		$this.p = new Processing($this.canvas, $this.sketch);
	
	}
	
	$this.update = function () {
	
		$this.currentHeight = $this.selector.height(); 
		
		$this.currentWidth = Math.round($this.currentHeight * $this.width / $this.height);
		
		if ($this.p != undefined)
			$this.p.size($this.selector.parent().width(), $this.currentHeight);
		
	}
	
	$this.rotate = function (a) {
	
		a = Math.round(a*100/1)/100
	
		var diff = (0 + ($this.currentWidth*a)/360) - $this.currentWidth / 2 + $this.selector.parent().width() / 2;
		
		//$this.selector.stop().animate({marginLeft: 0 - diff}, 500, 'linear');
		
		diff = Math.round(diff*10)/10;
		
		$this.a = diff;
		
		//$this.selector.css('marginLeft', 0 - diff);
		
		$('.nfo').html(a);
	
	}
	
	$this.center = function() {
	
		var diff = $this.currentWidth / 2 - $this.selector.parent().width() / 2;
		
		$this.selector.css('marginLeft', 0 - diff);
	
	}
	
	$this.sketch.attachFunction = function(processing) {
	
		processing.setup = function() {
			processing.size($this.selector.parent().width(), $this.currentHeight);
			img = processing.loadImage("img/bkg.jpg");
		};
		
		processing.draw = function() {
		    
		    var centerX = processing.width / 2, centerY = processing.height / 2;
		    
		    // erase background
		    processing.background(255);
		    
		    processing.image(img, $this.a, 0, $this.currentWidth, $this.currentHeight);
		    
		    processing.image(img, $this.a - $this.currentWidth, 0, $this.currentWidth, $this.currentHeight);
		    
		    processing.image(img, $this.a + $this.currentWidth, 0, $this.currentWidth, $this.currentHeight);
		    
		    for ($i = 0; $i < 3; $i++) {
			    $this.circles[$i].run(processing, $this.a);
		    }
		
		    
		 };
		  
		processing.mouseMoved = function() {
		
			b = processing.mouseX;
			
			if (processing.mouseX >= panorama.selector.parent().width() / 2) {
			
				b = b - panorama.selector.parent().width() / 2;
				
				a = 0 - b * 360 / panorama.selector.parent().width();
				
			} else {
			
				a = 180 - b * 360 / panorama.selector.parent().width();
			
			}
			
			a = Math.round(a*100/1)/100;
					
			panorama.rotate(a);
		 
		}
		
		processing.mousePressed = function() {
		
			for ($i = 0; $i < 3; $i++) {
				if ($this.circles[$i].over == true)
				    $this.circles[$i].display = false;
			}
		
		}
		
	
	}

	return $this;
}

$(document).ready(function(){

	setTimeout(function() { window.scrollTo(0, 1) }, 100);

	panorama.run($('.main'));
	
	$(window).resize(function(){
			
		panorama.update();
			
	});	
	
	window.ondeviceorientation = function(event) {
		
		//if (panorama.selector.parent().width() > panorama.currentHeight)
			a = Math.round(event.alpha*10/1)/10;
		//else {
		//	a = Math.round(event.beta*10/1)/10;
		//}
		
		if (a > 180) {
		
			a = 0 - (360 - a);
		
		}
		
		if (a == undefined)
			a = 0;
		
		panorama.rotate(a);
		
	}

});