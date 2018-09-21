// import { Background } from './background.js';
// import { Ground } from './ground.js';
// import { Platforms } from './platforms.js';
// import { Barrels } from './barrels.js';
// import { Player } from './player.js';


class Gameplay {

    static Singletone(game){
        if (Gameplay.hasOwnProperty("_singletone")) {
            return Gameplay._singletone;
        } else {
            this._singletone = new Gameplay(game);
            return this._singletone;
        }
    }

    constructor(game){
        this.GAME = 1;
        this.WINSTART = 2;
        this.WINEND = 3;
        this.GAMEENDCOUNTDOWN = 200;

        this.game_state = this.GAME;

        this.load_me = [];
        this.create_me = [];
        this.update_me = [];

        this.player = new Player(this);
        this.background = new Background(this);
        this.ground = new Ground(this);
        this.platforms = new Platforms(this);
        // this.barrels = new Barrels(this);

        this.foreground = new Foreground(this);

        this.soundboard = new SoundBoard(this);

        // this.load_me.push(this.barrels);
        this.load_me.push(this.player);
        this.load_me.push(this.background);
        this.load_me.push(this.ground);
        this.load_me.push(this.platforms);
        this.load_me.push(this.foreground);
        this.load_me.push(this.soundboard);

        // First at top, last - under
        this.create_me.push(this.foreground);
        this.create_me.push(this.player);
        this.create_me.push(this.platforms);
        this.create_me.push(this.ground);
        // this.create_me.push(this.barrels);
        this.create_me.push(this.background);

        this.update_me.push(this.background);
        this.update_me.push(this.ground);
        this.update_me.push(this.player);
        this.update_me.push(this.platforms);
        // this.update_me.push(this.barrels);
        this.update_me.push(this.foreground);

        this.game = game;
    }

    preload(){
        var that = Gameplay.Singletone();

        for (var i = that.load_me.length - 1; i >= 0; i--) {
            that.load_me[i].load()
        }
    }
    create(){
        var that = Gameplay.Singletone();
        this.soundboard.playBg();

        this.game.scale.setMinMax(800, 600, 1920, 1080);

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


        that.game.physics.startSystem(Phaser.Physics.ARCADE);
        // that.game.physics.arcade.gravity.y = 2;

        for (var i = that.create_me.length - 1; i >= 0; i--) {
            that.create_me[i].create()
        }
    }
    update_win_animation(){
        var that = Gameplay.Singletone();
        if (that.game_state == that.WINSTART) {
            console.log("start");
            if (that.player.jump_level == 0){
                that.player.jump();
            }
            that.player.rotation = 1;
            that.player.update();
            that.game_state = that.WINEND;
            console.log(that.game_state);
        } else if (that.game_state == that.WINEND){
            console.log("end");
            that.GAMEENDCOUNTDOWN -= 1;
            if (that.player.jump_level == 0){
                that.player.jump();
            }

            that.player.player.x += 5;

            if (that.GAMEENDCOUNTDOWN == 0) {
              this.reset();
              this.game.state.start("win");
            }

            if (this.player.rotation == 0) {
                this.player.rotation = 1;
            }
            this.player.update();
        }
    }
    update(){
        var that = Gameplay.Singletone();

        if (that.game_state == that.GAME){
            for (var i = that.update_me.length - 1; i >= 0; i--) {
                that.update_me[i].update();
            }
        } else {
            that.update_win_animation();
        }

        if (this.player.health <= 0) {
            this.reset();
            this.game.state.start("gameover");
        }
        if (this.player.score >= SETTINGS.score_to_win && this.game_state == this.GAME) {
            // Start win animation
            this.game_state = this.WINSTART;
        }
    }
    render(){
        var that = Gameplay.Singletone();
    }
    reset(){
        this.platforms.reset();
        this.player.reset();
        this.GAMEENDCOUNTDOWN = 300;
        this.game_state = this.GAME;
        SETTINGS.speed_reset();
    }
}
