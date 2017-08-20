
export class NewGame {

	static Singletone(game){
		if (NewGame.hasOwnProperty("_singletone")) {
			return NewGame._singletone;
		} else {
			this._singletone = new NewGame(game);
			return this._singletone;
		}
	}

	constructor(game){
		this.game = game;
	}

	preload(){
		var that = NewGame.Singletone();
	    that.game.load.image('alona', 'alona.png');
	}
	create(){
		var that = NewGame.Singletone();

		var textGroup = that.game.add.group();

		for (var i = 0; i < 10; i++)
		{
			textGroup.add(that.game.make.text(100, 64 + i * 32, 'your game starts here, your game starts here',  { font: "32px Arial", fill: generateHexColor() }));
		}

		that.button = that.game.add.button(that.game.world.centerX - 95, 400, 'alona', that.btnclicked, this, 2, 1, 0);

	}
	update(){
		var that = NewGame.Singletone();
	}
	render(){
		var that = NewGame.Singletone();
	}

	btnclicked(){
		var that = NewGame.Singletone();
		that.game.state.start("gameplay");
	}
}


function generateHexColor() { 
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
}
