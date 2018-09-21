
function create_score(ctx){
  ctx.player.score_text = ctx.game.add.text();
}
function update_score(ctx){
  var style = {
    font: "65px Arial",
    fill: "#ffffff",
    align: "center" };
    ctx.player.score_text.text = "Score: " + ctx.player.score;
    ctx.player.score_text.x = ctx.game.world.width - 300;
    ctx.player.score_text.y = 50;

}



function create_health(ctx){
  ctx.player.health_text = ctx.game.add.text();
}
function update_health(ctx){
  var style = {
    font: "65px Arial",
    fill: "#ffffff",
    align: "center" };
    ctx.player.health_text.text = "Health: " + ctx.player.health + "";
    ctx.player.health_text.x = 100;
    ctx.player.health_text.y = 50;

}

class Player {
    constructor(ctx){
        this.ctx = ctx;

        this.rotation = 0;
        this.health = 50;
        this.score = 0;

        this.jump_level = 0;
        this.max_jump_level = 2;

        this.jump_time = 0;
    }

    reset(){
      this.health = 50;
      this.score = 0;
      this.jump_level = 0;
      this.rotation = 0;
    }

    jump(){
        if (this.jump_level >= this.max_jump_level) {
            console.log("Already double jump.")
            return;
        }
        var timer = new Date();

        var jump_power = 0;

        if (this.jump_level == 0){
            this.jump_time = timer.getTime();
            jump_power = -800;
        } else if (this.jump_level == 1) {
            var cur_time = timer.getTime();
            if (cur_time - this.jump_time < 500) {
                return;
            }
            jump_power = -400;
            this.rotation = 1;
        } else {
            return;
        }

        this.ctx.soundboard.playJump();
        this.jump_level += 1;
        this.player.body.velocity.y = jump_power;
    }
    reset_jump(){
        this.jump_level = 0;
        this.jump_time = 0;
    }

    create(){
      create_health(this.ctx);
      create_score(this.ctx);

      this.player = this.ctx.game.add.sprite(250, this.ctx.game.world.height - 700, 'player', 5);
      this.player.animations.add('run');
      this.player.animations.play('run', 30, true);

      console.log(this.player);

      // this.player = this.ctx.game.add.sprite(250, this.ctx.game.world.height - 700, 'player');
      // this.player.animations.add('run');
      // this.player.animations.play('run', 10, true);
      // this.player = this.ctx.game.add.sprite(64, this.ctx.game.world.height - 150, 'dude');
        // this.player_head = this.ctx.game.add.sprite(32, this.ctx.game.world.height - 150, 'alona')

        this.ctx.game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0.5);

        // this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        // this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    load(){
        this.ctx.game.load.spritesheet('dude', 'ui/character/character-263x382px.png', 263, 382);
        this.ctx.game.load.atlas('player', 'ui/animation/player.png', 'ui/animation/player.json');
    }

    update(){
      update_health(this.ctx);
      update_score(this.ctx);

        var hitGround = this.ctx.game.physics.arcade.collide(this.player, this.ctx.ground.bk_grnds);
        var hitPlatforms = this.ctx.game.physics.arcade.collide(this.player, this.ctx.platforms.cars_group);

        var hitTrashcan = this.ctx.game.physics.arcade.collide(this.player, this.ctx.platforms.trashcans_group);
        var hitArmadillo = this.ctx.game.physics.arcade.collide(this.player, this.ctx.platforms.armadillo_group);
        var hitPit = this.ctx.game.physics.arcade.collide(this.player, this.ctx.platforms.pit_group);

        // var hit_barrels = this.ctx.game.physics.arcade.collide(this.player, this.ctx.barrels.group);

        if (hitTrashcan || hitArmadillo || hitPit) {
          this.ctx.soundboard.playOuch();
          this.health = this.health - 1;
          this.player.body.velocity.y = -600;
          if (this.rotation == 0){
            this.rotation = 1;
          }
        }
        if (this.rotation >= 360) {
          this.rotation = 0;
        }
        if (this.rotation != 0){
          this.player.body.rotation = this.rotation;
          this.rotation += 5;
        }

        this.player.body.velocity.x = 0;

        // this.player.animations.play('right');

        var cursors = this.ctx.game.input.keyboard.createCursorKeys();
        var spaceKey = this.ctx.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        if (this.ctx.game.input.pointer1.isDown || spaceKey.isDown){
            this.jump();
        }

        if (this.player.body.touching.down && hitGround || this.player.body.touching.down && hitGround) {
            this.reset_jump();
        }

        // if (spaceKey.isDown && this.player.body.touching.down && hitGround)
        // {
        //     this.player.body.velocity.y = -350;
        // }
        // if (spaceKey.isDown && this.player.body.touching.down && hitPlatforms)
        // {
        //     this.player.body.velocity.y = -350;
        // }

        // this.player_head.position.x = this.player.position.x - 30
        // this.player_head.position.y = this.player.position.y - 87

    }
}
