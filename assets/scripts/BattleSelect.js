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
        batchoosebButtonImg:[cc.SpriteFrame],
        batlink:cc.Node,
        batstartBtn:cc.Node,
        batgridPanel:cc.Node,
        batlinkPanel:cc.Node,
        batgridType:cc.Label,
        batlinkType:cc.Label,
        batgridBtn:cc.Node,
        batlinkBtn:cc.Node,
        batScroll:cc.ScrollView,
    },
    
    onLoad(){
        this.backKeyListener();
        var batgrid = storage.getData('batgrid');
        var batlink = storage.getData('batlink');
        if(!batgrid && !batlink){
            storage.setData('batgrid',3);
            storage.setData('batlink',3);
        }
        var batgrid = storage.getData('batgrid');
        var batlink = storage.getData('batlink');
        this.batgridType.string = batgrid.toString() +' x '+ batgrid.toString();
        this.batlinkType.string = batlink.toString();
        if(batgrid == 3){
            this.batlinkPanel.children[0].getChildByName('New Label').color = new cc.Color(0,0,0,255);
            this.batlinkPanel.children[0].getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[0];
            this.batlinkPanel.children[1].opacity = 76.5;
            this.batlinkPanel.children[2].opacity = 76.5;
            this.batlinkPanel.children[1].getComponent(cc.Button).interactable = false;
            this.batlinkPanel.children[2].getComponent(cc.Button).interactable = false;
        }
        else if(batgrid >3 && batgrid <=7){
            this.batlinkPanel.children[1].opacity = 255;
            this.batlinkPanel.children[1].getComponent(cc.Button).interactable = true;
            this.batlinkPanel.children[2].opacity = 76.5
            this.batlinkPanel.children[2].getComponent(cc.Button).interactable = false;
        }
        else if(batgrid > 7){
            this.batlinkPanel.children[1].opacity = 255;
            this.batlinkPanel.children[1].getComponent(cc.Button).interactable = true;
            this.batlinkPanel.children[2].opacity = 255;
            this.batlinkPanel.children[2].getComponent(cc.Button).interactable = true;
        }
        if(batlink == 5){
            this.batgridPanel.children[0].opacity = 76.5;
            this.batgridPanel.children[1].opacity = 76.5;
            this.batgridPanel.children[2].opacity = 76.5;
            this.batgridPanel.children[3].opacity = 76.5;
            this.batgridPanel.children[4].opacity = 76.5;
            this.batgridPanel.children[0].getComponent(cc.Button).interactable = false;
            this.batgridPanel.children[1].getComponent(cc.Button).interactable = false;
            this.batgridPanel.children[2].getComponent(cc.Button).interactable = false;
            this.batgridPanel.children[3].getComponent(cc.Button).interactable = false;
            this.batgridPanel.children[4].getComponent(cc.Button).interactable = false;
        }
        else if(batlink == 4){
            this.batgridPanel.children[0].opacity = 76.5;
            this.batgridPanel.children[1].opacity = 255;
            this.batgridPanel.children[2].opacity = 255;
            this.batgridPanel.children[3].opacity = 255;
            this.batgridPanel.children[4].opacity = 255;
            this.batgridPanel.children[0].getComponent(cc.Button).interactable = false;
            this.batgridPanel.children[1].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[2].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[3].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[4].getComponent(cc.Button).interactable = true;
        }
        else if(batlink == 3){
            this.batgridPanel.children[0].opacity = 255;
            this.batgridPanel.children[1].opacity = 255;
            this.batgridPanel.children[2].opacity = 255;
            this.batgridPanel.children[3].opacity = 255;
            this.batgridPanel.children[4].opacity = 255;
            this.batgridPanel.children[0].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[1].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[2].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[3].getComponent(cc.Button).interactable = true;
            this.batgridPanel.children[4].getComponent(cc.Button).interactable = true;
        }

    },

        update:function(){

            if(this.batstartBtn.y <= -900){
                this.batScroll.vertical = true;
            }
            else if(this.batstartBtn.y>=-900){
                this.batScroll.vertical = false;
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

        //关闭对战页面
        closeBat:function(){
            cc.director.loadScene('menu');
        },    
        
    
    
        //展开对战网格选择页
        openBatGridPage:function(){
            if(this.batgridBtn.rotation == 0){
                var rotate = cc.rotateTo(0.5,-180);
                this.batgridBtn.runAction(rotate);
                this.batgridPanel.active = true;
                this.batlink.y -= 700;
                this.batstartBtn.y -= 700;
            }
    
        },
    
        closeBatGridPage:function(){
            if(this.batgridBtn.rotation == -180){
                var rotate = cc.rotateTo(0.5,0);
                this.batgridBtn.runAction(rotate);
                this.batgridPanel.active = false;
                this.batlink.y += 700;
                this.batstartBtn.y += 700;
            }
        },
    
        //展开对战连子数选择页
        openBatLinkPage:function(){
            if(this.batlinkBtn.rotation == 0){
                var rotate = cc.rotateTo(0.5,-180);
                this.batlinkBtn.runAction(rotate);
                this.batlinkPanel.active = true;
                this.batstartBtn.y -= 240;
            }
    
        },
    
        closeBatLinkPage:function(){
            if(this.batlinkBtn.rotation == -180){
                var rotate = cc.rotateTo(0.5,0);
                this.batlinkBtn.runAction(rotate);
                this.batlinkPanel.active = false;
                this.batstartBtn.y += 240;
            }
        },

        //对战跳转到设置
        batToSet:function(){
            cc.director.loadScene('setting');
            cc.exports.curType = GobangType.C2C;
        },
        
    
        //选择对战网格类型
        chooseBatGrid:function(evt,number){
            for(var i = 0; i<this.batgridPanel.children.length;i++){
                this.batgridPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[0];
                this.batgridPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
            }
            this.batgridType.string = number +' x '+ number;
            var num = parseInt(number);
            storage.setData("batgrid",num);
            evt.currentTarget.getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[1];
            evt.currentTarget.getChildByName('New Label').color =new cc.Color(255,255,255,255);
            if(this.batgridBtn.rotation == -180){
                var rotate = cc.rotateTo(0.5,0);
                this.batgridBtn.runAction(rotate);
                this.batgridPanel.active = false;
                this.batlink.y += 700;
                this.batstartBtn.y += 700;
            }
            var grid = storage.getData("batgrid");
            for(var i = 0; i<this.batlinkPanel.children.length;i++){
                this.batlinkPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[0];
                this.batlinkPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
            }
            if(grid == 3){
                this.batlinkPanel.children[0].getChildByName('New Label').color = new cc.Color(0,0,0,255);
                this.batlinkPanel.children[0].getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[0];
                this.batlinkPanel.children[1].opacity = 76.5;
                this.batlinkPanel.children[2].opacity = 76.5;
                this.batlinkPanel.children[1].getComponent(cc.Button).interactable = false;
                this.batlinkPanel.children[2].getComponent(cc.Button).interactable = false;
            }
            else if(grid >3 && grid <=7){
                this.batlinkPanel.children[1].opacity = 255;
                this.batlinkPanel.children[1].getComponent(cc.Button).interactable = true;
                this.batlinkPanel.children[2].opacity = 76.5
                this.batlinkPanel.children[2].getComponent(cc.Button).interactable = false;
            }
            else if(grid > 7){
                this.batlinkPanel.children[1].opacity = 255;
                this.batlinkPanel.children[1].getComponent(cc.Button).interactable = true;
                this.batlinkPanel.children[2].opacity = 255;
                this.batlinkPanel.children[2].getComponent(cc.Button).interactable = true;
            }
        },
    
        //选择对战连子数
        chooseBatLinkNum:function(evt,linkNum){
            this.batlinkType.string = linkNum;
            var link = parseInt(linkNum);
            storage.setData("batlink",link);
            for(var i = 0; i<this.batlinkPanel.children.length;i++){
                this.batlinkPanel.children[i].getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[0];
                this.batlinkPanel.children[i].getChildByName('New Label').color = new cc.Color(0,0,0,255);
            }
            evt.currentTarget.getComponent(cc.Sprite).spriteFrame = this.batchoosebButtonImg[1];
            evt.currentTarget.getChildByName('New Label').color =new cc.Color(255,255,255,255);
            if(this.batlinkBtn.rotation == -180){
                var rotate = cc.rotateTo(0.5,0);
                this.batlinkBtn.runAction(rotate);
                this.batlinkPanel.active = false;
                this.batstartBtn.y += 240;
            }
            if(link == 5){
                this.batgridPanel.children[0].opacity = 76.5;
                this.batgridPanel.children[1].opacity = 76.5;
                this.batgridPanel.children[2].opacity = 76.5;
                this.batgridPanel.children[3].opacity = 76.5;
                this.batgridPanel.children[4].opacity = 76.5;
                this.batgridPanel.children[0].getComponent(cc.Button).interactable = false;
                this.batgridPanel.children[1].getComponent(cc.Button).interactable = false;
                this.batgridPanel.children[2].getComponent(cc.Button).interactable = false;
                this.batgridPanel.children[3].getComponent(cc.Button).interactable = false;
                this.batgridPanel.children[4].getComponent(cc.Button).interactable = false;
            }
            else if(link == 4){
                this.batgridPanel.children[0].opacity = 76.5;
                this.batgridPanel.children[1].opacity = 255;
                this.batgridPanel.children[2].opacity = 255;
                this.batgridPanel.children[3].opacity = 255;
                this.batgridPanel.children[4].opacity = 255;
                this.batgridPanel.children[0].getComponent(cc.Button).interactable = false;
                this.batgridPanel.children[1].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[2].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[3].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[4].getComponent(cc.Button).interactable = true;
            }
            else if(link == 3){
                this.batgridPanel.children[0].opacity = 255;
                this.batgridPanel.children[1].opacity = 255;
                this.batgridPanel.children[2].opacity = 255;
                this.batgridPanel.children[3].opacity = 255;
                this.batgridPanel.children[4].opacity = 255;
                this.batgridPanel.children[0].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[1].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[2].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[3].getComponent(cc.Button).interactable = true;
                this.batgridPanel.children[4].getComponent(cc.Button).interactable = true;
            }
        },
    
        //开始双人对战游戏
        startC2CGame:function(){
            cc.exports.curType = GobangType.C2C;
            cc.director.loadScene('game');
        }, 
});

cc.exports.NextGobangType = GobangType;
