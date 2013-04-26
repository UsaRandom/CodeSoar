var canvas = document.getElementById("background");
	var bg = canvas.getContext("2d");
	var dimensions = { x: 0, y: 0 }, diagonal = 0;
	var mousePos = { x: 0, y: 0 }, startPos = { x: 0, y: 0 }, rotation = 0, pressed = false, _lastFrameTime = new Date().getTime(), _totalTime = 0, _counter = 0;
	var domPrefix = "", browserPrefix = "";

	function init(){
		// get dom- and browserPrefixes for css styles
		if (typeof(document.body.style.transform) != 'undefined') {
		} else if (typeof(document.body.style.MozTransform) != 'undefined') {
			domPrefix = "Moz", browserPrefix = "-moz-";
		}else if (typeof(document.body.style.webkitTransform) != 'undefined') {
			domPrefix = "webkit", browserPrefix = "-webkit-";
		} else if (typeof(document.body.style.OTransform) != 'undefined') {
			domPrefix = "O", browserPrefix = "-o-";
		} else if (typeof(document.body.style.msTransform) != 'undefined') {
			domPrefix = "ms", browserPrefix = "-ms-";
		} else if (typeof(document.body.style.KhtmlTransform) != 'undefined') {
			domPrefix = "Khtml", browserPrefix = "-khtml-";
		}
	
		
		// initiate resize
		window.addEventListener( "resize", start, false );

		// lets go
		start();
		
		// animation loop
		if(!Modernizr.cssanimations){
			setInterval( loop, 1000 / 60 );
		}
	}
	
	function start(){
		dimensions = { x: document.body.clientWidth, y: document.body.clientHeight };
		diagonal = Math.round( Math.sqrt( dimensions.x*dimensions.x + dimensions.y*dimensions.y ) );
		canvas.height = diagonal;
		canvas.width = diagonal;
		canvas.style.marginTop = -(diagonal-dimensions.y)/2+"px";
		canvas.style.marginLeft = -(diagonal-dimensions.x)/2+"px";
		canvas.style[domPrefix+"TransformOrigin"] = diagonal/2+"px "+diagonal/2+"px";
		// set canvas center to document center
		bg.translate(diagonal/2, diagonal/2);
		var sunray = new star(30, 50, "white");
		sunray.draw();
	}
	
	function star(spikes, radius, color){
		this.spikes = spikes;
		this.radius = radius;
		this.radiants = 2 * Math.PI/spikes;
		this.offsetX = radius * Math.cos(this.radiants);
		this.offsetY = radius * Math.sin(this.radiants);
		this.starLength = diagonal;
		this.EndY = this.starLength * Math.tan(this.radiants/2);
		bg.fillStyle = color;
	}
	
	star.prototype = {
		draw: function(){
			bg.clearRect(-this.starLength, -this.starLength, this.starLength*2, this.starLength*2);
			bg.beginPath();
			bg.arc(0, 0, this.radius, 0, Math.PI*2,true);
			bg.fill();
			for(var i = 0; i<this.spikes; i++){
				bg.beginPath();
				bg.moveTo(this.radius,0);
				bg.lineTo(this.starLength, this.EndY);
				bg.lineTo(this.offsetX, this.offsetY);
				bg.fill();
				bg.rotate(this.radiants);
			}
		}
	}
	
	function loop(){
		var time = new Date().getTime();
		_counter++;
		_totalTime += ( time - _lastFrameTime );
		_lastFrameTime = time;
		// rotate the sunray
		canvas.style[domPrefix+"Transform"] = "rotate("+ - --rotation +"deg)";
	
	}

	init();