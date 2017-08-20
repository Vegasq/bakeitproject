import { Gameplay } from './gameplay.js';
import { NewGame } from './newgame.js';
import { GameOver } from './gameover.js';


export class State {
	constructor(){
		this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'CCS');

		this.gameplay_state = Gameplay.Singletone(this.game);
		this.game.state.add("gameplay", this.gameplay_state);

		this.newgame_state = NewGame.Singletone(this.game);
		this.game.state.add("newgame", this.newgame_state);

		this.gameover_state = GameOver.Singletone(this.game);
		this.game.state.add("gameover", this.gameover_state);

		this.game.state.start("newgame");
	}
}


var st = new State();
