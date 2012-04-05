/* Author: 
	George Dumitrescu
*/

var a = 0;

var panorama = new function () {

	var $this = this;				
	
	$this.a = 0;
	$this.b = 0;
	
	$this.selector = undefined;
	//$this.width = 3889;
	//$this.height = 748;
	
	$this.flag = '_hd';
	$this.height = 1080;
	$this.tile = 1112;
	$this.tileNr = 5;
	$this.width = $this.tile * $this.tileNr;
	$this.w = Math.round($this.width / $this.tileNr);
	$this.wf = Math.round($this.width / $this.tileNr - 1);
	
	$this.currentWidth = 0;
	$this.currentHeight = 0;
	$this.currentHeightPadding = 0;
	
	$this.touch = false;
	
	$this.pixelRatio = 1;
	
	//$this.canvas = undefined;
	$this.stage = undefined;
	
	$this.loader = undefined;
	
	$this.gyroCapable = false;
	$this.gyroEnable = false;
	
	$this.background = undefined;
	
	$this.bkgs = new Array();
	$this.legs = new Array();
	
	$this.frame = 1;
	
	//$this.p = undefined;
	
	$this.radius = 50.0;
	
	$this.circles = new Array();
	
	$this.run = function (selector, processing) {
	
		if (window.devicePixelRatio !== undefined)
			$this.pixelRatio = 1;
			
		if (screen.height * $this.pixelRatio < 1080) {
		
			$this.flag = '_sd';
			$this.height = 480;
			$this.tile = 494;
			$this.tileNr = 5;
			$this.width = $this.tile * $this.tileNr;
		}
			

		$this.selector = selector;
		
		//$this.canvas = document.getElementById("canvas1");
	
		if ($this.selector == undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.update();
		
		$this.loader = new PxLoader();
		
		for (var i = 0; i < $this.tileNr; i++) {
		
			$this.bkgs[i] = $this.loader.addImage("img/bkg" + $this.flag + "_" + i + ".jpg");
		
		}
		
		for (var i = 1; i <= 92; i++) {
		
			$this.legs[i] = $this.loader.addImage("img/frame_sd_" + i + ".png");
		
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
    			
    			$this.moveEvent(b,c);
    			
            });
            
            $this.stage.onContent("touchstart", function() {
            
            	$this.touch = true;
            
            });
            
            $this.stage.onContent("touchmove", function() {
            	if ($this.gyroEnable == false) {
            		var mousePos = $this.stage.getTouchPosition();
            		
            		b = mousePos.x;
            		c = mousePos.y;
            		
            		$this.moveEvent(b,c);
            	}
            });
            
            $this.stage.onContent("touchend", function() {
            
            	$this.touch = false;
            
            });
			
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
	        
			$this.foreground = new Kinetic.Layer();
			
			for (i = 0; i < 3; i++) {
			    (function(){
			    var circle = new Kinetic.Circle({
					x: 100 * (i + 1),
					y: 100 * (i + 1),
					radius: $this.radius / 2,
					fill: 'blue',
					draggable: true,
			    });
			    
			    circle.on('click touchstart', function () {
			    
			    	$this.foreground.remove(circle);
			    	$this.foreground.draw();
			    
			    });
			    
			    $this.foreground.add(circle);
			    })();
			}
			
			$this.stage.add($this.foreground);
			
			$this.legsLayer = new Kinetic.Layer();
			
			$this.stage.add($this.legsLayer);
			
			$this.controls = new Kinetic.Layer();
			
			$this.compass = new Kinetic.Group({
				name: 'compas'
			});
			
			var circle = new Kinetic.Circle({
				x: 50,
				y: $this.stage.height - 50,
				radius: 30,
				fill: 'red',
			});
			
			circle.on('click touchstart', function () {
				if ($this.gyroEnable == true) {
					circle.setFill('red');
					$this.gyroEnable = false;
				} else {
					circle.setFill('blue');
					$this.gyroEnable = true;
				}
				$this.controls.draw();
			});
			
			$this.compass.add(circle);
			
			$this.controls.add($this.compass);
			
			$this.stage.add($this.controls);
			
			$this.stage.onFrame(function(frame) {
				$this.checkGyro($this.controls, frame);
				$this.animateBackground($this.background, frame);
				$this.animateLegs($this.legsLayer, frame);
				$this.animateForeground($this.foreground, frame);
			});
			
			$('.nfo').html($this.flag);
			$this.stage.start();
		}
		
		$('#main').find('canvas').css('left', 0);
	}
	
	$this.checkGyro = function (layer, frame) {
		var stage = layer.getStage();
				
		        // update
        var shape = layer.getChild('compas');
        
        var shapes = shape.getChildren();
        
        for (var i = 0; i < shapes.length; i++) {
        	var s = shapes[i];
	        if ($this.gyroCapable == false) {
	        	s.hide();
	        	//$('.nfo').html('false');
	        } else {
	        	s.show();
	        	s.setPosition(50, stage.height - 50);
	        	//$('.nfo').html('true');
	        }
        
        }
		
		layer.draw();
	}
	
	$this.moveEvent = function (b, c) {
	
		if (b >= panorama.selector.parent().width() / 2) {
		
			b = b - $this.selector.parent().width() / 2;
			
			b = 0 - b * 360 / $this.selector.parent().width();
			
		} else {
		
			b = 180 - b * 360 / $this.selector.parent().width();
		
		}
		
		c = c * $this.currentHeightPadding / $this.selector.parent().height();
		
		//b = Math.round(b*100/1)/100;
		//c = Math.round(c*100/1)/100;
				
		panorama.rotate(b, c);
	
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
	
	$this.animateLegs = function (layer, frame) {
	
		if ($this.frame > 92)
			$this.frame = 1;
	
		var stage = layer.getStage();
		
        // update
        var shapes = layer.getChildren();
        
		if ($this.frame % 3) {
		
			 for(var i = 0; i < shapes.length; i++) {
			        	
	        	layer.remove(shapes[i]);
	        }
	        
	        var w = ($this.stage.height/900) * 1920;
	        
	        var img = new Kinetic.Image({
	            x: $this.stage.width/2 - w/2,
	            y: 0,
	            image: $this.legs[$this.frame],
	            width: w,
	            height: $this.stage.height
	        });
	
	        // add the shape to the layer
	        layer.add(img);
	        layer.draw();
			
		}
		
		$this.frame++;
        // draw
        
	
	}
	
	$this.animateForeground = function (layer, frame) {
	
		var stage = layer.getStage();
		
        // update
        var shapes = layer.getChildren();
        

        for(var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            
            shape.setPosition($this.a + (i + 1) * 100, $this.b + 100 * (i + 1));
            
        }

        // draw
        layer.draw();
	
	}
	
	$this.update = function () {
	
		//$this.currentHeightPadding = Math.round($this.selector.height() / 5);
	
		$this.currentHeight = ($this.selector.height() + $this.currentHeightPadding) * $this.pixelRatio;
		
		$this.currentWidth = Math.round($this.currentHeight * $this.width / $this.height);
		
		$this.w = Math.round($this.currentWidth / $this.tileNr);
		$this.wf = Math.round($this.currentWidth / $this.tileNr - 1);
		
		if ($this.stage != undefined)
			$this.stage.setSize($this.selector.parent().width() * $this.pixelRatio, $this.selector.parent().height() * $this.pixelRatio);
		
		$('.kineticjs-content').width($this.selector.parent().width() * $this.pixelRatio).height($this.selector.parent().height() * $this.pixelRatio);
	}
	
	$this.rotate = function (a, b) {
	
		//a = Math.round(a*100/1)/100;
	
		var diff = (0 + ($this.currentWidth*a)/360) - $this.currentWidth / 2 + $this.selector.parent().width() / 2;
		
		//diff = Math.round(diff*10)/10;
		
		$this.a = diff;
		
		$this.b = 0 - b;
		
		//$('.nfo').html($this.w);
	
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
		if (event.alpha) {
			panorama.gyroCapable = true;
		}
		if (panorama.gyroEnable == true) {
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
			
			b = (b + 20) * panorama.currentHeightPadding / 40;
			
			panorama.rotate(a, b);
		}
		
	}

});