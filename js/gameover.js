
export class GameOver {

	static Singletone(game){
		if (GameOver.hasOwnProperty("_singletone")) {
			return GameOver._singletone;
		} else {
			this._singletone = new GameOver(game);
			return this._singletone;
		}
	}

	constructor(game){
		this.game = game;
	}

	preload(){
		var that = GameOver.Singletone();
	    that.game.load.image('alona', 'alona.png');
	}
	create(){
		var that = GameOver.Singletone();

		var textGroup = that.game.add.group();

		for (var i = 0; i < 10; i++)
		{
			textGroup.add(that.game.make.text(100, 64 + i * 32, 'you suck, you suck, you suck, you suck, ',  { font: "32px Arial", fill: generateHexColor() }));
		}

		that.button = that.game.add.button(that.game.world.centerX - 95, 400, 'alona', that.btnclicked, this, 2, 1, 0);

	}
	update(){
		var that = GameOver.Singletone();
	}
	render(){
		var that = GameOver.Singletone();
	}

	btnclicked(){
		var that = GameOver.Singletone();
		that.game.state.start("gameplay");
	}
}


function generateHexColor() { 
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
}
