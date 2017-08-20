export class Platforms {
	constructor(ctx){
		this.ctx = ctx;
	}
	load(){
		this.ctx.game.load.image('platform', 'ground.jpg');
	}
	create(){
		this.group = this.ctx.game.add.group();
		this.group.enableBody = true;

		this.platforms = [];
		var x = 0;
		var ledge;

		for (var i = 1; i != 2; i++) {
			ledge = this.group.create(400 * i, this.ctx.game.world.height - 128, 'platform');
			ledge.body.immovable = true;
			this.platforms.push(ledge)
		}

	}
	update(){
		for (var i = this.platforms.length - 1; i >= 0; i--) {
			this.platforms[i].position.x -= 2;
			if (this.platforms[i].position.x <= -256) {
				this.platforms[i].position.x = 800;
			}
		}
	}
}
