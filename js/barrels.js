class Barrels {
    constructor(ctx){
        this.ctx = ctx;
    }
    load(){
        this.ctx.game.load.image('barrel', 'brl.png');
    }
    create(){
        this.group = this.ctx.game.add.group();
        this.group.enableBody = true;

        this.platforms = [];
        var x = 0;
        var ledge;

        // for (var i = 1; i != 5; i++) {
        //     ledge = this.group.create(300 * i, this.ctx.game.world.height - 130, 'barrel');
        //     ledge.body.immovable = true;
        //     ledge.scale.setTo(0.03, 0.03);
        //     this.platforms.push(ledge)
        // }

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
