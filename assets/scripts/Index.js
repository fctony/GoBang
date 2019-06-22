
cc.Class({
    extends: cc.Component,

    properties: {
    },

    //首页跳转跳转到设置页面
    turnToSetPanel:function(){
        cc.director.loadScene('setting');
    },

    //跳转到闯关页面
    turnToCus:function(){
        cc.director.loadScene('level');
    },

    //跳转到人机页面
    turnToPC:function(){
        cc.director.loadScene('pc');
    },

    //跳转到对战页面
    turnToBat:function(){
        cc.director.loadScene('battle');
    }, 

});

