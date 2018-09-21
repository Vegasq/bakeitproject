class Platforms {
    constructor(ctx){
        this.ctx = ctx;

        this.active_platforms = [];
        this.inactive_platforms = [];

        // Pixels to screen for obsticle, when we need to spawn new one.
        // Increes to make harder.
        this.px_to_spawn = 0;
    }
    load(){
      console.log("plat load");
      this.ctx.game.load.image('trashcan', 'ui/obstacles/trashcan-201x252px.png');
      this.ctx.game.load.image('trashcan_smoke', 'ui/obstacles/trashcan-smoke-102x156px.png');
      this.ctx.game.load.image('armadillo', 'ui/obstacles/armadillo-170x124px.png');
      this.ctx.game.load.image('banana', 'ui/obstacles/banana-trash-128x170px.png');

      this.ctx.game.load.image('pit', 'ui/obstacles/vegan-pit-380x102px.png');
      this.ctx.game.load.image('sign', 'ui/obstacles/vegan-pit-sign-278x188px.png');
    }
    create(){
        console.log("plat create");
        this.group = this.ctx.game.add.group();
        this.group.enableBody = true;

        this.armadillo_group = this.ctx.game.add.group();
        this.armadillo_group.enableBody = true;
        this.armadillo = this.armadillo_group.create(
          this.ctx.game.world.width,
          this.ctx.game.world.height - 350,
          'armadillo');
        this.armadillo._children = [];
        this.armadillo.body.immovable = true;

        this.inactive_platforms.push(this.armadillo);

        // Single trashcan to jump over
        this.pit_group = this.ctx.game.add.group();
        this.pit_group.enableBody = true;
        this.pit = this.pit_group.create(
          this.ctx.game.world.width,
          this.ctx.game.world.height - 320,
          'pit');

        this.pit._children = [];
        this.pit._children.push(
          this.ctx.game.add.sprite(
            this.ctx.game.world.width,
            this.ctx.game.world.height - 500,
            'sign'
          )
        );

        this.pit.body.immovable = true;
        this.inactive_platforms.push(this.pit);

        // Single trashcan to jump over
        this.trashcans_group = this.ctx.game.add.group();
        this.trashcans_group.enableBody = true;
        this.trash_can = this.trashcans_group.create(
          this.ctx.game.world.width,
          this.ctx.game.world.height - 470,
          'trashcan');

        this.trash_can._children = [];
        this.trash_can._children.push(
          this.ctx.game.add.sprite(
            this.ctx.game.world.width,
            this.ctx.game.world.height - 600,
            'trashcan_smoke'
          )
        );
        this.trash_can._children.push(
          this.ctx.game.add.sprite(
            this.ctx.game.world.width,
            this.ctx.game.world.height - 260,
            'banana'
          )
        );

        this.trash_can.body.immovable = true;
        this.inactive_platforms.push(this.trash_can);
    }
    update(){

      // this.ctx.game.world.bringToTop(this.active_platforms);
      for (var i = this.active_platforms.length - 1; i >= 0; i--) {
          this.active_platforms[i].position.x -= SETTINGS.speed;

          for (var z = 0; z < this.active_platforms[i]._children.length; z++) {
            this.active_platforms[i]._children[z].x -= SETTINGS.speed;
          }


          // Remove platform
          if (this.active_platforms[i].position.x <= this.active_platforms[i].texture.frame.width * -1) {
            this.active_platforms[i].position.x = this.ctx.game.world.width;

            for (var z = 0; z < this.active_platforms[i]._children.length; z++) {
              this.active_platforms[i]._children[z].x = this.ctx.game.world.width;
            }

            this.active_platforms.splice(i, 1);
            this.ctx.player.score += 1;
            SETTINGS.speed_up();
          }
      }

      if (this.active_platforms.length == 0) {
          var plt = this.inactive_platforms[Math.floor(Math.random()*this.inactive_platforms.length)];
          this.active_platforms.push(plt);
      } else if (this.active_platforms.length == 1) {
          if(this.active_platforms[0].x < this.ctx.game.world.width/3) {
              var plt = this.inactive_platforms[Math.floor(Math.random()*this.inactive_platforms.length)];
              if (plt != this.active_platforms[0]){
                  this.active_platforms.push(plt);
              }
          }
      }

    }
    reset(){
      this.active_platforms = [];
      this.inactive_platforms = [];
    }
}
