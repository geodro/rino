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
	
	$this.run = function (processing, a, b) {
	
		if ($this.display == true) {
	
			$this.radius = $this.radius + processing.sin( processing.frameCount / 4 );
		
			if ($this.over == false)
				processing.fill( 0, 121, 184);
			else
				processing.fill(10, 10, 100);
		
		
		
			if (processing.mouseX > a + this.x - $this.radius/2 && processing.mouseX < a + this.x + $this.radius/2 && processing.mouseY > $this.y + b - $this.radius / 2 && processing.mouseY < $this.y + b + $this.radius / 2) {
			
				$this.over = true;
			      
			} else {
			
				$this.over = false;
				
			}
			
			processing.ellipse(a + $this.x, b + $this.y, $this.radius, $this.radius );
		
		}
		
	
	}
	
	return $this;

}

var panorama = new function() {

	var $this = this;				
	
	$this.a = 0;
	$this.b = 0;
	
	$this.selector = undefined;
	//$this.width = 3889;
	//$this.height = 748;
	
	$this.width = 9268;
	$this.height = 1800;
	$this.tile = 1853;
	$this.tileNr = 5;
	
	$this.currentWidth = 0;
	$this.currentHeight = 0;
	$this.currentHeightPadding = 0;
	
	$this.pixelRatio = 1;
	
	$this.canvas = undefined;
	
	$this.p = undefined;
	
	$this.radius = 50.0;
	
	$this.sketch = new Processing.Sketch();
	
	$this.circles = new Array();
	
	$this.run = function (selector, processing) {
	
		if (window.devicePixelRatio !== undefined)
			$this.pixelRatio = 1;

		$this.selector = selector;
		
		$this.canvas = document.getElementById("canvas1");
	
		if ($this.selector == undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.update();
		
		$this.sketch.imageCache.add('img/bkg.jpg');
		$this.sketch.imageCache.add('img/bkg_0.jpg');
		$this.sketch.imageCache.add('img/bkg_1.jpg');
		$this.sketch.imageCache.add('img/bkg_2.jpg');
		$this.sketch.imageCache.add('img/bkg_3.jpg');
		$this.sketch.imageCache.add('img/bkg_4.jpg');
		
		for ($i = 0; $i < 3; $i++) {
		
			xRand = Math.round(Math.random()*10);
			yRand = Math.round(Math.random()*5);
			$this.circles[$i] = new GCircle($this, $i*100*xRand*2, 100*yRand);
		
		}
		
		$this.p = new Processing($this.canvas, $this.sketch);
	
	}
	
	$this.update = function () {
	
		$this.currentHeightPadding = Math.round($this.selector.height() / 5);
	
		$this.currentHeight = ($this.selector.height() + $this.currentHeightPadding) * $this.pixelRatio;
		
		$this.currentWidth = Math.round($this.currentHeight * $this.width / $this.height);
		
		if ($this.p != undefined)
			$this.p.size($this.selector.parent().width() * $this.pixelRatio, $this.selector.parent().height() * $this.pixelRatio);
		
	}
	
	$this.rotate = function (a, b) {
	
		a = Math.round(a*100/1)/100
	
		var diff = (0 + ($this.currentWidth*a)/360) - $this.currentWidth / 2 + $this.selector.parent().width() / 2;
		
		diff = Math.round(diff*10)/10;
		
		$this.a = diff;
		
		$this.b = 0 - b;
		
		$('.nfo').html($this.currentHeight);
	
	}
	
	$this.center = function() {
	
		var diff = $this.currentWidth / 2 - $this.selector.parent().width() / 2;
		
		$this.selector.css('marginLeft', 0 - diff);
	
	}
	
	$this.sketch.attachFunction = function(processing) {
	
		processing.setup = function() {
			processing.size($this.selector.parent().width() * $this.pixelRatio, $this.selector.parent().height() * $this.pixelRatio);
			imgs = new Array();
			for (var i = 0; i < $this.tileNr; i++) {
			
				imgs[i] = processing.loadImage("img/bkg_" + i + ".jpg");
			
			}
			img = processing.loadImage("img/bkg.jpg");
		};
		
		processing.draw = function() {
		    
		    var centerX = processing.width / 2, centerY = processing.height / 2;
		    
		    // erase background
		    processing.background(255);
		    
		    if ($this.pixelRatio > 1)
		    	processing.scale(1/$this.pixelRatio, 1/$this.pixelRatio);
		    	
			for (var i = 0; i < $this.tileNr; i++) {
			
				processing.image(imgs[i], $this.a + i * Math.round($this.currentWidth / $this.tileNr), $this.b, Math.round($this.currentWidth / $this.tileNr), $this.currentHeight);
			
			}
		    
		    //processing.image(img, $this.a, $this.b, $this.currentWidth, $this.currentHeight);
		    
		    processing.image(imgs[$this.tileNr - 1], $this.a - Math.round($this.currentWidth / $this.tileNr), $this.b, Math.round($this.currentWidth / $this.tileNr), $this.currentHeight);
		    
		    processing.image(imgs[0], $this.a + Math.round($this.currentWidth / $this.tileNr) * $this.tileNr, $this.b, Math.round($this.currentWidth / $this.tileNr), $this.currentHeight);
		    
		    for ($i = 0; $i < 3; $i++) {
			    $this.circles[$i].run(processing, $this.a, $this.b);
		    }
		
		    
		 };
		  
		processing.mouseMoved = function() {
		
			b = processing.mouseX;
			c = processing.mouseY;
			
			if (processing.mouseX >= panorama.selector.parent().width() / 2) {
			
				b = b - $this.selector.parent().width() / 2;
				
				b = 0 - b * 360 / $this.selector.parent().width();
				
			} else {
			
				b = 180 - b * 360 / $this.selector.parent().width();
			
			}
			
			c = c * $this.currentHeightPadding / $this.selector.parent().height();
			
			b = Math.round(b*100/1)/100;
			c = Math.round(c*100/1)/100;
					
			panorama.rotate(b, c);
		 
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
		b = Math.round(event.gamma*10/1)/10;
		//else {
		//	a = Math.round(event.beta*10/1)/10;
		//}
		
		if (a == undefined) a = 0;
		
		if (a > 180) a = 0 - (360 - a);
		
		if (b == undefined) b = 0;
		
		b = b + 50;
			
		if (b > 20) b = 20; else if (b < -20) b = -20;
		
		b = Math.round((b + 20) * panorama.currentHeightPadding / 40);
		
		panorama.rotate(a, b);
		
	}

});