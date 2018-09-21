var SETTINGS = {
  "speed_fg": 7,
  "speed": 5,
  "speed_bg": 5,
  "speed_bbg": 4,

  "score_to_win": 20,

  "speed_up": function(){
    SETTINGS.speed_fg += 0.3;
    SETTINGS.speed += 0.3;
    SETTINGS.speed_bg += 0.3;
    SETTINGS.speed_bbg += 0.3;
  },
  "speed_reset": function(){
    SETTINGS.speed_fg = 7;
    SETTINGS.speed = 5;
    SETTINGS.speed_bg = 5;
    SETTINGS.speed_bbg = 4;
  }
}
