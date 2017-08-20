export class Background {
	constructor(ctx){
		this.ctx = ctx;

		this.bg_panels = [];
	}
	load(){
		this.ctx.game.load.image('background', 'background2.png');
	}
	create(){
		var x = 0;
		for (var i = 0; i != 6; i++) {
			x = i * 160
			this.bg_panels.push(this.ctx.game.add.sprite(x, 0, 'background'));
		}
	}
	update(){
		for (var i = this.bg_panels.length - 1; i >= 0; i--) {
			this.bg_panels[i].position.x -= 3;
			if (this.bg_panels[i].position.x <= -160) {
				this.bg_panels[i].position.x = 800;
			}
		}
	}
}