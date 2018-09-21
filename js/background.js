
class HouseExt {
    activate(){
        this.active = true;
    }
    deactivate(){
        this.active = false;
    }
    move_left(speed){
        this.sprite.x -= speed;
    }
    set_x(x){
        this.sprite.x = x + this.x_offset;
    }
}

class CactusHouseExt extends HouseExt {
    constructor(){
        super();
        var state = State.Singletone();
        this.ctx = state.gameplay_state;
        this.active = false;

        this.x_offset = 10;
    }
    create(){
        this.sprite = this.ctx.game.add.sprite(-300, 550, 'cactus');
        this.sprite.scale.setTo(0.3, 0.3);
    }
}

class BananaHouseExt extends HouseExt {
    constructor(){
        super();
        var state = State.Singletone();
        this.ctx = state.gameplay_state;
        this.active = false;

        this.x_offset = 320;
    }
    create(){
        this.sprite = this.ctx.game.add.sprite(-300, 150, 'banana');
        this.sprite.scale.setTo(0.6, 0.6);
    }
}


class ArmadilloHouseExt extends HouseExt {
    constructor(){
        super();
        var state = State.Singletone();
        this.ctx = state.gameplay_state;
        this.active = false;

        this.x_offset = 350;
    }
    create(){
        this.sprite = this.ctx.game.add.sprite(-300, 550, 'armadillo');
        this.sprite.scale.setTo(0.6, 0.6);
    }
}


class Exts {
    static Singletone(game){
        if (Exts.hasOwnProperty("_singletone")) {
            return Exts._singletone;
        } else {
            this._singletone = new Exts(game);
            return this._singletone;
        }
    }
    constructor(){
        this.list = [new CactusHouseExt(), new BananaHouseExt(), new ArmadilloHouseExt()];
    }
    get_rand(){
        var ext = this.list[Math.floor(Math.random()*this.list.length)]
        console.log("can we select?", ext);
        if (ext.active == false) {
            console.log("set ext", ext);
            return ext;
        }
    }
}


class House {
    constructor(house_sprite){
        this.sprite = house_sprite;
        this.ext = false;
        this.setup_ext();
    }
    setup_ext(){
        if (this.ext) {
            this.ext.active = false;
        }

        var exts = Exts.Singletone();
        var ext = exts.get_rand();
        this.ext = ext;
        if (this.ext) {
            this.ext.active = true;
        }
    }
    set_x(x){
        this.sprite.x = x;
        if (this.ext) {
            this.ext.set_x(this.sprite.x);
        }
    }
    move_left(speed){
        this.sprite.x -= speed;
        if (this.ext) {
            this.ext.set_x(this.sprite.x);
        }
    }
}


class Background {
    constructor(ctx){
        this.ctx = ctx;

        this.bg_panels = [];
        this.clouds = [];
        this.houses = [];
        this.new_houses = [];
    }
    load(){
        console.log("bg load");
        this.ctx.game.load.image('background', 'ui/background/bg-seamless-3840x1080px.jpg');
        this.ctx.game.load.image('clouds', 'ui/background/bg-seamless-sky-3840x264px.png');
        this.ctx.game.load.image('house1', 'ui/houses/house-01-743x531px.png');
        this.ctx.game.load.image('house2', 'ui/houses/house-02-743x531px.png');
        this.ctx.game.load.image('house3', 'ui/houses/house-03-743x531px.png');
        this.ctx.game.load.image('house4', 'ui/houses/house-04-743x531px.png');
    }
    create(){
      console.log("bg create");
      var x = 0;
      for (var i = 0; i != 2; i++) {
          x = i * 3840;
          this.bg_panels.push(this.ctx.game.add.sprite(x, 0, 'background'));
      }
      var x = 0;
      for (var i = 0; i != 2; i++) {
          x = i * 3840
          this.clouds.push(this.ctx.game.add.sprite(x, 20, 'clouds'));
      }

        var h, s;
        s = this.ctx.game.add.sprite(0, 150, 'house1');
        h = new House(s);
        console.log(h, s);

        this.new_houses.push(h);
        this.new_houses.push(new House(this.ctx.game.add.sprite(785,  150, 'house2')));
        this.new_houses.push(new House(this.ctx.game.add.sprite(1570, 150, 'house3')));
        this.new_houses.push(new House(this.ctx.game.add.sprite(2355, 150, 'house4')));

        var exts = Exts.Singletone();
        for (var i = 0; i < exts.list.length; i++) {
            exts.list[i].create();
        }
    }
    update(){
      for (var i = this.bg_panels.length - 1; i >= 0; i--) {
          this.bg_panels[i].position.x -= SETTINGS.speed_bg;
          if (this.bg_panels[i].position.x <= -3840) {
              this.bg_panels[i].position.x = this.bg_panels[i].position.x + 3840*2;
          }
      }

      for (var i = this.clouds.length - 1; i >= 0; i--) {
          this.clouds[i].position.x -= SETTINGS.speed_bbg;
          if (this.clouds[i].position.x <= -3840) {
              this.clouds[i].position.x = this.clouds[i].position.x + 3840*2;
          }
      }

      for (var i = 0; i < this.new_houses.length; i++) {
          // Simply move house to left
          this.new_houses[i].move_left(SETTINGS.speed_bg);

          // If house is not on display anymore:
          if (this.new_houses[i].sprite.position.x <= this.new_houses[i].sprite.texture.frame.width * -1) {
              if (this.ctx.player.score == SETTINGS.score_to_win - 1) {
                  // Spawn office building
              } else {
                  this.new_houses[i].setup_ext();
                  this.new_houses[i].set_x(2355);
              }
          }
      }

    //   for (var i = this.houses.length - 1; i >= 0; i--) {
    //       this.houses[i].position.x -= SETTINGS.speed_bg;
    //       if (this.houses[i].position.x <= -785) {
    //           if (this.ctx.player.score == SETTINGS.score_to_win - 1) {
    //               // Spawn last house
    //           } else {
      //
    //               this.houses[i].position.x = 2355;
    //           }
    //       }
    //   }
    }

}
