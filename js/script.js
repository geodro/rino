/* Author: 
	George Dumitrescu
	dumitrescugeorge@gmail.com
*/

function gameClass () {

	var $this = this;				
	
	$this.a = 0;
	$this.b = 0;
	$this.la = 0;
	$this.lb = 0;
	
	$this.selector = undefined;
	
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
	
	$this.pixelRatio = 1;
	
	$this.stage = undefined;
	
	$this.loader = undefined;
	
	$this.background = undefined;
	
	$this.bkgs = new Array();
	
	$this.lFrame = 1;
	$this.fps = 0;
	var nd = new Date();
	$this.lTime = nd.getTime();
	$this.sTime = 0;
	$this.mSec = 1000/24;
	$this.mTime = Math.round(92*$this.mSec);
	
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
            
            $this.stage.onContent("touchstart", function() {
            	$this.touch = true;
            });
            
            $this.stage.onContent("touchmove", function() {
            	//$this.checkMove(true);
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
	        
	        $this.stage.add($this.background);
			
			$this.stage.onFrame(function(frame) {
				$this.animateBackground($this.background, frame);
			});
			
			var nd = new Date();
			$this.lTime = nd.getTime();
			
			$this.stage.start();
			
			$this.checkGyro($this.controls);
		}
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
	
		$this.currentHeight = ($this.selector.height() + $this.currentHeightPadding) * $this.pixelRatio;
		
		$this.currentWidth = Math.round($this.currentHeight * $this.width / $this.height);
		
		if ($this.lastWidth != 0 && $this.lastHeight != 0) {
			if ($this.lastWidth != $this.selector.width())
				$this.a = $this.a - Math.round(($this.lastWidth - $this.selector.width())/2);
		}
		
		$this.w = Math.round($this.currentWidth / $this.tileNr);
		$this.wf = Math.round($this.currentWidth / $this.tileNr - 1);
		
		if ($this.stage != undefined)
			$this.stage.setSize($this.selector.parent().width() * $this.pixelRatio, $this.selector.parent().height() * $this.pixelRatio);
		
		$('.kineticjs-content').width($this.selector.parent().width() * $this.pixelRatio).height($this.selector.parent().height() * $this.pixelRatio);
			
		$this.lastWidth = $this.selector.width();
		$this.lastHeight = $this.currentHeight;
		
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
				
			$this.rotate($this.vGyro, 0);
		
			setTimeout('game.vRotate()', 10);
		}
	}
	
	$this.rotate = function (a, b) {
		
		if ($this.gyroEnable == false)
			var ba = Math.round(a*10000)/10000;
		else
			var ba = Math.round(a);
	
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
			$this.walkTimeoutId = setTimeout('game.checkMove()', 100);
	
	}
	

	return $this;
}

var game = gameClass();

$(window).resize(function(){
		
	game.update();
		
});	

$(document).ready(function(){

	game.update();

	setTimeout(function() { window.scrollTo(0, 1) }, 100);
	
	$(window).resize(function(){
			
		game.update();
			
	});

});