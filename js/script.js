/* Author: 
	George Dumitrescu
	dumitrescugeorge@gmail.com
   Copyright: George Dumitrescu (http://georgedumitrescu.com), Ovidiu Gheorghe (http://www.facebook.com/FlashGamezFactory) */

	var $this = {
		
	};				
	
	$this.a = 0;
	$this.b = 0;
	$this.la = 0;
	$this.lb = 0;
	
	$this.selector = undefined;
	
	$this.flag = '_hd';
	$this.height = 800;
	$this.width = 1280;
	$this.w = Math.round($this.width / $this.tileNr);
	$this.wf = Math.round($this.width / $this.tileNr - 1);
	
	$this.currentWidth = 0;
	$this.currentHeight = 0;
	$this.lastWidth = 0;
	$this.lastHeight = 0;
	$this.currentHeightPadding = 0;
	
	$this.groundLayer = undefined;
	
	$this.pixelRatio = 1;
	
	$this.stage = undefined;
	
	$this.sky = undefined;
	$this.ground = undefined;
	
	$this.rino = {
		tile: undefined,
		image: undefined,
		animateShow: false,
		animateHide: false,
		animateMove: false,
		close: true,
		states: undefined,
		frame: 0,
		x: 0,
		direction: 1
	};
	
	$this.gameplay = {
		x: 0,
		y: 0,
		max: 3,
		score: 0,
		moves: 0,
		over: false
	};
	
	$this.layers = {
		
	};
	
	$this.stageName = undefined;
	
	$this.menu = {
		images: {
			giantNut: undefined,
			titlePlate: undefined,
			coverRope: undefined,
			playNow: undefined,
			playNowOver: undefined,
			upgrades: undefined,
			upgradesOver: undefined,
			instructions: undefined,
			instructionsOver: undefined,
			moreGames: undefined,
			moreGamesOver: undefined,
			spider1: undefined,
			spider2: undefined,
			spider3: undefined,
			blackSpear: undefined,
			gameBlackSpear: undefined
		},
		animateShow: false,
		animateHide: false,
		close: true
	};
	
	$this.instructions = {
		images: {
			close: undefined,
			closeTouch: undefined,
			tongue: undefined,
			text: undefined,
			next: undefined,
			nextTouch: undefined,
			prev: undefined,
			prevTouch: undefined
		},
		animateShow: false,
		animateHide: false,
		close: true
	};
	
	$this.bkgs = [];
	
	$this.lFrame = 1;
	$this.fps = 0;
	
	function run (selector, processing) {
	
		if (window.devicePixelRatio !== undefined)
			$this.pixelRatio = 1;
			
		if (screen.height * $this.pixelRatio < 900) {
			$this.flag = '_sd';
		}
			

		$this.selector = selector;
	
		if ($this.selector === undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.rino.states = loadData();
		
		$this.stage = new Kinetic.Stage({
			container: 'main',
			width: $this.width,
			height: $this.height
		});
		
		$this.stage.setScale(1/$this.pixelRatio);
		
		stageCoverLoader();
	
	}
	
	function destroyStage (c) {
		$this.stage.clear();
		$this.stage.stop();
		$this.selector.html('');
		if (c !== undefined)
			c();
	}
	
	function stageCoverLoader () {
		
		$this.stageName = 'loader';
		
		var lyr = new Kinetic.Layer();
		
		var loadingText = new Kinetic.Text({
			x: $this.width / 2,
			y: $this.height / 2 - 30,
			text: "Loading...",
			fontSize: 30,
            fontFamily: "Calibri",
            textFill: "white",
            align: "center",
            verticalAlign: "middle"
		});
		
		lyr.add(loadingText);
		
		var loadBar = new Kinetic.Rect({
			x: $this.width / 2 - $this.width / 8,
			y: $this.height / 2,
			width: $this.width / 4,
			height: 10,
			fill: 'white'
		});
		
		lyr.add(loadBar);
		
		var loadBarStatus = new Kinetic.Rect({
			x: $this.width / 2 - $this.width / 8 + 2,
			y: $this.height / 2 + 2,
			width: $this.width / 4 - 4,
			height: 6,
			fill: 'black'
		});
		
		lyr.add(loadBarStatus);
		
		$this.stage.add(lyr);
		
		$this.stage.onFrame(function(frame){
			loadBarStatus.attrs.x = ($this.width / 2 - $this.width / 8 + 2) + loadedImages * (loadBar.attrs.width - 4) / totalImages;
			loadBarStatus.attrs.width = loadBar.attrs.width - 4 - (loadedImages * (loadBar.attrs.width - 4) / totalImages);
			lyr.draw();
		});
		
		$this.stage.start();
		
		loader = new PxLoader();
		
		var totalImages = 0;
		
		var loadedImages = 0;
		
		$this.sky = loader.addImage("img/SkyBg.png"); totalImages++;
		$this.ground = loader.addImage("img/GroundTile.png"); totalImages++;
		$this.rino.image = loader.addImage("img/RinoAnim.png"); totalImages++;
		$this.menu.images.giantNut = loader.addImage("img/CoverGiantNut.png"); totalImages++;
		$this.menu.images.titlePlate = loader.addImage("img/CoverTitlePlate.png"); totalImages++;
		$this.menu.images.coverRope = loader.addImage("img/CoverRope.png"); totalImages++;
		$this.menu.images.playNow = loader.addImage("img/CoverPlayNow.png"); totalImages++;
		$this.menu.images.playNowOver = loader.addImage("img/CoverPlayNowOver.png"); totalImages++;
		$this.menu.images.upgrades = loader.addImage("img/CoverUpgrades.png"); totalImages++;
		$this.menu.images.upgradesOver = loader.addImage("img/CoverUpgradesOver.png"); totalImages++;
		
		$this.menu.images.instructions = loader.addImage("img/CoverInstructions.png"); totalImages++;
		$this.menu.images.instructionsOver = loader.addImage("img/CoverInstructionsOver.png"); totalImages++;
		$this.menu.images.moreGames = loader.addImage("img/CoverMoreGames.png"); totalImages++;
		$this.menu.images.moreGamesOver = loader.addImage("img/CoverMoreGamesOver.png"); totalImages++;
		
		$this.menu.images.spider1 = loader.addImage("img/CoverSpider1.png"); totalImages++;
		$this.menu.images.spider2 = loader.addImage("img/CoverSpider2.png"); totalImages++;
		$this.menu.images.spider3 = loader.addImage("img/CoverSpider3.png"); totalImages++;
		
		$this.menu.images.blackSpear = loader.addImage("img/BlackSpear.png"); totalImages++;
		$this.menu.images.gameBlackSpear = loader.addImage("img/GameBlackSpear.png"); totalImages++;
		
		$this.instructions.images.close = loader.addImage("img/CoverInstructionsClose.png"); totalImages++;
		$this.instructions.images.closeTouch = loader.addImage("img/CoverInstructionsCloseTouch.png"); totalImages++;
		$this.instructions.images.tongue = loader.addImage("img/CoverTongue.png"); totalImages++;
		
		$this.instructions.images.text = loader.addImage("img/CoverInstructionsText.png"); totalImages++;
		$this.instructions.images.next = loader.addImage("img/InstrNext.png"); totalImages++;
		$this.instructions.images.nextTouch = loader.addImage("img/InstrNextTouch.png"); totalImages++;
		$this.instructions.images.prev = loader.addImage("img/InstrPrev.png"); totalImages++;
		$this.instructions.images.prevTouch = loader.addImage("img/InstrPrevTouch.png"); totalImages++;
		
		loader.addProgressListener(function(e){
			loadedImages++;
		});
		
		loader.addCompletionListener(function(){
			destroyStage();
			stageCover(true);
		});
		
		loader.start();
		
	}
	
	function stageCover (execute) {
		
		$this.stageName = 'cover';
			
		$this.stage = new Kinetic.Stage({
			container: 'main',
			width: 1280,
			height: 800
		});
		
		$this.stage.setScale(1/$this.pixelRatio);
		
		update();
        
        $this.stage.on("touchstart mousedown", function() {
			/*$this.stage.toDataURL(function(dataUrl) {
				//alert(dataUrl);
				window.open(dataUrl);
			});*/
			$this.touch = true;
		});
        
        $this.stage.on("touchmove", function() {
			//$this.checkMove(true);
        });
        
        $this.stage.on("touchend", function() {
			$this.touch = false;
        });
        
        buildCover($this.stage);
		
		$this.stage.onFrame(function(frame) {
			
			/*if ($this.menu.close === false && $this.menu.animateHide === false && $this.menu.animateShow === false)
				animateGiantNut($this.menuLayer, frame);*/
			
			if ($this.rino.close === false)
				animateRino($this.rinoLayer, frame);
			
		});
		
		$this.stage.start();
		
		animateGround();
		
		menuShow(function(){
			rinoShow();
		});
		
	}
	
	function buildCover (stage) {
		
		buildBackground($this.stage);
        buildGround($this.stage);
        buildRino($this.stage);
        
	}
	
	function buildBackground (stage) {
		
		$this.background = new Kinetic.Layer();
			
        var SkyImg = new Kinetic.Image({
            x: 0,
            y: 0,
            image: $this.sky,
            width: 1280,
            height: 800
        });

        $this.background.add(SkyImg);
        
        stage.add($this.background);
	}
	
function buildGround (stage) {
	
	$this.groundLayer = new Kinetic.Layer({
		rotationDeg: -2
	});
		
    var GroundTile = new Kinetic.Image({
        x: -20,
        y: 380,
        image: $this.ground,
        width: 1280,
        height: 600
    });
    var GroundTile2 = new Kinetic.Image({
        x: 1259,
        y: 380,
        image: $this.ground,
        width: 1280,
        height: 600
    });
    
	$this.groundLayer.add(GroundTile);
	$this.groundLayer.add(GroundTile2);
    
    stage.add($this.groundLayer);
}

function animateGround () {
    $this.groundLayer.transitionTo({
		x: -1280,
		y: 44.6,
		duration: 1.8,
		callback: function(){
			$this.groundLayer.attrs.x = -10;
			$this.groundLayer.attrs.y = 0;
			if ($this.stageName === 'cover')
				animateGround();
		}
	});
}
/*
function buildRino (stage) {
	
    $this.rinoLayer = new Kinetic.Layer({
		x: -400,
		y: -110,
		rotationDeg: -2,
		throttle: 60
    });
	
	$this.rinoLayer.setScale(1.2);
	
	$this.rino.tile = new Kinetic.Sprite({
            x: 200,
            y: 400,
            image: $this.rino.image,
            animation: 'running',
            animations: $this.rino.states,
            frameRate: 30
          });
    
    $this.rinoLayer.add($this.rino.tile);
    
    $this.rinoLayer.hide();
    
    stage.add($this.rinoLayer);
	
}*/

function buildRino (stage, rotation) {
	
		if (rotation === undefined)
			rotation = -2;
		
        $this.rinoLayer = new Kinetic.Layer({
			x: -400,
			y: -110,
			rotationDeg: rotation
        });
        
        $this.rino.frame = Math.round($this.rino.frame);
		
		$this.rinoLayer.setScale(1.2);
		
        var RinoTile = new Kinetic.Shape({
			name: 'rino',
			drawFunc: function() {
				var context = this.getContext();
				context.drawImage($this.rino.image, this.attrs._fx, this.attrs._fy, this.attrs._fw, this.attrs._fh, this.attrs._x, this.attrs._y, this.attrs._w, this.attrs._h);
			},
			_fx: $this.rino.states[$this.rino.frame].frame.x,
			_fy: $this.rino.states[$this.rino.frame].frame.y,
			_fw: $this.rino.states[$this.rino.frame].frame.w,
			_fh: $this.rino.states[$this.rino.frame].frame.h,
			_x: 188,
			_y: 370,
			_w: $this.rino.states[$this.rino.frame].frame.w,
			_h: $this.rino.states[$this.rino.frame].frame.h
		});
        
        $this.rinoLayer.add(RinoTile);
        
        $this.rinoLayer.hide();
        
        stage.add($this.rinoLayer);
		
	}

	
function animateRino (layer, f) {
	
	$this.rino.frame = $this.rino.frame + 60 * f.timeDiff/1000;
	
	if ($this.rino.frame >= 30)
		$this.rino.frame = 1;
	
	var frame = Math.round($this.rino.frame) - 1;
	
	var rino = layer.get('.rino')[0];
	
	if ($this.rino.states[frame] !== undefined) {
		rino.attrs._fx = $this.rino.states[frame].frame.x;
		rino.attrs._fy = $this.rino.states[frame].frame.y;
		rino.attrs._fw = $this.rino.states[frame].frame.w;
		rino.attrs._fh = $this.rino.states[frame].frame.h;
		rino.attrs._fx = $this.rino.states[frame].frame.x;
		rino.attrs._x = $this.rino.states[frame].spriteSourceSize.x;
		rino.attrs._y = 290 + $this.rino.states[frame].spriteSourceSize.y;
		rino.attrs._w = $this.rino.states[frame].frame.w;
		rino.attrs._h = $this.rino.states[frame].frame.h;
		
		$this.gameplay.x = $this.rino.states[frame].spriteSourceSize.x + $this.rino.states[frame].frame.w + $this.rinoLayer.attrs.x;
		$this.gameplay.y = 290 + $this.rino.states[frame].spriteSourceSize.y + $this.rinoLayer.attrs.y;
		
		layer.draw();
	
	}
}
	
	function rinoShow (x) {
		
		if (x === undefined)
			x = -120;
		
		$this.rino.close = false;
		
		$this.rino.animateShow = true;
		$this.rinoLayer.show();
		//$this.rino.tile.start();
		
		$this.rinoLayer.transitionTo({
			x: x,
			duration: 1,
			easing: 'linear',
			callback: function(){
				$this.rino.animateShow = false;
				
			}
		});
	}
	
	function rinoMove (x, duration, c) {
		
		if (duration === undefined)
			duration = 1;
		
		$this.rinoLayer.show();
		$this.rino.close = false;
		$this.rino.animateMove = true;
		$this.rinoLayer.transitionTo({
			x: x,
			duration: duration,
			easing: 'ease-in-out',
			callback: function(){
				$this.rino.animateMove = false;
				if (c !== undefined)
					c();
			}
		});
	}
	
	function rinoHide (c) {
		$this.rino.close = true;
		//$this.rino.tile.stop();
		$this.stage.remove($this.rinoLayer);
		delete($this.rinoLayer);
		if (c !== undefined)
			c();
	}
	
	function buildSpiderSpear (stage) {
		
		$this.spiderLayer = new Kinetic.Layer({
			x: 1000
		});
		
		$this.spiderLayer.setScale(0.9);
		
		var spiders = new Kinetic.Group({
			name: "spiders",
			x: 790
		});
		
		var spider1 = new Kinetic.Image({
			name: 'spider1',
			x: 300,
			y: 500,
			offset: {
				x: 123/2,
				y: 960
			},
			image: $this.menu.images.spider1,
            width: 123,
            height: 960,
            rotationDeg: 35
            //draggable: true
		});
		
		spiders.add(spider1);
		
		var spider2 = new Kinetic.Image({
			name: 'spider2',
			x: 200,
			y: 250,
			offset: {
				x: 109/2,
				y: 960
			},
			image: $this.menu.images.spider2,
            width: 109,
            height: 960,
            rotationDeg: 15
            //draggable: true
		});
		
		spiders.add(spider2);
		
		var spider3 = new Kinetic.Image({
			name: 'spider3',
			x: 10,
			y: 300,
			offset: {
				x: 94/2,
				y: 961
			},
			image: $this.menu.images.spider3,
            width: 94,
            height: 961,
            rotationDeg: 10
            //draggable: true
		});
		
		spiders.add(spider3);
		
		$this.spiderLayer.add(spiders);
		
		stage.add($this.spiderLayer);
		
		$this.spearLayer = new Kinetic.Layer({
			x: 1000
		});
		
		$this.spearLayer.setScale(0.9);
		
		var spears = new Kinetic.Group({
			name: "spears",
			x: 790,
			y: 400
		});
		
		var spear1 = new Kinetic.Image({
			name: 'spear1',
			x: 60,
			y: 140,
			offset: {
				x: 55/2,
				y: 0
			},
			image: $this.menu.images.gameBlackSpear,
            width: 55,
            height: 936,
            rotationDeg: 30,
            draggable: true
		});
		
		spears.add(spear1);
		
		var spear2 = new Kinetic.Image({
			name: 'spear1',
			x: 180,
			y: 60,
			offset: {
				x: 73/2,
				y: 0
			},
			image: $this.menu.images.blackSpear,
            width: 73,
            height: 907,
            rotationDeg: -10,
            draggable: true
		});
		
		spears.add(spear2);
		
		var spear3 = new Kinetic.Image({
			name: 'spear1',
			x: 260,
			y: 250,
			offset: {
				x: 55/2,
				y: 0
			},
			image: $this.menu.images.gameBlackSpear,
            width: 55,
            height: 936,
            rotationDeg: -20,
            draggable: true
		});
		
		spears.add(spear3);
		
		$this.spearLayer.add(spears);
		
		stage.add($this.spearLayer);
		
	}
	
	function animateSpider (scale, x, y) {
	
		if (scale === undefined) {
			scale = 0.9;
			y = 0;
			x = 0;
		} else {
			if (scale === 0.9) {
				scale = 1.1;
				y = -100;
				x = -50;
			}
			else {
				scale = 0.9;
				y = 0;
				x = 0;
			}
		}
		if ($this.menu.close === false) {
			$this.spiderLayer.transitionTo({
				duration: 0.5,
				easing: 'strong-ease-out',
				scale:  {
	              x: scale,
	              y: scale
	            },
	            x: x,
	            y: y,
				callback: function () {
					animateSpider(scale, x, y);
				}
			});
		}
		
	}
	
	function animateSpear (scale, x, y) {
	
		if (scale === undefined) {
			scale = 0.9;
			y = 0;
			x = 0;
		} else {
			if (scale === 0.9) {
				scale = 1;
				y = 0;
				x = -50;
			}
			else {
				scale = 0.9;
				y = 0;
				x = 0;
			}
		}
		if ($this.menu.close === false) {
			$this.spearLayer.transitionTo({
				duration: 0.5,
				easing: 'strong-ease-out',
				scale:  {
	              x: scale,
	              y: scale
	            },
	            x: x,
	            y: y,
				callback: function () {
					animateSpear(scale, x, y);
				}
			});
		}
		
	}
	
	function buildMenu (stage) {
		
		buildSpiderSpear(stage);
		
		$this.menuLayer = new Kinetic.Layer({
			x: 200,
			offset: {
                x: 400 / 2,
                y: 0
			},
			rotation: 3
		});
		
		var CoverRope = new Kinetic.Image({
			name: 'coverRope',
			x: 360,
			y: 10,
			image: $this.menu.images.coverRope,
            width: 84,
            height: 1260,
            rotationDeg: -3
		});
		
		$this.menuLayer.add(CoverRope);
	    
        /*var GiantNut = new Kinetic.Image({
			name: 'giantNut',
            x: 400,
            y: 0,
            offset: {
                x: 617 / 2,
                y: 617 / 2
            },
            image: $this.menu.images.giantNut,
            width: 617,
            height: 617
        });
        
        $this.menuLayer.add(GiantNut);*/
        
        var TitlePlate = new Kinetic.Image({
			name: 'titlePlate',
            x: 450,
            y: 100,
            offset: {
                x: 570 / 2,
                y: 155 / 2
            },
            image: $this.menu.images.titlePlate,
            width: 570,
            height: 155,
            rotationDeg: -5
        });
        
        $this.menuLayer.add(TitlePlate);
        
        var PlayNow = new Kinetic.Image({
			name: 'playNow',
            x: 410,
            y: 340,
            image: $this.menu.images.playNow,
            width: 305,
            height: 100,
            rotationDeg: -10
        });
        
        PlayNow.on('mousedown touchstart', function(){
			menuHide(function(){
				rinoMove(1200, 2, function(){
					rinoHide(function(){
						play(stage);
					});
				});
				//instructionsShow();
			});
			PlayNow.image = $this.menu.images.playNowOver;
		});
        
        PlayNow.on('mouseup touchend', function(){
			PlayNow.image = $this.menu.images.playNow;
        });
        
        PlayNow.on('mouseover', function(){
			document.body.style.cursor = "pointer";
        });
        
        PlayNow.on('mouseout', function(){
			document.body.style.cursor = "default";
        });
        
        $this.menuLayer.add(PlayNow);
        
        var Upgrades = new Kinetic.Image({
			name: 'upgrades',
            x: 415,
            y: 445,
            image: $this.menu.images.upgrades,
            width: 305,
            height: 100,
            rotationDeg: -7
        });
        
        Upgrades.on('mousedown touchstart', function(){
			Upgrades.image = $this.menu.images.upgradesOver;
        });
        
        Upgrades.on('mouseup touchend', function(){
			Upgrades.image = $this.menu.images.upgrades;
        });
        
        Upgrades.on('mouseover touchstart', function(){
			document.body.style.cursor = "pointer";
        });
        
        Upgrades.on('mouseout touchend', function(){
			document.body.style.cursor = "default";
        });
        
        $this.menuLayer.add(Upgrades);
        
		var Instructions = new Kinetic.Image({
			name: 'upgrades',
            x: 425,
            y: 580,
            image: $this.menu.images.instructions,
            width: 305,
            height: 100,
            rotationDeg: -5
        });
        
        Instructions.on('mousedown touchstart', function(){
			Instructions.image = $this.menu.images.instructionsOver;
        });
        
        Instructions.on('mouseup touchend', function(){
			$this.menu.animateHide = true;
			menuHide(function(){
				instructionsShow();
			});
			rinoMove(-200);
			Instructions.image = $this.menu.images.instructions;
        });
        
        Instructions.on('mouseover touchstart', function(){
			document.body.style.cursor = "pointer";
        });
        
        Instructions.on('mouseout touchend', function(){
			document.body.style.cursor = "default";
        });
        
        $this.menuLayer.add(Instructions);
        
        var MoreGames = new Kinetic.Image({
			name: 'upgrades',
            x: 425,
            y: 680,
            image: $this.menu.images.moreGames,
            width: 305,
            height: 100,
            rotationDeg: -2
        });
        
        MoreGames.on('mousedown touchstart', function(){
			document.body.style.cursor = "pointer";
			MoreGames.image = $this.menu.images.moreGamesOver;
        });
        
        MoreGames.on('mouseup touchend', function(){
			document.body.style.cursor = "default";
			MoreGames.image = $this.menu.images.moreGames;
        });
        
        MoreGames.on('mouseover touchstart', function(){
			document.body.style.cursor = "pointer";
        });
        
        MoreGames.on('mouseout touchend', function(){
			document.body.style.cursor = "default";
        });
        
        $this.menuLayer.add(MoreGames);
        
        $this.menuLayer.hide();
        
        stage.add($this.menuLayer);
        
	}
	
	function animateGiantNut (layer, frame) {
		//frame: lastTime time timeDiff
        var shape = layer.get('.giantNut')[0];
        
        // revolutions per second
        var angularDiff = 0.4 * 2 * Math.PI * frame.timeDiff / 1000;
        
        shape.attrs.rotation = shape.attrs.rotation + angularDiff;
        
        layer.draw();
	}
	
	function menuHide (c) {
		$this.menu.animateHide = true;
		$this.menuLayer.transitionTo({
			rotation: 3,
			duration: 0.8,
			easing: 'back-ease-in',
			callback: function() {
				$this.menuLayer.hide();
			}
		});
		
		$this.spiderLayer.transitionTo({
			duration: 0.8,
			easing: 'back-ease-out',
			x: 1000
		});
		
		$this.spearLayer.transitionTo({
			duration: 0.8,
			easing: 'back-ease-out',
			x: 1000,
			callback: function() {
				$this.spearLayer.hide();
				$this.menu.animateHide = false;
				$this.menu.close = true;
				$this.stage.remove($this.menuLayer);
				$this.stage.remove($this.spiderLayer);
				$this.stage.remove($this.spearLayer);
				delete($this.menuLayer);
				delete($this.spiderLayer);
				delete($this.spearLayer);
				if (c !== undefined)
					c();
			}
		});
	}
	
	function menuShow (c) {
		
		buildMenu($this.stage);
		
		$this.menu.animateShow = true;
		$this.menuLayer.show();
		$this.spiderLayer.show();
		$this.spearLayer.show();
		$this.menuLayer.transitionTo({
			rotation: 0,
			duration: 1,
			easing: 'back-ease-out',
			callback: function () {
				$this.menu.animateShow = false;
				$this.menu.close = false;
			}
		});
		
		$this.spiderLayer.transitionTo({
			duration: 1,
			easing: 'back-ease-out',
			x: 0,
			callback: function() {
				
				$this.spearLayer.transitionTo({
					duration: 1,
					easing: 'back-ease-out',
					x: 0,
					callback: function(){
						animateSpider();
						animateSpear();
						rinoShow();
						if (c !== undefined)
							c();
					}
				});
			}
		});
		
		
	}
	
	function buildInstructions (stage) {
		
		$this.instructionsLayer = new Kinetic.Layer();
		
		var Close = new Kinetic.Image({
			name: 'close',
			x: -207,
			y: 10,
			image: $this.instructions.images.close,
            width: 207,
            height: 205,
            rotationDeg: -3
		});
		
		Close.on('mousedown touchstart', function(){
			Close.image = $this.instructions.images.closeTouch;
			$this.instructionsLayer.draw();
        });
        
        Close.on('mouseup touchend', function(){
			Close.image = $this.instructions.images.close;
			$this.instructionsLayer.draw();
			instructionsHide();
			rinoMove(-120);
		});
		
		Close.on('mouseover', function(){
			document.body.style.cursor = "pointer";
        });
        
        Close.on('mouseout', function(){
			document.body.style.cursor = "default";
        });
		
		$this.instructionsLayer.add(Close);
		
		var Tongue = new Kinetic.Image({
			name: 'tongue',
			x: 240,
			y: 900,
			image: $this.instructions.images.tongue,
            width: 865,
            height: 890,
            rotationDeg: -7
		});
		
		$this.instructionsLayer.add(Tongue);
		
		var text = new Kinetic.Image({
			name: 'text',
			x: 300,
			y: 900,
			image: $this.instructions.images.text,
            width: 750,
            height: 623,
            rotationDeg: -7
		});
		
		$this.instructionsLayer.add(text);
		
		var prev = new Kinetic.Image({
			name: 'prev',
			x: 460,
			y: 900,
			image: $this.instructions.images.prev,
            width: 215,
            height: 105,
            rotationDeg: -7
		});
		
		prev.on('mousedown touchstart', function(){
			prev.image = $this.instructions.images.prevTouch;
			$this.instructionsLayer.draw();
        });
        
        prev.on('mouseup touchend', function(){
			prev.image = $this.instructions.images.prev;
			$this.instructionsLayer.draw();
		});
		
		prev.on('mouseover', function(){
			document.body.style.cursor = "pointer";
        });
        
        prev.on('mouseout', function(){
			document.body.style.cursor = "default";
        });
		
		$this.instructionsLayer.add(prev);
		
		var next = new Kinetic.Image({
			name: 'next',
			x: 910,
			y: 900,
			image: $this.instructions.images.next,
            width: 215,
            height: 105,
            rotationDeg: -7
		});
		
		next.on('mousedown touchstart', function(){
			next.image = $this.instructions.images.nextTouch;
			$this.instructionsLayer.draw();
        });
        
        next.on('mouseup touchend', function(){
			next.image = $this.instructions.images.next;
			$this.instructionsLayer.draw();
		});
		
		next.on('mouseover', function(){
			document.body.style.cursor = "pointer";
        });
        
        next.on('mouseout', function(){
			document.body.style.cursor = "default";
        });
		
		$this.instructionsLayer.add(next);
		
		$this.instructionsLayer.hide();
		
		stage.add($this.instructionsLayer);
		
	}
	
	function instructionsHide () {
		
		$this.instructions.animateHide = true;
		
		layer = $this.instructionsLayer;
		
		var close = layer.get('.close')[0];
		var tongue = layer.get('.tongue')[0];
		var text = layer.get('.text')[0];
		var next = layer.get('.next')[0];
		var prev = layer.get('.prev')[0];
		
		text.transitionTo({
			duration: 0.6,
			y: 900,
			easing: 'ease-in-out',
			callback: function() {
				tongue.transitionTo({
					y: 900,
					duration: 0.3,
					easing: 'ease-in-out',
					callback: function() {
						close.transitionTo({
							x: -207,
							duration: 0.3,
							easing: 'back-ease-out',
							callback: function(){
								$this.instructions.animateHide = false;
								$this.instructions.close = true;
								$this.instructionsLayer.hide();
								$this.stage.remove($this.instructionsLayer);
								delete($this.instructionsLayer);
								menuShow();
							}
						});
					}
				});
				
				prev.transitionTo({
					y: 900,
					duration: 0.6,
					easing: 'ease-in-out'
				});
				next.transitionTo({
					y: 900,
					duration: 0.6,
					easing: 'ease-in-out'
				});
			}
		});
		
		
	}
	
	function instructionsShow () {
		
		buildInstructions($this.stage);
		
		$this.instructions.animateShow = true;
		$this.instructionsLayer.show();
		
		layer = $this.instructionsLayer;
		
		var close = layer.get('.close')[0];
		var tongue = layer.get('.tongue')[0];
		var text = layer.get('.text')[0];
		var next = layer.get('.next')[0];
		var prev = layer.get('.prev')[0];
		
		close.transitionTo({
			x: 20,
			duration: 0.3,
			easing: 'back-ease-out',
			callback: function() {
				tongue.transitionTo({
					y: 50,
					duration: 0.6,
					easing: 'strong-ease-out',
					callback: function(){
						text.transitionTo({
							duration: 0.6,
							y: 55,
							easing: 'strong-ease-out'
						});
						$this.instructions.animateShow = false;
						$this.instructions.close = false;
					}
				});
				prev.transitionTo({
					y: 680,
					duration: 0.6,
					easing: 'strong-ease-out'
				});
				next.transitionTo({
					y: 630,
					duration: 0.6,
					easing: 'strong-ease-out'
				});
			}
		});
	}
	
function update () {
	
	if ($this.selector.width() < $this.selector.height())
		ratio = $this.selector.width() / $this.width;
	if ($this.selector.height() < $this.selector.width()) {
		ratio = $this.selector.height() / $this.height;
	}
	
	if (ratio > 1)
		ratio = 1;
	
	if ($this.stage !== undefined) {
		$this.stage.setSize($this.width * ratio, $this.height * ratio);
		$this.stage.setScale(ratio);
	}
	
	$('.kineticjs-content').width($this.width * ratio).height($this.height * ratio);
	$('#menu').width($this.width * ratio).height($this.height * ratio);
	$('#menu').css('left', $('#container').width() / 2 - $this.width * ratio / 2);
	
	return false;
	
}

function play (stage) {
	
	var black = new Kinetic.Layer({
		
	});
	
	var curtin = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: $this.width,
		height: $this.height,
		fill: 'black',
		alpha: 0
	});
	
	black.add(curtin);
	
	stage.add(black);
	
	curtin.transitionTo({
		alpha: 1,
		duration: 0.6,
		callback: function () {
			destroyStage();
			stagePlayLoader();
		}
	});
	
}

function gameover (stage) {
	
	var black = new Kinetic.Layer({
		
	});
	
	var curtin = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: $this.width,
		height: $this.height,
		fill: 'black',
		alpha: 0
	});
	
	black.add(curtin);
	
	var overText = new Kinetic.Text({
		x: $this.width / 2,
		y: $this.height / 2 - 30 - 50,
		text: "Game Over",
		fontSize: 30,
        fontFamily: "Calibri",
        textFill: "yellow",
        align: "center",
        verticalAlign: "middle"
	});
	
	black.add(overText);
	
	var scoreText = new Kinetic.Text({
		x: $this.width / 2,
		y: $this.height / 2 - 30 + 50,
		text: "Your score: "+$this.gameplay.score,
		fontSize: 30,
        fontFamily: "Calibri",
        textFill: "yellow",
        align: "center",
        verticalAlign: "middle"
	});
	
	black.add(scoreText);
	
	stage.add(black);
	
	curtin.transitionTo({
		alpha: 1,
		duration: 3,
		callback: function () {
			setTimeout(function(){
				destroyStage();
				stageCoverLoader();
			}, 3000);
		}
	});
	
}

function stagePlayLoader () {
	
	$this.gameplay = {
		x: 0,
		y: 0,
		max: 3,
		score: 0,
		moves: 0,
		over: false
	};
	
	$this.stageName = 'loader';
	
	var lyr = new Kinetic.Layer();
	
	var loadingText = new Kinetic.Text({
		x: $this.width / 2,
		y: $this.height / 2 - 30,
		text: "Loading...",
		fontSize: 30,
        fontFamily: "Calibri",
        textFill: "white",
        align: "center",
        verticalAlign: "middle"
	});
	
	lyr.add(loadingText);
	
	var loadBar = new Kinetic.Rect({
		x: $this.width / 2 - $this.width / 8,
		y: $this.height / 2,
		width: $this.width / 4,
		height: 10,
		fill: 'white'
	});
	
	lyr.add(loadBar);
	
	var loadBarStatus = new Kinetic.Rect({
		x: $this.width / 2 - $this.width / 8 + 2,
		y: $this.height / 2 + 2,
		width: $this.width / 4 - 4,
		height: 6,
		fill: 'black'
	});
	
	lyr.add(loadBarStatus);
	
	$this.stage.add(lyr);
	
	$this.stage.onFrame(function(frame){
		loadBarStatus.attrs.x = ($this.width / 2 - $this.width / 8 + 2) + loadedImages * (loadBar.attrs.width - 4) / totalImages;
		loadBarStatus.attrs.width = loadBar.attrs.width - 4 - (loadedImages * (loadBar.attrs.width - 4) / totalImages);
		lyr.draw();
	});
	
	$this.stage.start();
	
	loader = new PxLoader();
	
	var totalImages = 0;
	
	var loadedImages = 0;
	
	$this.sky = loader.addImage("img/SkyBg.png"); totalImages++;
	$this.cloud = loader.addImage("img/CloudsPack.png"); totalImages++;
	$this.ground = loader.addImage("img/GroundTile.png"); totalImages++;
	$this.rino.image = loader.addImage("img/RinoAnim.png"); totalImages++;
	
	$this.menu.images.spider1 = loader.addImage("img/CoverSpider1.png"); totalImages++;
	$this.menu.images.spider2 = loader.addImage("img/CoverSpider2.png"); totalImages++;
	$this.menu.images.spider3 = loader.addImage("img/CoverSpider3.png"); totalImages++;
	
	loader.addProgressListener(function(e){
		loadedImages++;
	});
	
	loader.addCompletionListener(function(){
		destroyStage();
		stagePlay(true);
	});
	
	loader.start();
	
}
	
function stagePlay (execute) {
	
	$this.stageName = 'play';
		
	$this.stage = new Kinetic.Stage({
		container: 'main',
		width: 1280,
		height: 800
	});
	
	$this.stage.setScale(1/$this.pixelRatio);
	
	update();
    
    buildPlay($this.stage);
	
	$this.stage.onFrame(function(frame) {
		
		/*if ($this.menu.close === false && $this.menu.animateHide === false && $this.menu.animateShow === false)
			animateGiantNut($this.menuLayer, frame);*/
		
		if ($this.rino.close === false)
			animateRino($this.rinoLayer, frame);
			
		playTick(frame);
		
	});
	
	$this.stage.start();
	
	animateCloud();
	
	animateGroundPlay();
	
	rinoShow(-200);
	
}

function playTick (frame) {
	
	var max = Math.round($this.gameplay.max);
	
	var childrens = $this.spiderPlayLayer.getChildren();
	
	var len = childrens.length;
	
	if (childrens.length < $this.gameplay.max)
		createSpider();
		
	var xs = $this.gameplay.x + 25;
	var ys = $this.gameplay.y + 50;
	
	for (var i = 0; i < len; i++) {
		
		var child = childrens[i];
		
		if (child.attrs.x < xs && child.attrs.y > ys && child.attrs._hit === false) {
			spiderHit(child, max);
		}
		
	}
	
	if ($this.gameplay.moves !== 0 && $this.rino.animateMove === false && $this.rino.close === false) {
		rinoMove($this.rinoLayer.attrs.x + 100 * $this.gameplay.moves);
		$this.gameplay.moves = 0;
	}
	
	$('.nfo').html($this.gameplay.score);
	
	$this.gameplay.max += 0.001;
	
	if (xs >= 1280 && $this.gameplay.over === false) {
		$this.gameplay.over = true;
		rinoHide(function(){
			gameover($this.stage);
		});
	}
}

function spiderHit(spider, max) {
	$this.gameplay.score -= 10 * max;
	if ($this.gameplay.score < 0)
		$this.gameplay.score = 0;
	
	spider.attrs._hit = true;
	spider.transitionTo({
		alpha: 0,
		y: 0,
		duration: 0.3,
		callback: function(){
			$this.spiderPlayLayer.remove(spider);
		}
	});
	$this.gameplay.moves += 1;
}

function createSpider() {
	
	var spiderId = Math.round(1+Math.random()*2);
	
	var image = '';
	
	if (spiderId === 1)
		image = $this.menu.images.spider1;
	if (spiderId === 2)
		image = $this.menu.images.spider2;
	if (spiderId === 3)
		image = $this.menu.images.spider3;
	
	var spider = new Kinetic.Image({
		x: 1280,
		y: Math.round(200+Math.random()*400),
		radius: 50,
		image: image,
		draggable: true,
		dragConstraint: "vertical",
		_hit: false, 
		_log: false, 
		offset: {
			y: 960
		}
	});
	
	$this.spiderPlayLayer.add(spider);
	
	spider.transitionTo({
		x: -120,
		duration: Math.round(3+Math.random()*10),
		callback: function(){
			if (spider.attrs._hit === false) {
				$this.gameplay.score += 10;
				if ($this.rino.close === false && $this.rinoLayer.attrs.x > -200)
					$this.gameplay.moves -= 0.1;
			}
			spider.hide();
			$this.spiderPlayLayer.remove(spider);
		}
	});
}

function buildPlay (stage) {
	
	buildBackground($this.stage);
	buildCloud($this.stage);
    buildGroundPlay($this.stage);
    buildRino($this.stage, 0);
    
    $this.spiderPlayLayer = new Kinetic.Layer({
		
	});
	
	$this.stage.add($this.spiderPlayLayer);
    
}

function buildCloud (stage) {
	
	$this.cloudLayer = new Kinetic.Layer({
		
	});
		
    var CloudTile = new Kinetic.Image({
        x: 150,
        y: 100,
        image: $this.cloud,
        width: 940,
        height: 250
    });
    var CloudTile2 = new Kinetic.Image({
        x: 1580,
        y: 100,
        image: $this.cloud,
        width: 940,
        height: 250
    });
    
	$this.cloudLayer.add(CloudTile);
	$this.cloudLayer.add(CloudTile2);
    
    stage.add($this.cloudLayer);
}

function animateCloud () {
    $this.cloudLayer.transitionTo({
		x: -1280,
		duration: 5,
		callback: function(){
			$this.cloudLayer.attrs.x = 150;
			if ($this.stageName === 'play')
				animateCloud();
		}
	});
}

function buildGroundPlay (stage) {
	
	$this.groundLayer = new Kinetic.Layer({
		
	});
		
    var GroundTile = new Kinetic.Image({
        x: -20,
        y: 370,
        image: $this.ground,
        width: 1280,
        height: 600
    });
    var GroundTile2 = new Kinetic.Image({
        x: 1259,
        y: 370,
        image: $this.ground,
        width: 1280,
        height: 600
    });
    
	$this.groundLayer.add(GroundTile);
	$this.groundLayer.add(GroundTile2);
    
    stage.add($this.groundLayer);
}


function animateGroundPlay () {
    $this.groundLayer.transitionTo({
		x: -1280,
		duration: 1.8,
		callback: function(){
			$this.groundLayer.attrs.x = -10;
			if ($this.stageName === 'play')
				animateGroundPlay();
		}
	});
}


run($('#main'));

$(window).resize(function(){
		
	update();
		
});	

$(document).ready(function(){

	update();

	setTimeout(function() { window.scrollTo(0, 1); }, 100);
	
	$(window).resize(function(){
			
		update();
			
	});

});