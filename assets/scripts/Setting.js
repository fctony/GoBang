

cc.Class({
    extends: cc.Component,

    properties: {
        soundToggle:cc.Toggle,
        musicToggle:cc.Toggle,
        bgMus:cc.AudioSource
    },

    onLoad:function(){
        this.homeHideOrShow();
        this.backKeyListener();
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
            if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                cc.director.loadScene('level');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                cc.director.loadScene('pc');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                cc.director.loadScene('battle');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.GAME){
                cc.director.loadScene('game');
            }
            else{
                cc.director.loadScene('menu');
            }           
        }
    },


    //后台切入切出
    homeHideOrShow:function(){
        //进入后台
        cc.game.on(cc.game.EVENT_HIDE,function(){
            this.bgMus.pause();
        });
        //切入游戏
        cc.game.on(cc.game.EVENT_SHOW,function(){
            if(this.musicToggle.isChecked == true){
                this.musicToggle.node.getChildByName('Background').active = false;
                this.bgMus.play();
            }
            else{
                this.musicToggle.node.getChildByName('Background').active = true; 
                this.bgMus.pause(); 
        }
        });
    },

    //控制声音
    controlMus:function(){
        if(this.musicToggle.isChecked == true){
                this.musicToggle.node.getChildByName('Background').active = false;
                this.bgMus.play();
        }
        else{
                this.musicToggle.node.getChildByName('Background').active = true; 
                this.bgMus.pause(); 
        }
    },

    //控制音效
    controlSound:function(){
        if(this.soundToggle.isChecked == false){
            this.soundToggle.node.getChildByName('Background').active = true;
        }
        else{
            this.soundToggle.node.getChildByName('Background').active = false;           
        }        
    },

    //关闭设置页面
    closeSetPanel:function(){
        if(cc.exports.curType == cc.exports.NextGobangType.P2P){
            cc.director.loadScene('level');
        }
        else if(cc.exports.curType == cc.exports.NextGobangType.P2C){
            cc.director.loadScene('pc');
        }
        else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
            cc.director.loadScene('battle');
        }            
        else if(cc.exports.curType == cc.exports.NextGobangType.GAME){
            cc.director.loadScene('game');
        }
        else{
            cc.director.loadScene('menu');
        }

    },
});
