var display = 'Canvas';


$(function () {
	Crafty.init(800, 640);
	
	if(display=='Canvas')
		Crafty.canvas.init();
	
	//the loading screen that will display while our assets load
	Crafty.scene("loading", function () {
		
		//load takes an array of assets and a callback when complete
		Crafty.load(['images/background.png','images/title.png','images/cage.png'], function () {
			
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});

		// Black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, "+display+", Text").attr({
			w : 100,
			h : 20,
			x : 150,
			y : 120
		})
		.text("Loading...");
	});
	
	Crafty.scene("main", function(){
		Crafty.background('transparent url(/images/background.png) no-repeat center center');
		Crafty.audio.add("theme", "audio/theme.mp3");
		
		//Crafty.audio.play("theme", -1, 0.5);
		
		Crafty.sprite('/images/title.png', {
			titleSprite: [0, 0, 592, 160]
		});
		
		Crafty.sprite('/images/shark-side.png', {
			sharkSide: [0, 0, 800, 319]
		});
			
		Crafty.e("2D, "+display+", titleSprite").attr({
			x: 100,
			y: 60,
			z: 1
		});
		
		var shark = Crafty.e('2D, '+display+', Tween, sharkSide').attr({
			x: -801,
			y: 260,
			z: 1,
			h: 319,
			w: 800
		});
		
		//var menu = Crafty.e();
		
		var sharkSpeed = 120;
		shark.tween({
				x: 801
		}, sharkSpeed)
		.bind('TweenEnd', function(){
			var delay = Math.random()*3000;
			setTimeout(function(){
				shark._x = -810;
				shark.tween({
					x: 810
				}, sharkSpeed);
			}, delay);
		});
		
		
		// setInterval(function(){
			
		
		// }, 3000);
		
	});

	// Automatically play the loading scene
	Crafty.scene("loading");

});
