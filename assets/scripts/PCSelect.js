var storage = require('Storage');
cc.exports = cc.exports || {}
var GobangType = cc.Enum(
{
    P2P:0, //闯关
    P2C:1, //人机
    C2C:2, //对战
    GAME:3
});
    

cc.Class({
    extends: cc.Component,

    properties: {
        chooseButtonImg:[cc.SpriteFrame],
        link:cc.Node,
        level:cc.Node,
        startBtn:cc.Node,
        gridPanel:cc.Node,
        linkPanel:cc.Node,
        levelPanel:cc.Node,
        gridType:cc.Label,
        linkType:cc.Label,
        lvType:cc.Label,
        gridBtn:cc.Node,
        linkBtn:cc.Node,
        levelBtn:cc.Node,
        pcScroll:cc.ScrollView,
    },

    onLoad(){
        this.backKeyListener();
        var grid = storage.getData('grid');
        var link = storage.getData('link');
        var lv = storage.getData('lv');
        if(!grid && !lv && !link){
            storage.setData('grid',3);
            storage.setData('link',3);
            storage.setData('lv','简单');
        }
        var grid = storage.getData('grid');
        var link = storage.getData('link');
        var lv = storage.getData('lv');
        this.gridType.string = grid.toString() +' x '+ grid.toString();
        this.linkType.string = link.toString();
        this.lvType.string = lv;
        if(grid == 3){
            this.linkPanel.children[0].getChildByName('New Label').color = new cc.Color(0,0,0,255);
            this.linkPanel.children[0].getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[0];
            this.linkPanel.children[1].opacity = 76.5;
            this.linkPanel.children[2].opacity = 76.5;
            this.linkPanel.children[1].getComponent(cc.Button).interactable = false;
            this.linkPanel.children[2].getComponent(cc.Button).interactable = false;
        }
        else if(grid >3 && grid <=7){
            this.linkPanel.children[1].opacity = 255;
            this.linkPanel.children[1].getComponent(cc.Button).interactable = true;
            this.linkPanel.children[2].opacity = 76.5;
            this.linkPanel.children[2].getComponent(cc.Button).interactable = false;
        }
        else if(grid > 7){
            this.linkPanel.children[1].opacity = 255;
            this.linkPanel.children[1].getComponent(cc.Button).interactable = true;
            this.linkPanel.children[2].getComponent(cc.Button).interactable = true;
            this.linkPanel.children[2].opacity = 255;
        }
        if(link == 5){
            this.gridPanel.children[0].opacity = 76.5;
            this.gridPanel.children[1].opacity = 76.5;
            this.gridPanel.children[2].opacity = 76.5;
            this.gridPanel.children[3].opacity = 76.5;
            this.gridPanel.children[4].opacity = 76.5;
            this.gridPanel.children[0].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[1].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[2].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[3].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[4].getComponent(cc.Button).interactable = false;
        }
        else if(link == 4){
            this.gridPanel.children[0].opacity = 76.5;
            this.gridPanel.children[1].opacity = 255;
            this.gridPanel.children[2].opacity = 255;
            this.gridPanel.children[3].opacity = 255;
            this.gridPanel.children[4].opacity = 255;
            this.gridPanel.children[0].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[1].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[2].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[3].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[4].getComponent(cc.Button).interactable = true;
        }
        else if(link == 3){
            this.gridPanel.children[0].opacity = 255;
            this.gridPanel.children[1].opacity = 255;
            this.gridPanel.children[2].opacity = 255;
            this.gridPanel.children[3].opacity = 255;
            this.gridPanel.children[4].opacity = 255;
            this.gridPanel.children[0].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[1].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[2].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[3].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[4].getComponent(cc.Button).interactable = true;
        }
    },

    update:function(){
        if(this.startBtn.y <= -950){
            this.pcScroll.vertical = true;
        }else if(this.startBtn.y >= -950){
            this.pcScroll.vertical = false;
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
            }else{
               //处理返回键的其他逻辑
            }
    },


    //人机跳转到设置
    PCToSet:function(){
        cc.exports.curType = GobangType.P2C;
        cc.director.loadScene('setting');
    },
    
    //关闭人机页面
    closePC:function(){
        cc.director.loadScene('menu');
    },

    //展开人机网格选择页
    openGridPage:function(){
        if(this.gridBtn.rotation == 0){
            var rotate = cc.rotateTo(0.5,-180);
            this.gridBtn.runAction(rotate);
            this.gridPanel.active = true;
            this.link.y -= 700;
            this.level.y -= 700;
            this.startBtn.y -= 700;
        }

    },

    //关闭人机网格
    closeGridPage:function(){
        if(this.gridBtn.rotation == -180){
            var rotate = cc.rotateTo(0.5,0);
            this.gridBtn.runAction(rotate);
            this.gridPanel.active = false;
            this.link.y += 700;
            this.level.y += 700;
            this.startBtn.y += 700;
        }
    },


    //展开人机连子数选择页
    openLinkPage:function(){
        if(this.linkBtn.rotation == 0){
            var rotate = cc.rotateTo(0.5,-180);
            this.linkBtn.runAction(rotate);
            this.linkPanel.active = true;
            this.level.y -= 240;
            this.startBtn.y -= 240;
        }

    },

    closeLinkPage:function(){
        if(this.linkBtn.rotation == -180){
            var rotate = cc.rotateTo(0.5,0);
            this.linkBtn.runAction(rotate);
            this.linkPanel.active = false;
            this.level.y += 240;
            this.startBtn.y += 240;
        }
    },

    //展开人机等级难度选择页
    openLevelPage:function(){
        if(this.levelBtn.rotation == 0){
            var rotate = cc.rotateTo(0.5,-180);
            this.levelBtn.runAction(rotate);
            this.levelPanel.active = true;
            this.startBtn.y -= 120;
        }
    },


    closeLevelPage:function(){
        if(this.levelBtn.rotation == -180){
            var rotate = cc.rotateTo(0.5,0);
            this.levelBtn.runAction(rotate);
            this.levelPanel.active = false;
            this.startBtn.y += 120;
        }
    },



    //选择人机网格类型
    chooseGrid:function(evt,number){
        for(var i = 0; i<this.gridPanel.children.length;i++){
            this.gridPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[0];
            this.gridPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
        }
        this.gridType.string = number +' x '+ number;
        var num = parseInt(number);
        storage.setData("grid",num);
        evt.currentTarget.getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[1];
        evt.currentTarget.getChildByName('New Label').color =new cc.Color(255,255,255,255);
        if(this.gridBtn.rotation == -180){
            var rotate = cc.rotateTo(0.5,0);
            this.gridBtn.runAction(rotate);
            this.gridPanel.active = false;
            this.link.y += 700;
            this.level.y += 700;
            this.startBtn.y += 700;
        }
        var grid = storage.getData("grid");
        for(var i = 0; i<this.linkPanel.children.length;i++){
            this.linkPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[0];
            this.linkPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
        }
        if(grid == 3){
            this.linkPanel.children[0].getChildByName('New Label').color = new cc.Color(0,0,0,255);
            this.linkPanel.children[0].getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[0];
            this.linkPanel.children[1].opacity = 76.5;
            this.linkPanel.children[2].opacity = 76.5;
            this.linkPanel.children[1].getComponent(cc.Button).interactable = false;
            this.linkPanel.children[2].getComponent(cc.Button).interactable = false;
        }
        else if(grid >3 && grid <=7){
            this.linkPanel.children[1].opacity = 255;
            this.linkPanel.children[1].getComponent(cc.Button).interactable = true;
            this.linkPanel.children[2].opacity = 76.5;
            this.linkPanel.children[2].getComponent(cc.Button).interactable = false;
        }
        else if(grid > 7){
            this.linkPanel.children[1].opacity = 255;
            this.linkPanel.children[1].getComponent(cc.Button).interactable = true;
            this.linkPanel.children[2].getComponent(cc.Button).interactable = true;
            this.linkPanel.children[2].opacity = 255;
        }
    },

    //选择人机连子数
    chooseLinkNum:function(evt,linkNum){
        this.linkType.string = linkNum;
        var link = parseInt(linkNum);
        storage.setData("link",link);
        if(this.linkBtn.rotation == -180){
            var rotate = cc.rotateTo(0.5,0);
            this.linkBtn.runAction(rotate);
            this.linkPanel.active = false;
            this.level.y += 240;
            this.startBtn.y += 240;
        }
        for(var i = 0; i<this.linkPanel.children.length;i++){
            this.linkPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[0];
            this.linkPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
        }
        evt.currentTarget.getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[1];
        evt.currentTarget.getChildByName('New Label').color =new cc.Color(255,255,255,255);
        if(link == 5){
            this.gridPanel.children[0].opacity = 76.5;
            this.gridPanel.children[1].opacity = 76.5;
            this.gridPanel.children[2].opacity = 76.5;
            this.gridPanel.children[3].opacity = 76.5;
            this.gridPanel.children[4].opacity = 76.5;
            this.gridPanel.children[0].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[1].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[2].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[3].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[4].getComponent(cc.Button).interactable = false;
        }
        else if(link == 4){
            this.gridPanel.children[0].opacity = 76.5;
            this.gridPanel.children[1].opacity = 255;
            this.gridPanel.children[2].opacity = 255;
            this.gridPanel.children[3].opacity = 255;
            this.gridPanel.children[4].opacity = 255;
            this.gridPanel.children[0].getComponent(cc.Button).interactable = false;
            this.gridPanel.children[1].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[2].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[3].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[4].getComponent(cc.Button).interactable = true;
        }
        else if(link == 3){
            this.gridPanel.children[0].opacity = 255;
            this.gridPanel.children[1].opacity = 255;
            this.gridPanel.children[2].opacity = 255;
            this.gridPanel.children[3].opacity = 255;
            this.gridPanel.children[4].opacity = 255;
            this.gridPanel.children[0].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[1].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[2].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[3].getComponent(cc.Button).interactable = true;
            this.gridPanel.children[4].getComponent(cc.Button).interactable = true;
        }
    },
    //选择人机等级难度
    chooseLevel:function(evt,lvName){
        for(var i = 0; i<this.levelPanel.children.length;i++){
            this.levelPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[0];
            this.levelPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
        }
        this.lvType.string = lvName;
        storage.setData("lv",lvName);
        evt.currentTarget.getComponent(cc.Sprite).spriteFrame = this.chooseButtonImg[1];
        evt.currentTarget.getChildByName('New Label').color =new cc.Color(255,255,255,255);
        if(this.levelBtn.rotation == -180){
            var rotate = cc.rotateTo(0.5,0);
            this.levelBtn.runAction(rotate);
            this.levelPanel.active = false;
            this.startBtn.y += 120;
        }
    },


    
    //开始人机游戏
    startP2CGame:function(){
        cc.exports.curType = GobangType.P2C;
        cc.director.loadScene('game');
    },



});

cc.exports.NextGobangType = GobangType;
