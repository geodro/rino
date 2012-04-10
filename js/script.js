/* Author: 
	George Dumitrescu
	dumitrescugeorge@gmail.com
*/

//var a = 0;

var panorama = new function () {

	var $this = this;				
	
	$this.a = 0;
	$this.b = 0;
	$this.la = 0;
	$this.lb = 0;
	
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
	$this.lastWidth = 0;
	$this.lastHeight = 0;
	$this.currentHeightPadding = 0;
	
	$this.touch = false;
	
	$this.pixelRatio = 1;
	
	//$this.canvas = undefined;
	$this.stage = undefined;
	
	$this.loader = undefined;
	
	$this.html5 = undefined;
	
	$this.touchImage = undefined;
	$this.mouseCapable = false;
	$this.mouseEnable = false;
	$this.notify = false;
	
	$this.leftImage = undefined;
	$this.rightImage = undefined;
	
	$this.compassImage = undefined;
	$this.gyroCapable = false;
	$this.gyroEnable = false;
	
	$this.vGyro = 0;
	$this.vGyroEnable = false;
	
	$this.background = undefined;
	
	$this.bkgs = new Array();
	$this.legs = new Array();
	$this.legsHd = new Array();
	
	$this.walking = false;
	$this.walkingHd = false;
	$this.wDirection = 'right';
	$this.walkTimeoutId = setTimeout('', 1);
	
	$this.lFrame = 1;
	$this.fps = 0;
	var nd = new Date();
	$this.lTime = nd.getTime();
	$this.sTime = 0;
	$this.mSec = 1000/24;
	$this.mTime = Math.round(92*$this.mSec);
	
	//$this.p = undefined;
	
	$this.radius = 50.0;
	
	$this.circles = new Array();
	
	$this.run = function (selector, processing) {
	
		if (window.devicePixelRatio !== undefined)
			$this.pixelRatio = 1;
			
		if (screen.height * $this.pixelRatio < 900) {
			$this.flag = '_sd';
			$this.height = 480;
			$this.tile = 494;
			$this.tileNr = 5;
			$this.width = $this.tile * $this.tileNr;
		}
			

		$this.selector = selector;
	
		if ($this.selector == undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.update();
		
		$this.stage = new Kinetic.Stage({
			container: 'main',
			width: $this.selector.width(),
			height: $this.selector.height(),
		});
		
		var lyr = new Kinetic.Layer();
		
		var loadingText = new Kinetic.Text({
			x: $this.stage.width / 2,
			y: $this.stage.height / 2 - 30,
			text: "Loading...",
			fontSize: 30,
            fontFamily: "Calibri",
            textFill: "white",
            align: "center",
            verticalAlign: "middle"
		});
		
		lyr.add(loadingText);
		
		var loadBar = new Kinetic.Rect({
			x: $this.stage.width / 2 - $this.stage.width / 8,
			y: $this.stage.height / 2,
			width: $this.stage.width / 4,
			height: 10,
			fill: 'white',
		});
		
		lyr.add(loadBar);
		
		var loadBarStatus = new Kinetic.Rect({
			x: $this.stage.width / 2 - $this.stage.width / 8 + 2,
			y: $this.stage.height / 2 + 2,
			width: $this.stage.width / 4 - 4,
			height: 6,
			fill: 'black',
		});
		
		lyr.add(loadBarStatus);
		
		$this.stage.add(lyr);
		
		$this.stage.onFrame(function(frame){
			loadBarStatus.x = ($this.stage.width / 2 - $this.stage.width / 8 + 2) + loadedImages * (loadBar.width - 4) / totalImages;
			loadBarStatus.width = loadBar.width - 4 - loadedImages * (loadBar.width - 4) / totalImages;
			lyr.draw();
		});
		
		$this.stage.start();
		
		$this.loader = new PxLoader();
		
		var totalImages = 0;
		
		var loadedImages = 0;
		
		for (var i = 0; i < $this.tileNr; i++) {
		
			$this.bkgs[i] = $this.loader.addImage("img/bkg" + $this.flag + "_" + i + ".jpg");
			
			totalImages++;
		
		}
		
		for (var i = 1; i <= 92; i++) {
		
			$this.legs[i] = $this.loader.addImage("img/frame_sd_" + i + ".png");
			
			totalImages++;
			
			if ($this.flag == '_hd') {
			
				$this.legsHd[i] = $this.loader.addImage("img/frame_hd_" + i + ".png");
				
				totalImages++;
			
			}
		
		}
		
		$this.compassImage = $this.loader.addImage("img/compass.png");
		$this.touchImage = $this.loader.addImage("img/hand.png");
		$this.html5 = $this.loader.addImage("img/html5.png");
		
		$this.leftImage = $this.loader.addImage("img/left.png");
		$this.rightImage = $this.loader.addImage("img/right.png");
		
		totalImages = totalImages + 5;
		
		$this.loader.addProgressListener(function(e){
			loadedImages++;
			console.log(loadedImages);
		});
		
		$this.loader.addCompletionListener(function(){
			$this.stage.clear();
			$this.stage.stop();
			$this.render(true);
		});
		
		$this.loader.start();
	
	}
	
	$this.render = function (execute) {
	
		if (execute == true) {
	
			
			
			$this.stage.onContent("mousemove", function() {
				if ($this.mouseCapable == false) {
					$this.mouseCapable = true;
				}
				if ($this.mouseEnable == true) {
	                $this.checkMove(true);
	            }
	            $this.checkMouse($this.controls, $this.controls);
            });
            
            $this.stage.onContent("touchstart", function() {
            	$this.touch = true;
            
            });
            
            $this.stage.onContent("touchmove", function() {
            	if ($this.gyroEnable == false && $this.mouseEnable == true) {
            		$this.checkMove(true);
            	}
            });
            
            $this.stage.onContent("touchend", function() {
            
            	$this.touch = false;
            
            });
			
			$this.background = new Kinetic.Layer();
			
			for (var i = 0; i < $this.tileNr; i++) {
			
		        var img = new Kinetic.Image({
		            x: $this.a + i * $this.w,
		            y: $this.b,
		            image: $this.bkgs[i],
		            width: $this.w,
		            height: $this.currentHeight
		        });
		
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
			/*
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
			    
			    //$this.foreground.add(circle);
			    })();
			}
			*/
			$this.stage.add($this.foreground);
			
			$this.legsLayer = new Kinetic.Layer();
			
			$this.stage.add($this.legsLayer);
			
			$this.controls = new Kinetic.Layer();
			
			var ht5 = new Kinetic.Image({
				x: 40,
				y: 40,
				image: $this.html5,
				width: 60,
				height: 60,
				alpha: 1
			});
			
			var cht5 = new Kinetic.Circle({
				x: 70,
				y: 70,
				radius: 35,
				fill: 'white',
				alpha: 0.5
			});
			
			$this.controls.add(cht5);
			$this.controls.add(ht5);
			
			$this.compass = new Kinetic.Group({
				name: 'compas'
			});
			
			var compassI = new Kinetic.Image({
				x: 35,
				y: $this.stage.height - 35 - 70,
				image: $this.compassImage,
				width: 70,
				height: 70,
				alpha: 0.5
			});
			
			compassI.on('touchstart', function () {
				if ($this.gyroEnable == true) {
					$this.gyroEnable = false;
					$this.checkMove();
					compassI.alpha = 0.5;
					leftI.alpha = 1;
					rightI.alpha = 1;
				} else {
					$this.gyroEnable = true;
					compassI.alpha = 1;
					$this.mouseEnable = false;
					touchI.alpha = 0.5;
					leftI.alpha = 0;
					rightI.alpha = 0;
				}
				$this.controls.draw();
			});
			
			$this.compass.add(compassI);
			
			$this.controls.add($this.compass);
			
			var leftI = new Kinetic.Image({
				name: 'left',
				x: 35,
				y: $this.stage.height/2 - 35,
				image: $this.leftImage,
				width: 70,
				height: 70,
				alpha: 1
			});
			
			leftI.on('mouseover touchstart', function(){
				if ($this.mouseEnable == false) {
					document.body.style.cursor = "pointer";
					$this.wDirection = 'left';
					$this.walkingHd = false;
					$this.walking = true;
					$this.vGyroEnable = true;
					$this.vRotate();
				}
			});
			
			leftI.on('mouseout touchend', function(){
				$this.walking = false;
				document.body.style.cursor = "default";
				$this.vGyroEnable = false;
			});
			
			$this.controls.add(leftI);
			
			var rightI = new Kinetic.Image({
				name: 'right',
				x: $this.stage.width - 35 - 70,
				y: $this.stage.height/2 - 35,
				image: $this.rightImage,
				width: 70,
				height: 70,
				alpha: 1
			});
			
			rightI.on('mouseover touchstart', function(){
				if ($this.mouseEnable == false) {
					document.body.style.cursor = "pointer";
					$this.wDirection = 'right';
					$this.walkingHd = false;
					$this.walking = true;
					$this.vGyroEnable = true;
					$this.vRotate();
				}
			});
			
			rightI.on('mouseout touchend', function(){
				$this.walking = false;
				document.body.style.cursor = "default";
				$this.vGyroEnable = false;
			});
			
			$this.controls.add(rightI);
			
			var touchI = new Kinetic.Image({
				name: 'mouse',
				x: $this.stage.width - 35 - 70,
				y: $this.stage.height - 35 - 70,
				image: $this.touchImage,
				width: 70,
				height: 70,
				alpha: 0.5
			});
			
			touchI.on('click touchstart', function () {
				if ($this.mouseEnable == true) {
					$this.mouseEnable = false;
					touchI.alpha = 0.5;
					leftI.alpha = 1;
					rightI.alpha = 1;
				} else {
					$this.mouseEnable = true;
					touchI.alpha = 1;
					leftI.alpha = 0;
					rightI.alpha = 0;
					$this.gyroEnable = false;
					$this.checkMove();
					compassI.alpha = 0.5;
				}
				$this.controls.draw();
			});
			
			touchI.on('mouseover', function(){
				document.body.style.cursor = "pointer";
			});
			
			touchI.on('mouseout', function(){
				document.body.style.cursor = "default";
			});
			
			$this.controls.add(touchI);
			
			$this.stage.add($this.controls);
			
			$this.stage.onFrame(function(frame) {
				$this.animateBackground($this.background, frame);
				$this.animateLegs($this.legsLayer, frame);
				$this.animateForeground($this.foreground, frame);
			});
			
			//$('.nfo').html($this.flag);
			
			var nd = new Date();
			$this.lTime = nd.getTime();
			
			$this.stage.start();
			
			$this.checkGyro($this.controls);
		}
	}
	
	$this.checkGyro = function (layer, frame) {
		var stage = layer.getStage();
				
        var shape = layer.getChild('compas');
        
        var shapes = shape.getChildren();
        
        for (var i = 0; i < shapes.length; i++) {
        	var s = shapes[i];
	        if ($this.gyroCapable == false) {
	        	s.hide(); 
	        } else {
	        	s.show();
	        	s.setPosition(35, $this.stage.height - 35 - 70);
	        }
        
        }
		
		layer.draw();
	}
	
	$this.checkMouse = function (layer, frame) {
		var stage = layer.getStage();
				
	    var shape = layer.getChild('mouse');
	    
        /*if ($this.mouseCapable == false) {
        	//shape.hide();
        } else {
        	shape.show();
        	shape.setPosition(stage.width - 35 - 70, stage.height - 35 - 70);
        }*/
        
        shape.setPosition(stage.width - 35 - 70, stage.height - 35 - 70);
		
		layer.draw();
	}
	
	$this.checkMove = function (force) {
		if ($this.mouseEnable == true) {
			if ($this.walking == true || force == true) {
				var mousePos = $this.stage.getUserPosition();
				
				if (mousePos.x != undefined && mousePos.y != undefined)
					$this.moveEvent(mousePos.x, mousePos.y);
			}
		}
	}
	
	$this.moveEvent = function (b, c) {
	
		if (b >= panorama.selector.parent().width() / 2) {
		
			b = b - $this.selector.parent().width() / 2;
			
			b = 0 - b * 360 / $this.selector.parent().width();
			
		} else {
		
			b = 180 - b * 360 / $this.selector.parent().width();
		
		}
		
		c = c * $this.currentHeightPadding / $this.selector.parent().height();
				
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
	
	$this.animateLegs = function (layer, frame, update) {
	
		var nTime = new Date();
		var cTime = nTime.getTime();
		
		var dTime = cTime - $this.lTime;
		
		if ($this.sTime > $this.mTime)
			$this.sTime = $this.sTime - $this.mTime;
	
		frame = Math.round($this.sTime / $this.mSec);
		
		if (frame > 92 || frame == 0)
			frame = 1;
			
		var stage = layer.getStage();
		
        // update
        var shapes = layer.getChildren();
			
		if ($this.lFrame < frame && $this.walking == true) {
		
			for(var i = 0; i < shapes.length; i++) {
			        	
	        	layer.remove(shapes[i]);
	        }
	        
	        var w = ($this.stage.height/900) * 1920;
	        if (this.wDirection == 'right') {
	        	var img = new Kinetic.Image({
	        	    x: Math.round($this.stage.width/2 - w/2),
	        	    y: 0,
	        	    image: $this.legs[frame],
	        	    width: w,
	        	    height: $this.stage.height
	        	});
	        } else {
	        	var img = new Kinetic.Image({
	        	    x: Math.round($this.stage.width/2 - w/2) + w,
	        	    y: 0,
	        	    image: $this.legs[frame],
	        	    width: w,
	        	    height: $this.stage.height
	        	});
	        	
	        	img.scale.x =-1;
	        }
	        
			
	        // add the shape to the layer
	        layer.add(img);

	        layer.draw();
		
		} else {
		
			if ($this.walking == false && $this.walkingHd == false && $this.flag == '_hd' && update == undefined) {
			
				$this.walkingHd = true;
			
				for(var i = 0; i < shapes.length; i++) {
		        	layer.remove(shapes[i]);
		        }
		        
		        if ($this.flag == '_hd') {
		        	var im = $this.legsHd[$this.lFrame];
		        } else {
		        	var im = $this.legs[$this.lFrame];
		        }
							        
		        var w = ($this.stage.height/900) * 1920;
		        
	        	var img = new Kinetic.Image({
	        	    x: Math.round($this.stage.width/2 - w/2),
	        	    y: 0,
	        	    image: $this.legsHd[$this.lFrame],
	        	    width: w,
	        	    height: $this.stage.height
	        	});
		        	
		        if (this.wDirection == 'left') {
		        	img.scale.x =-1;
		        	img.x = Math.round($this.stage.width/2 - w/2) + w;
		        }
			        
		        
				
		        // add the shape to the layer
		        layer.add(img);
	
		        layer.draw();
				
			
			}
			
			if (update == true) {
				for(var i = 0; i < shapes.length; i++) {
					layer.remove(shapes[i]);
				}
				
				if ($this.flag == '_sd')
					var im = $this.legs[$this.lFrame];
				else 
					var im = $this.legsHd[$this.lFrame];
				
				var w = ($this.stage.height/900) * 1920;
				
				var img = new Kinetic.Image({
				    x: Math.round($this.stage.width/2 - w/2),
				    y: 0,
				    image: im,
				    width: w,
				    height: $this.stage.height
				});
				
				if (this.wDirection == 'left') {
					img.scale.x = -1;
					img.x = Math.round($this.stage.width/2 - w/2) + w
				}
					
				
				layer.add(img);
				
				layer.draw();
			}
		
		}

        $this.lFrame = frame;
		
        // draw
        if ($this.walking == true) {
        	$this.lTime = cTime;
        	$this.sTime += dTime;
        }
	    else
	    	$this.lTime = $this.lTime + dTime;
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
		
		if ($this.lastWidth != 0 && $this.lastHeight != 0) {
			if ($this.lastWidth != $this.selector.width())
				$this.a = $this.a - Math.round(($this.lastWidth - $this.selector.width())/2);
			//if ($this.lastHeight != $this.currentHeight)
			//	$this.a = $this.a - Math.round(($this.lastHeight * $this.width / $this.height - $this.currentWidth)/2)/2;
		}
		
		$this.w = Math.round($this.currentWidth / $this.tileNr);
		$this.wf = Math.round($this.currentWidth / $this.tileNr - 1);
		
		if ($this.stage != undefined)
			$this.stage.setSize($this.selector.parent().width() * $this.pixelRatio, $this.selector.parent().height() * $this.pixelRatio);
		
		$('.kineticjs-content').width($this.selector.parent().width() * $this.pixelRatio).height($this.selector.parent().height() * $this.pixelRatio);
		
		if ($this.controls != undefined) {
			$this.checkGyro($this.controls);
			$this.checkMouse($this.controls);
		}
		
		if ($this.legsLayer != undefined)
			$this.animateLegs($this.legsLayer, 0, true);
			
		$this.lastWidth = $this.selector.width();
		$this.lastHeight = $this.currentHeight;
		
	}
	
	$this.startWalk = function () {
		clearInterval($this.walkTimeoutId);
		if ($this.walking == false) {
			$this.walking = true;
			$this.walkingHd = false;
		}
	}
	
	$this.stopWalk = function () {
		if ($this.walking == true)
			$this.walking = false;
	}
	
	$this.vRotate = function () {
		if ($this.vGyroEnable == true) {
			if ($this.wDirection == 'right')
				$this.vGyro--;
			if ($this.wDirection == 'left')
				$this.vGyro++;
				
			if ($this.vGyro >= 181)
				$this.vGyro = -179;
				
			if ($this.vGyro < -181)
				$this.vGyro = 179;
				
			//$('.nfo').html($this.vGyro);
			$this.rotate($this.vGyro, 0);
		
			setTimeout('panorama.vRotate()', 10);
		}
	}
	
	$this.rotate = function (a, b) {
		
		if ($this.gyroEnable == false)
			var ba = Math.round(a*10000)/10000;
		else
			var ba = Math.round(a);
		
		//$('.nfo').html(ba + ', ' + $this.la);
	
		if ($this.vGyroEnable == false) {
			if (ba > $this.la) {
				$this.startWalk();
				$this.wDirection = 'left';
			} else if (ba == $this.la) {
				$this.stopWalk();								
			} else {
				$this.startWalk();
				$this.wDirection = 'right';
			}
			$this.vGyro = Math.round(ba);
		}
	
		var diff = Math.round(0 + ($this.currentWidth*a)/360) - Math.round($this.currentWidth / 2) + Math.round($this.selector.parent().width() / 2);
		
		$this.a = diff;
		
		$this.b = 0 - b;
		
		$this.la = ba;
		
		if ($this.gyroEnable == false && ($this.mouseCapable == false || $this.mouseEnable == true))
			$this.walkTimeoutId = setTimeout('panorama.checkMove()', 100);
	
	}
	

	return $this;
}

panorama.run($('.main'));

$(window).resize(function(){
		
	panorama.update();
		
});	

$(document).ready(function(){

	panorama.update();

	setTimeout(function() { window.scrollTo(0, 1) }, 100);
	
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