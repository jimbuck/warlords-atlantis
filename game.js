var display = 'DOM';
var gameWidth = 800;
var gameHeight = 640;

$(function () {
	Crafty.init(gameWidth, gameHeight);
	
	if(display=='Canvas')
		Crafty.canvas.init();
	
	//the loading screen that will display while our assets load
	Crafty.scene("loading", function () {
		
		//load takes an array of assets and a callback when complete
		Crafty.load(['images/background.png','images/title.png','images/cage.png','images/shark-side.png'], function () {
			
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});

		// Black background with some loading text
		Crafty.background("#FFFFFF");
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
		//Crafty.audio.add("theme", "audio/theme.mp3");
		
		Crafty.audio.play("theme", -1, 0.5);
		
		Crafty.sprite('/images/title.png', {
			titleSprite: [0, 0, 592, 160]
		});
		
		Crafty.sprite('/images/shark-side.png', {
			sharkSide: [0, 0, 800, 319]
		});
		
		Crafty.sprite('/images/light-plank.png', {
			lightWood: [0,0,254,145]
		});
		Crafty.sprite('/images/dark-plank.png', {
			darkWood: [0,0,254,145]
		});
			
		Crafty.e("2D, "+display+", titleSprite").attr({
			x: 100,
			y: 20,
			z: 1
		});
		
		var shark = Crafty.e('2D, '+display+', Tween, sharkSide').attr({
			x: -801,
			y: 260,
			z: 1,
			h: 319,
			w: 800
		});
		
		// Create Menu objects...
		var startButton = Crafty.e('2D, '+display+', lightWood, Text, Tween, menu-text, Mouse')
			.attr({
				x: 250,
				y: 190,
				z: 10
			}).text('<p>START GAME</p>')
			.bind('MouseOver', function(){
				this.tween({
					rotation: -4
				}, 10);
			}).bind('MouseOut', function(){
				this.tween({
					rotation: 5
				}, 10);
			});
		
		var optionsButton = Crafty.e('2D, '+display+', lightWood, Text, Tween, menu-text, Mouse')
			.attr({
				x: 270,
				y: 340,
				z: 10
			}).text('<p>OPTIONS</p>')
			.bind('MouseOver', function(){
				this.tween({
					rotation: -2
				}, 10);
			}).bind('MouseOut', function(){
				this.tween({
					rotation: -4
				}, 10);
			});
			
		var helpButton = Crafty.e('2D, '+display+', lightWood, Text, Tween, menu-text, Mouse')
			.attr({
				x: 260,
				y: 480,
				z: 10
			}).text('<p>HELP</p>')
			.bind('MouseOver', function(){
				this.tween({
					rotation: 3
				}, 10);
			}).bind('MouseOut', function(){
				this.tween({
					rotation: -1
				}, 10);
			});
		
		setInterval(function(){
			shark.trigger('swimLeft');
		}, 8000);
		setTimeout(function(){
			setInterval(function(){
				shark.trigger('swimRight');
			}, 8000);
		}, 4000);
			
		
		shark.bind('swimLeft', function(){
			shark.unflip('X');
			shark.tween({
				x: gameWidth+1
			}, 30);
		}).bind('swimRight', function(){
			shark.flip('X');
			shark.tween({
				x: (-1*shark._w) - 1
			}, 30);
		});
	});

	// Automatically play the loading scene
	Crafty.scene("loading");
});
