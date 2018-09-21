// import { Gameplay } from './gameplay.js';
// import { NewGame } from './newgame.js';
// import { GameOver } from './gameover.js';


class State {
    constructor(){
        this.game = new Phaser.Game(1920, 1080, Phaser.CANVAS, 'CCS');

        this.gameplay_state = Gameplay.Singletone(this.game);
        this.game.state.add("gameplay", this.gameplay_state);

        this.newgame_state = NewGame.Singletone(this.game);
        this.game.state.add("newgame", this.newgame_state);

        this.gameover_state = GameOver.Singletone(this.game);
        this.game.state.add("gameover", this.gameover_state);

        this.win_state = Win.Singletone(this.game);
        this.game.state.add("win", this.win_state);

        this.game.state.start("newgame");
    }
    static Singletone(){
        if (State.hasOwnProperty("_singletone")) {
            return State._singletone;
        } else {
            this._singletone = new State();
            return this._singletone;
        }
    }

    reset(){
      this.gameplay.reset();
    }

}


var state = State.Singletone();

window.addEventListener("load", function(){

});
