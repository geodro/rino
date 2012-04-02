/* Author: 
	George Dumitrescu
*/

var x_dom = $('.x');
var y_dom = $('.y');
var z_dom = $('.z');
var a_dom = $('.a');
var b_dom = $('.b');
var g_dom = $('.g');

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

var panorama = new function() {

	var $this = this;
	
	$this.selector = undefined;
	$this.width = 8318;
	$this.height = 1600;
	
	$this.currentWidth = 0;
	$this.currentHeight = 0;
	
	$this.run = function (selector) {
	
		$this.selector = selector;
	
		if ($this.selector == undefined) {
			alert('selector undefined');
			return false;
		}
		
		$this.update();
		
		$this.center();
	
	}
	
	$this.update = function () {
	
		$this.currentHeight = $this.selector.height(); 
		
		$this.currentWidth = $this.currentHeight * $this.width / $this.height;
		
		$this.selector.width($this.currentWidth);
		
		$this.selector.find('.left').width($this.selector.parent().width() / 2);
		$this.selector.find('.right').width($this.selector.parent().width() / 2);
		
		$this.selector.find('.left').height($this.currentHeight);
		$this.selector.find('.right').height($this.currentHeight);
		
		$this.selector.find('.left').css('left', 0 - $this.selector.parent().width() / 2);
		$this.selector.find('.right').css('right', 0 - $this.selector.parent().width() / 2);
		
		//$this.selector.css('backgroundSize', $this.currentHeight + ' ' + $this.currentWidth);
		
	}
	
	$this.rotate = function (a) {
	
		var diff = (0 - ($this.currentWidth*a)/360) + $this.currentWidth / 2 - $this.selector.parent().width() / 2;
		
		//$this.selector.stop().animate({marginLeft: 0 - diff}, 500, 'linear');
		
		diff = Math.round(diff*10)/10;
		
		$this.selector.css('marginLeft', 0 - diff);
		
		$('.nfo').html(a);
	
	}
	
	$this.center = function() {
	
		var diff = $this.currentWidth / 2 - $this.selector.parent().width() / 2;
		
		$this.selector.css('marginLeft', 0 - diff);
	
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
	
		var a = Math.round(event.alpha*100/1)/100;
		
		if (a > 180) {
		
			a = 0 - (360 - a);
		
		}
		
		panorama.rotate(a);
		
	}

});