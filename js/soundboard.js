class SoundBoard{
    constructor(ctx){
        this.ctx = ctx;
    }

    load(){
      this.ctx.game.load.audio(
          'jump',
          ['sound/jump/344500__jeremysykes__jump05.wav']);
      this.jump_timer = 0;

      this.ctx.game.load.audio(
          'bg',
          ['sound/bg/399821__raimonddd__awesome-background-melody-music.mp3']);

      this.ctx.game.load.audio(
          'ouch',
          ['sound/ouch/369003__flying-deer-fx__getting-hit-eeeh-01-mouth-fx-man-voice.wav']);
      this.ouch_timer = 0;
    }

    playJump(){
        var timer = new Date();
        var cur = timer.getTime();
        if (this.jump_timer == 0) {
            this.jump_timer = cur;
        } else if (cur - this.jump_timer <= 200) {
            return;
        }
        this.jump_timer = cur;

        var music = this.ctx.game.add.audio('jump');
        music.play();
    }
    playBg(){
      if (this.hasOwnProperty("bg")) {
          //
      } else {
          this.bg = this.ctx.game.add.audio('bg');
      }
      this.bg.stop();
      this.bg.loop = true;
      this.bg.play();
    }
    stopBg(){
        this.bg.stop();
    }
    playOuch(){
        var timer = new Date();
        var cur = timer.getTime();
        if (this.ouch_timer == 0) {
            this.ouch_timer = cur;
        } else if (cur - this.ouch_timer <= 300) {
            return;
        }
        this.ouch_timer = cur;

        var music = this.ctx.game.add.audio('ouch');
        music.play();
    }
}
