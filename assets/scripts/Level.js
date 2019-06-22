var storage = require('Storage');
cc.exports = cc.exports || {}
var GobangType = cc.Enum(
{
    P2P:0, //闯关
    P2C:1, //人机
    C2C:2, //对战
    GAME:3
});

var  constans=require('Constans');
var levelMap = constans.levelMap;

cc.Class({
    extends: cc.Component,

    properties: {
        winTimes:[cc.Label],
        levelCount:[cc.Node],
    },


    onLoad:function(){
        this.setDefaultLvData();
        this.backKeyListener();
    },
    //关卡初始化
    setDefaultLvData:function(){
        var count = 0;
        for(var idx in levelMap){
            count ++;
        }
        for(var i =0;i<count;i++){
            this.winTimes[i].string = levelMap[i].win.toString() + ' wins';
            if(levelMap[i].isOpen == true){
                if(i <= 18){
                    if(levelMap[i].win >= 3){
                        this.levelCount[i+1].getChildByName('on').active = true;
                        this.levelCount[i+1].getChildByName('off').active = false;
                    }
                }
            }
        }
    },

    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
     
    backKeyListener() {
        if(cc.sys.platform == cc.sys.ANDROID){ 
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
    },
     
    onKeyUp(event){
        if (event.keyCode == cc.KEY.back) {
            cc.director.loadScene('menu');
            }
    },

    //传入开启关卡的参数
    inputLvData:function(lv){
        var lvInfo = levelMap[lv];
        var lvNum = lvInfo.lvNum;
        var grid = lvInfo.grid;
        var lv = lvInfo.lv;
        var link = lvInfo.link;
        var fail = 0;
        storage.setData('lvNum',lvNum);
        storage.setData('grid',grid);
        storage.setData('lv',lv);
        storage.setData('link',link);
        storage.setData('fail',fail);
    },

    //闯关跳转到设置
    lvToSet:function(){
        cc.director.loadScene('setting');
        cc.exports.curType = GobangType.P2P;
    },


    //关闭关卡
    retrunToMenu:function(){
        cc.director.loadScene('menu');
    },


    //开始闯关游戏
    startP2PGame:function(evt,lv){
        var lvNum = parseInt(lv);
        this.inputLvData(lvNum);
        cc.exports.curType = GobangType.P2P;
        cc.director.loadScene('game');
    },

});

cc.exports.NextGobangType = GobangType;
