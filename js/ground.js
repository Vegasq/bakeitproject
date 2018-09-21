class Ground {
    constructor(ctx){
        this.ctx = ctx;
    }
    load(){
        this.ctx.game.load.image('ground', 'ui/invgrnd.png');
    }
    create(){
        this.group = this.ctx.game.add.group();
        this.group.enableBody = true;

        this.bk_grnds = [];
        var x = 0;
        var ground;

        ground = this.group.create(0, this.ctx.game.world.height - 240, 'ground');
        ground.body.immovable = true;
        this.bk_grnds.push(ground)

    }
    update(){
        // for (var i = this.bk_grnds.length - 1; i >= 0; i--) {
        //     this.bk_grnds[i].position.x -= 3;
        //     if (this.bk_grnds[i].position.x <= -2000) {
        //         this.bk_grnds[i].position.x = this.bk_grnds[i].position.x + 2000*2;
        //     }
        // }
    }
}
