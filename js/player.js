export class Player {
	constructor(ctx){
		this.ctx = ctx;
	}

	create(){
	    this.player = this.ctx.game.add.sprite(64, this.ctx.game.world.height - 150, 'dude');
	    this.player_head = this.ctx.game.add.sprite(32, this.ctx.game.world.height - 150, 'alona')

	    this.ctx.game.physics.arcade.enable(this.player);

	    this.player.body.bounce.y = 0.2;
	    this.player.body.gravity.y = 300;
	    this.player.body.collideWorldBounds = true;

	    // this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	}

	load(){
	    this.ctx.game.load.spritesheet('dude', 'dude.png', 32, 48);
	    this.ctx.game.load.image('alona', 'alona.png');
	}

	update(){
		var hitGround = this.ctx.game.physics.arcade.collide(this.player, this.ctx.ground.bk_grnds);
		var hitPlatforms = this.ctx.game.physics.arcade.collide(this.player, this.ctx.platforms.platforms);

		var hit_barrels = this.ctx.game.physics.arcade.collide(this.player, this.ctx.barrels.group);

		console.log(hit_barrels);

		if(hit_barrels){
			console.log("gameover");

			this.ctx.game.state.start("gameover");
		}

		// var z = this.ctx.game.physics.arcade.distanceBetween(this.player, this.ctx.platforms.platforms);
		// if (z < 50) {
	 //        this.player.body.velocity.y = -300;
		// }

	    this.player.body.velocity.x = 0;

		var cursors = this.ctx.game.input.keyboard.createCursorKeys();

	    this.player.animations.play('right');

	    if (cursors.up.isDown && this.player.body.touching.down && hitGround)
	    {
	        this.player.body.velocity.y = -350;
	    }
	    if (cursors.up.isDown && this.player.body.touching.down && hitPlatforms)
	    {
	        this.player.body.velocity.y = -350;
	    }

	    this.player_head.position.x = this.player.position.x - 30
	    this.player_head.position.y = this.player.position.y - 87

	}
}
