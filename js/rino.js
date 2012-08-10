function loadData() {   
	var data = {
		"running": [
			{x:380,y:1794,width:184,height:252},
			{x:768,y:1242,width:186,height:260},
			{x:192,y:1524,width:186,height:270},
			{x:388,y:1240,width:190,height:278},
			{x:2,y:1238,width:192,height:284},
			{x:204,y:946,width:194,height:292},
			{x:604,y:942,width:194,height:298},
			{x:804,y:636,width:196,height:302},
			{x:404,y:636,width:198,height:306},
			{x:2,y:636,width:200,height:310},
			{x:406,y:322,width:200,height:312},
			{x:816,y:320,width:200,height:314},
			{x:818,y:2,width:202,height:316},
			{x:410,y:2,width:202,height:318},
			{x:206,y:2,width:202,height:318},
			{x:2,y:2,width:202,height:318},
			{x:614,y:2,width:202,height:316},
			{x:614,y:320,width:200,height:314},
			{x:204,y:322,width:200,height:312},
			{x:2,y:322,width:200,height:312},
			{x:204,y:636,width:198,height:308},
			{x:604,y:636,width:198,height:304},
			{x:804,y:940,width:196,height:300},
			{x:404,y:944,width:194,height:294},
			{x:2,y:948,width:194,height:288},
			{x:196,y:1240,width:190,height:282},
			{x:2,y:1524,width:188,height:276},
			{x:380,y:1524,width:186,height:268},
			{x:580,y:1242,width:186,height:260},
			{x:380,y:1794,width:184,height:252}
		]
	};
	return data;
}
/*
function loadData() {   
	var data = {"frames": [
		{
			"frame": {"x":380,"y":1794,"w":184,"h":252},
			"spriteSourceSize": {"x":188,"y":80,"w":184,"h":252}
		},
		{
			"frame": {"x":768,"y":1242,"w":186,"h":260},
			"spriteSourceSize": {"x":187,"y":72,"w":186,"h":260}
		},
		{
			"frame": {"x":192,"y":1524,"w":186,"h":270},
			"spriteSourceSize": {"x":187,"y":62,"w":186,"h":270}
		},
		{
			"frame": {"x":388,"y":1240,"w":190,"h":278},
			"spriteSourceSize": {"x":184,"y":54,"w":190,"h":278}
		},
		{
			"frame": {"x":2,"y":1238,"w":192,"h":284},
			"spriteSourceSize": {"x":183,"y":48,"w":192,"h":284}
		},
		{
			"frame": {"x":204,"y":946,"w":194,"h":292},
			"spriteSourceSize": {"x":181,"y":40,"w":194,"h":292}
		},
		{
			"frame": {"x":604,"y":942,"w":194,"h":298},
			"spriteSourceSize": {"x":181,"y":34,"w":194,"h":298}
		},
		{
			"frame": {"x":804,"y":636,"w":196,"h":302},
			"spriteSourceSize": {"x":179,"y":30,"w":196,"h":302}
		},
		{
			"frame": {"x":404,"y":636,"w":198,"h":306},
			"spriteSourceSize": {"x":178,"y":26,"w":198,"h":306}
		},
		{
			"frame": {"x":2,"y":636,"w":200,"h":310},
			"spriteSourceSize": {"x":176,"y":21,"w":200,"h":310}
		},
		{
			"frame": {"x":406,"y":322,"w":200,"h":312},
			"spriteSourceSize": {"x":176,"y":19,"w":200,"h":312}
		},
		{
			"frame": {"x":816,"y":320,"w":200,"h":314},
			"spriteSourceSize": {"x":176,"y":17,"w":200,"h":314}
		},
		{
			"frame": {"x":818,"y":2,"w":202,"h":316},
			"spriteSourceSize": {"x":174,"y":15,"w":202,"h":316}
		},
		{
			"frame": {"x":410,"y":2,"w":202,"h":318},
			"spriteSourceSize": {"x":175,"y":13,"w":202,"h":318}
		},
		{
			"frame": {"x":206,"y":2,"w":202,"h":318},
			"spriteSourceSize": {"x":174,"y":13,"w":202,"h":318}
		},
		{
			"frame": {"x":2,"y":2,"w":202,"h":318},
			"spriteSourceSize": {"x":174,"y":13,"w":202,"h":318}
		},
		{
			"frame": {"x":614,"y":2,"w":202,"h":316},
			"spriteSourceSize": {"x":174,"y":15,"w":202,"h":316}
		},
		{
			"frame": {"x":614,"y":320,"w":200,"h":314},
			"spriteSourceSize": {"x":176,"y":17,"w":200,"h":314}
		},
		{
			"frame": {"x":204,"y":322,"w":200,"h":312},
			"spriteSourceSize": {"x":176,"y":19,"w":200,"h":312}
		},
		{
			"frame": {"x":2,"y":322,"w":200,"h":312},
			"spriteSourceSize": {"x":176,"y":20,"w":200,"h":312}
		},
		{
			"frame": {"x":204,"y":636,"w":198,"h":308},
			"spriteSourceSize": {"x":178,"y":24,"w":198,"h":308}
		},
		{
			"frame": {"x":604,"y":636,"w":198,"h":304},
			"spriteSourceSize": {"x":178,"y":28,"w":198,"h":304}
		},
		{
			"frame": {"x":804,"y":940,"w":196,"h":300},
			"spriteSourceSize": {"x":179,"y":32,"w":196,"h":300}
		},
		{
			"frame": {"x":404,"y":944,"w":194,"h":294},
			"spriteSourceSize": {"x":181,"y":38,"w":194,"h":294}
		},
		{
			"frame": {"x":2,"y":948,"w":194,"h":288},
			"spriteSourceSize": {"x":181,"y":44,"w":194,"h":288}
		},
		{
			"frame": {"x":196,"y":1240,"w":190,"h":282},
			"spriteSourceSize": {"x":184,"y":50,"w":190,"h":282}
		},
		{
			"frame": {"x":2,"y":1524,"w":188,"h":276},
			"spriteSourceSize": {"x":186,"y":56,"w":188,"h":276}
		},
		{
			"frame": {"x":380,"y":1524,"w":186,"h":268},
			"spriteSourceSize": {"x":187,"y":64,"w":186,"h":268}
		},
		{
			"frame": {"x":580,"y":1242,"w":186,"h":260},
			"spriteSourceSize": {"x":187,"y":72,"w":186,"h":260}
		},
		{
			"frame": {"x":380,"y":1794,"w":184,"h":252},
			"spriteSourceSize": {"x":188,"y":80,"w":184,"h":252}
		}],
		"meta": {
			"app": "http://www.texturepacker.com",
			"version": "1.0",
			"image": "RinoAnim.png",
			"format": "RGBA8888",
			"size": {"w":1024,"h":2048},
			"scale": "1",
			"smartupdate": "$TexturePacker:SmartUpdate:368ec8b705ed795e1b40ccd9db5add2b$"
		}
		};
	return data.frames;
}*/