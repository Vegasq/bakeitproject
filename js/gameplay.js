import { Player } from './player.js';
import { Background } from './background.js';
import { Ground } from './ground.js';
import { Platforms } from './platforms.js';
import { Barrels } from './barrels.js';


export class Gameplay {

	static Singletone(game){
		if (Gameplay.hasOwnProperty("_singletone")) {
			return Gameplay._singletone;
		} else {
			this._singletone = new Gameplay(game);
			return this._singletone;
		}
	}

	constructor(game){
		this.load_me = [];
		this.create_me = [];
		this.update_me = [];

		this.player = new Player(this);
		this.background = new Background(this);
		this.ground = new Ground(this);
		this.platforms = new Platforms(this);
		this.barrels = new Barrels(this);

		this.load_me.push(this.barrels);
		this.load_me.push(this.player);
		this.load_me.push(this.background);
		this.load_me.push(this.ground);
		this.load_me.push(this.platforms);

		this.create_me.push(this.ground);
		this.create_me.push(this.player);
		this.create_me.push(this.barrels);
		this.create_me.push(this.platforms);
		this.create_me.push(this.background);

		this.update_me.push(this.background);
		this.update_me.push(this.ground);
		this.update_me.push(this.player);
		this.update_me.push(this.platforms);
		this.update_me.push(this.barrels);

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

		that.game.physics.startSystem(Phaser.Physics.ARCADE);

		for (var i = that.create_me.length - 1; i >= 0; i--) {
			that.create_me[i].create()
		}
	}
	update(){
		var that = Gameplay.Singletone();

		for (var i = that.update_me.length - 1; i >= 0; i--) {
			that.update_me[i].update()
		}

	}
	render(){
		var that = Gameplay.Singletone();
	}
}

