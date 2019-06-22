
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad:function(){
        var DesignWidth = 720;
        var DesignHeight = 1280;
        let size = cc.view.getFrameSize();
        if (cc.sys.OS_ANDROID == cc.sys.os || cc.sys.OS_IOS == cc.sys.os) {
        //这是手机
        if ( (size.width / size.height) == (1125/2436) ) { //判断是不是iphonex
        this.isIphoneX = true;
        } else {
        this.isIphoneX = false;
        }
        if ( (size.width / size.height) == (411 / 845) ) { //判断是不是三星手机
        //是三星全面屏
        } else {
        //不是
        }
        if ( (size.width/size.height) >= (DesignWidth/DesignHeight) ) {
        //宽度超出
        console.log("宽度超出");
        var width = size.width * (DesignHeight / size.height);
        cc.view.setDesignResolutionSize(width, DesignHeight, cc.ResolutionPolicy.FIXED_HEIGHT);
        } else {
        //高度超出
        console.log("高度超出");
        var height = size.height * (DesignWidth / size.width);
        cc.view.setDesignResolutionSize(DesignWidth, height, cc.ResolutionPolicy.FIXED_WIDTH);
        console.log("当前画布高度", height);
        }
        } else {
        cc.view.setDesignResolutionSize(DesignWidth, DesignHeight, cc.ResolutionPolicy.FIXED_WIDTH);
        }
    }
});
