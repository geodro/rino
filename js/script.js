/* Author: 
	George Dumitrescu
*/

var a = 0;

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

var panorama = new function () {

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
	$this.w = Math.round($this.width / $this.tileNr);
	$this.wf = Math.round($this.width / $this.tileNr - 1);
	
	$this.currentWidth = 0;
	$this.currentHeight = 0;
	$this.currentHeightPadding = 0;
	
	$this.pixelRatio = 1;
	
	//$this.canvas = undefined;
	$this.stage = undefined;
	
	$this.loader = undefined;
	
	$this.background = undefined;
	$this.bkgs = new Array();
	
	//$this.p = undefined;
	
	//$this.radius = 50.0;
	
	//$this.circles = new Array();
	
	$this.run = function (selector, processing) {
	
		if (window.devicePixelRatio !== undefined)
			$this.pixelRatio = 1;

		$this.selector = selector;
		
		//$this.canvas = document.getElementById("canvas1");
	
		if ($this.selector == undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.update();
		
		/*for ($i = 0; $i < 3; $i++) {
		
			xRand = Math.round(Math.random()*10);
			yRand = Math.round(Math.random()*5);
			$this.circles[$i] = new GCircle($this, $i*100*xRand*2, 100*yRand);
		
		}*/
		
		$this.loader = new PxLoader();
		
		for (var i = 0; i < $this.tileNr; i++) {
		
			$this.bkgs[i] = $this.loader.addImage("img/bkg_" + i + ".jpg");
		
		}
		
		$this.loader.addCompletionListener(function(){
		
			$this.render(true);
		
		});
		
		$this.loader.start();
	
	}
	
	$this.render = function (execute) {
	
		if (execute == true) {
	
			$this.stage = new Kinetic.Stage({
				container: 'main',
				width: $this.selector.width(),
				height: $this.selector.height(),
			});
			
			$this.stage.onContent("mousemove", function() {
                var mousePos = $this.stage.getMousePosition();
                
                b = mousePos.x;
    			c = mousePos.y;
    			
    			console.log('x: ' + b + ', y: ' + c);
    			
    			if (b >= panorama.selector.parent().width() / 2) {
    			
    				b = b - $this.selector.parent().width() / 2;
    				
    				b = 0 - b * 360 / $this.selector.parent().width();
    				
    			} else {
    			
    				b = 180 - b * 360 / $this.selector.parent().width();
    			
    			}
    			
    			c = c * $this.currentHeightPadding / $this.selector.parent().height();
    			
    			b = Math.round(b*100/1)/100;
    			c = Math.round(c*100/1)/100;
    					
    			panorama.rotate(b, c);
            })
			
			$this.background = new Kinetic.Layer();
			
			for (var i = 0; i < $this.tileNr; i++) {
						
				//processing.image(imgs[i], $this.a + i * Math.round($this.currentWidth / $this.tileNr), $this.b, Math.round($this.currentWidth / $this.tileNr), $this.currentHeight);
			
		        var img = new Kinetic.Image({
		            x: $this.a + i * $this.w,
		            y: $this.b,
		            image: $this.bkgs[i],
		            width: $this.w,
		            height: $this.currentHeight
		        });
		
		        // add the shape to the layer
		        $this.background.add(img);
	        }
	        
	        var img = new Kinetic.Image({
	            x: $this.a - $this.w,
	            y: $this.b,
	            image: $this.bkgs[$this.tileNr - 1],
	            width: $this.w,
	            height: $this.currentHeight
	        });
	        
	        $this.background.add(img);
	        
			var img = new Kinetic.Image({
			    x: $this.a + $this.tileNr * $this.w,
			    y: $this.b,
			    image: $this.bkgs[0],
			    width: $this.w,
			    height: $this.currentHeight
			});
			
			$this.background.add(img);
	        
	        $this.stage.add($this.background);
			
			$this.stage.onFrame(function(frame) {
				$this.animateBackground($this.background, frame);
			});
			
			$this.stage.start();
		}
		
		$('#main').find('canvas').css('left', 0);
	}
	
	$this.animateBackground = function (layer, frame) {
	
		var stage = layer.getStage();
		
        // update
        var shapes = layer.getChildren();
        

        for(var i = 0; i < shapes.length - 2; i++) {
            var shape = shapes[i];
            
            shape.setPosition($this.a + i * $this.wf, $this.b);
            shape.setSize($this.w, $this.currentHeight);
            
        }

		shapes[shapes.length - 2].setPosition($this.a - $this.w, $this.b);
		shapes[shapes.length - 2].setSize($this.w, $this.currentHeight);
		shapes[shapes.length - 1].setPosition($this.a + $this.tileNr * $this.w - $this.tileNr + 1, $this.b);
		shapes[shapes.length - 1].setSize($this.w, $this.currentHeight);

        // draw
        layer.draw();
	
	}
	
	$this.update = function () {
	
		$this.currentHeightPadding = Math.round($this.selector.height() / 5);
	
		$this.currentHeight = ($this.selector.height() + $this.currentHeightPadding) * $this.pixelRatio;
		
		$this.currentWidth = Math.round($this.currentHeight * $this.width / $this.height);
		
		$this.w = Math.round($this.currentWidth / $this.tileNr);
		$this.wf = Math.round($this.currentWidth / $this.tileNr - 1);
		
		if ($this.stage != undefined)
			$this.stage.setSize($this.selector.parent().width() * $this.pixelRatio, $this.selector.parent().height() * $this.pixelRatio);
		
		$('.kineticjs-content').width($this.selector.parent().width() * $this.pixelRatio).height($this.selector.parent().height() * $this.pixelRatio);
	}
	
	$this.rotate = function (a, b) {
	
		a = Math.round(a*100/1)/100
	
		var diff = (0 + ($this.currentWidth*a)/360) - $this.currentWidth / 2 + $this.selector.parent().width() / 2;
		
		diff = Math.round(diff*10)/10;
		
		$this.a = diff;
		
		$this.b = 0 - b;
		
		$('.nfo').html(Math.round($this.currentWidth / $this.tileNr));
	
	}
	
	$this.center = function() {
	
		var diff = $this.currentWidth / 2 - $this.selector.parent().width() / 2;
		
		$this.selector.css('marginLeft', 0 - diff);
	
	}
	

	return $this;
}

$(document).ready(function(){

	setTimeout(function() { window.scrollTo(0, 1) }, 100);

	//panorama.run();

	panorama.run($('.main'));
	
	$(window).resize(function(){
			
		panorama.update();
			
	});	
	
	window.ondeviceorientation = function(event) {
		
		//if (panorama.selector.parent().width() > panorama.currentHeight)
		a = Math.round(event.alpha*10/1)/10;
		b = Math.round(event.beta*10/1)/10;
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