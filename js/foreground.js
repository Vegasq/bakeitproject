class Foreground {
    constructor(ctx){
      console.log("foreground constructor")
        this.ctx = ctx;

        this.cactuses = [];
    }
    load(){
      console.log("foreground load")
      this.ctx.game.load.image('cactus', 'ui/foreground/cactus-blurred-580x632px.png');
    }
    create(){
      console.log("foreground create")
        this.cactuses.push(this.ctx.game.add.sprite(
          this.ctx.game.world.width
          , this.ctx.game.world.height-200, 'cactus'))
    }
    update(){
      for (var i = this.cactuses.length - 1; i >= 0; i--) {
          this.cactuses[i].position.x -= SETTINGS.speed_fg;
          if (this.cactuses[i].position.x <= -580) {
              this.cactuses[i].position.x = this.ctx.game.world.width;
          }
      }
    }
}
