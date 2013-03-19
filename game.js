


$(function () {
	Crafty.init(800, 640);

	//the loading screen that will display while our assets load
	Crafty.scene("loading", function () {
		//load takes an array of assets and a callback when complete
		Crafty.load(["title.png"], function () {
			Crafty.scene("main"); //when everything is loaded, run the main scene
		});

		// Black background with some loading text
		Crafty.background("#000");
		Crafty.e("2D, DOM, Text").attr({
			w : 100,
			h : 20,
			x : 150,
			y : 120
		})
		.text("Loading...")
		.css({
			'text-align' : 'center',
			'color': '#fff'
		});
	});
	
	Crafty.scene("main", function(){
		Crafty.audio.add("theme", "audio/theme.mp3");
		
		//Crafty.audio.play("theme", -1, 0.5);
		
		// Blue background...
		Crafty.background("#01c");
		Crafty.e("2D, DOM, Text").attr({
			w : 100,
			h : 20,
			x : 150,
			y : 120
		})
		.text("Playing...")
		.css({
			"text-align" : "center",
			'color': '#fff'
		});	
	});

	// Automatically play the loading scene
	Crafty.scene("loading");

});
