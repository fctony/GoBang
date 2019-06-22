const GAME_STATE = cc.Enum({
    WRONG:0,
    CIRCLE:1,
    DRAW:2,
    OVER:3
});


var level = function(lvNum,isOpen,lv,grid,link,win){
    this.lvNum = lvNum;
    this.isOpen = isOpen;
    this.lv = lv;
    this.grid = grid;
    this.link = link;
    this.win = win
};

var levelMap ={
    0:new level(0,true,"简单",3,3,0),
    1:new level(1,false,"简单",5,4,0),
    2:new level(2,false,"简单",6,4,0),
    3:new level(3,false,"简单",7,4,0),
    4:new level(4,false,"简单",8,5,0),
    5:new level(5,false,"简单",9,5,0),
    6:new level(6,false,"一般",3,3,0),
    7:new level(7,false,"一般",5,4,0),
    8:new level(8,false,"一般",6,4,0),
    9:new level(9,false,"一般",7,4,0),
    10:new level(10,false,"一般",8,5,0),
    11:new level(11,false,"一般",9,5,0),
    12:new level(12,false,"困难",3,3,0),
    13:new level(13,false,"困难",5,4,0),
    14:new level(14,false,"困难",6,4,0),
    15:new level(15,false,"困难",7,4,0),
    16:new level(16,false,"困难",8,5,0),
    17:new level(17,false,"困难",9,5,0),
    18:new level(18,false,"困难",10,5,0),
    19:new level(19,false,"困难",11,5,0),
};





module.exports={
    GAME_STATE:GAME_STATE,
    levelMap:levelMap,
    changeNum:0
}