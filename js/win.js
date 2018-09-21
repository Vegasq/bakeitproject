class Win {

    static Singletone(game){
        if (Win.hasOwnProperty("_singletone")) {
            return Win._singletone;
        } else {
            this._singletone = new Win(game);
            return this._singletone;
        }
    }


        constructor(game){
            this.game = game;

            this.armacounter = 0;
            this.bananas = [];
        }

        preload(){
            var that = Win.Singletone();
            that.game.load.image('alona', 'alona.png');

            that.game.load.image('background', 'ui/background/bg-seamless-3840x1080px.jpg');
            that.game.load.image('clouds', 'ui/background/bg-seamless-sky-3840x264px.png');
            that.game.load.image('house1', 'ui/houses/house-01-743x531px.png');
            that.game.load.image('house2', 'ui/houses/house-02-743x531px.png');
            that.game.load.image('house3', 'ui/houses/house-03-743x531px.png');
            that.game.load.image('armadillo', 'ui/obstacles/armadillo-170x124px.png');
            that.game.load.image('banana', 'ui/obstacles/banana-trash-128x170px.png');
            that.game.load.image('cactus', 'ui/foreground/cactus-blurred-580x632px.png');
            that.game.load.image('sign', 'ui/obstacles/vegan-pit-sign-278x188px.png');
            that.game.load.image('trashcan', 'ui/obstacles/trashcan-201x252px.png');

            that.game.load.image('start', 'ui/start_button.png');
        }
        create(){
            var that = Win.Singletone();

            that.game.scale.setMinMax(800, 600, 1920, 1080);

            that.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            that.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            that.game.scale.refresh();
            // that.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            that.game.add.sprite(0, 0, 'background');
            that.game.add.sprite(
              that.game.world.centerX - 743/2,
              that.game.world.centerY - 350,
              'house1');
            that.game.add.sprite(0, 20, 'clouds');

            that.game.add.sprite(
              that.game.world.centerX - 743/2*3,
              that.game.world.centerY - 350,
              'house2');

            that.game.add.sprite(
              that.game.world.centerX + 743/2,
              that.game.world.centerY - 350,
              'house3');

            that.button = that.game.add.button(
                that.game.world.centerX - 315/2,
                that.game.world.centerY - 149/2,
                'start',
                that.btnclicked, this, 2, 1, 0);

            that.game.add.sprite(
              that.game.world.width - 200,
              that.game.world.centerY, 'armadillo');

            that.game.add.sprite(200, 200, 'banana');
            that.game.add.sprite(250, that.game.world.height - 120, 'banana');
            that.game.add.sprite(800, that.game.world.height - 300, 'banana');

            that.game.add.sprite(1700, that.game.world.height - 300, 'trashcan');

            that.game.add.sprite(
              350,
              that.game.world.height - 520,
              'sign');


          var cactus;
          cactus = that.game.add.sprite(50, that.game.world.height - 520, 'cactus');
          cactus.scale.setTo(0.3, 0.3);
          cactus = that.game.add.sprite(650, that.game.world.height - 520, 'cactus');
          cactus.scale.setTo(0.3, 0.3);
          cactus = that.game.add.sprite(1200, that.game.world.height - 520, 'cactus');
          cactus.scale.setTo(0.3, 0.3);
          cactus = that.game.add.sprite(1500, that.game.world.height - 520, 'cactus');
          cactus.scale.setTo(0.3, 0.3);


          var style = {
            font: "120px Arial",
            fill: "red",
            align: "center" };
          this.game_over_text = that.game.add.group();
          var text1 = that.game.add.text(that.game.world.width/2-130, 350, "YOU", style, this.game_over_text);
          var text2 = that.game.add.text(that.game.world.width/2-130, 600, "WIN", style, this.game_over_text);
        }
        update(){
          var that = Win.Singletone();

          if (that.bananas.length < 100) {
            var arma;
            arma = that.game.add.sprite(
              that.game.world.width * Math.random(),
              that.game.world.height * Math.random(),
              'banana');
            that.bananas.push(arma);
          }
          for (var i = 0; i < that.bananas.length; i++) {
            that.bananas[i].rotation += 0.1;
          }

          that.game.world.bringToTop(that.button);
          that.game.world.bringToTop(that.game_over_text);


          var spaceKey = that.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          if (that.game.input.pointer1.isDown || spaceKey.isDown){
              this.btnclicked();
          }

        }
        render(){
            var that = Win.Singletone();
        }

        btnclicked(){
            var that = Win.Singletone();
            that.game.state.start("gameplay");
        }
}
