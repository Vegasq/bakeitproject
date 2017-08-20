export class Ground {
	constructor(ctx){
		this.ctx = ctx;
	}
	load(){
		this.ctx.game.load.image('ground', 'ground.jpg');
	}
	create(){
		this.group = this.ctx.game.add.group();
		this.group.enableBody = true;

		this.bk_grnds = [];
		var x = 0;
		var ground;

		for (var i = 0; i != 5; i++) {
			x = i * 256
			ground = this.group.create(x, this.ctx.game.world.height - 64, 'ground');
			ground.body.immovable = true;
			this.bk_grnds.push(ground)
		}
	}
	update(){
		for (var i = this.bk_grnds.length - 1; i >= 0; i--) {
			this.bk_grnds[i].position.x -= 2;
			if (this.bk_grnds[i].position.x <= -256) {
				this.bk_grnds[i].position.x = 800;
			}
		}
	}
}
