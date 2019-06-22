var  constans=require('Constans');
var  GAME_STATE=constans.GAME_STATE;
var levelMap = constans.levelMap;
var changeNum = constans.changeNum;
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

            gridSpriteFrame:{
                default:[],
                type:cc.SpriteFrame
            },
            linkImg:[cc.Sprite],

            chessPrefab:{//棋子的预制资源
                default:null,
                type:cc.Prefab
            },

            clickMus:{
                default:null,
                type:cc.AudioSource
            },

            endMus:{
                default:null,
                url:cc.AudioClip
            },

           playerImg:[cc.Node],
            heightLight:[cc.Node],
            
            chessList:[],
            cirLineEffect:[cc.Node],
            xLineEffect:[cc.Node],
            xcirLineEffect:[cc.Node],
            xxLineEffect:[cc.Node],
            
            wrongSpriteFrame:{//叉叉的图片
                default:null,
                type:cc.SpriteFrame
            },
            circleSpriteFrame:{//圈圈的图片
                default:null,
                type:cc.SpriteFrame
            },
            overPanel:[cc.Node],
            overLabel:[cc.Label],
            ScoreLabel:[cc.Label],
            score:cc.Label,
            touchChess:{//每一回合落下的棋子
                default:null,
                type:cc.Node,
                visible:false//属性窗口不显示
            },
            gameState:GAME_STATE.CIRCLE,
            
            resultImg:{
                default:[],
                type:cc.SpriteFrame
            },
            mask:cc.Node,
            result:[cc.Sprite],
            threeGroup:[],//三元组
            threeGroupScore:[],//三元组所得分数
            winNumLab:[cc.Label],
        },

        onLoad: function () {
            //根据不同关卡初始化
            this.backKeyListener();
            changeNum ++;
            // storage.setData('change',changeNum);
            if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                var lvNum = storage.getData('lvNum');
                var fail = storage.getData('fail');
                this.score.string = levelMap[lvNum].win.toString() + ':' +fail.toString();
                var grid = storage.getData("grid");
                var link = storage.getData("link");
                var lv = storage.getData("lv");
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                var grid = storage.getData("grid");
                var link = storage.getData("link");
                var lv = storage.getData("lv");
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                var grid = storage.getData("batgrid");
                var link = storage.getData("batlink");
            }

            //根据获取的网格数初始化网格图片
            switch(grid){
                case 3:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[0];
                break;
                case 4:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[1];
                break;
                case 5:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[2];
                break;
                case 6:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[3];
                break;
                case 7:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[4];
                break;
                case 8:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[5];
                break;
                case 9:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[6];
                break;
                case 10:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[7];
                break;
                case 11:
                this.getComponent(cc.Sprite).spriteFrame  = this.gridSpriteFrame[8];
                break;
            }

            switch(link){
                case 3:
                this.linkImg[0].node.active = true;
                break;
                case 4:
                this.linkImg[1].node.active = true;
                break;
                case 5:
                this.linkImg[2].node.active = true;
                break;
            }
            //初始游戏状态
            var self = this;
            //三连子线
            this.cirLineEffect[0].width *= link/grid;
            this.cirLineEffect[0].height *= link/grid;
            this.cirLineEffect[0].getChildByName('white').width *= link/grid;
            this.cirLineEffect[0].getChildByName('white').height *= link/grid;
            this.xLineEffect[0].width *= link /grid;
            this.xLineEffect[0].height *= link /grid;
            this.xLineEffect[0].getChildByName('white').width *= link/grid;
            this.xLineEffect[0].getChildByName('white').height *= link/grid;
            this.xcirLineEffect[0].width *= link/grid;
            this.xcirLineEffect[0].height *= link/grid;
            this.xcirLineEffect[0].getChildByName('white').width *= link/grid;
            this.xcirLineEffect[0].getChildByName('white').height *= link/grid;
            this.xxLineEffect[0].width *= link /grid;
            this.xxLineEffect[0].height *= link /grid;
            this.xxLineEffect[0].getChildByName('white').width *= link/grid;
            this.xxLineEffect[0].getChildByName('white').height *= link/grid;
            //四连子线
            this.cirLineEffect[1].width *= link/grid;
            this.cirLineEffect[1].height *= link/grid;
            this.cirLineEffect[1].getChildByName('white').width *= link/grid;
            this.cirLineEffect[1].getChildByName('white').height *= link/grid;
            this.xLineEffect[1].width *= link /grid;
            this.xLineEffect[1].height *= link /grid;
            this.xLineEffect[1].getChildByName('white').width *= link/grid;
            this.xLineEffect[1].getChildByName('white').height *= link/grid;
            this.xcirLineEffect[1].width *= link/grid;
            this.xcirLineEffect[1].height *= link/grid;
            this.xcirLineEffect[1].getChildByName('white').width *= link/grid;
            this.xcirLineEffect[1].getChildByName('white').height *= link/grid;
            this.xxLineEffect[1].width *= link /grid;
            this.xxLineEffect[1].height *= link /grid;
            this.xxLineEffect[1].getChildByName('white').width *= link/grid;
            this.xxLineEffect[1].getChildByName('white').height *= link/grid;
            //五连子线
            this.cirLineEffect[2].width *= link/grid;
            this.cirLineEffect[2].height *= link/grid;
            this.cirLineEffect[2].getChildByName('white').width *= link/grid;
            this.cirLineEffect[2].getChildByName('white').height *= link/grid;
            this.xLineEffect[2].width *= link /grid;
            this.xLineEffect[2].height *= link /grid;
            this.xLineEffect[2].getChildByName('white').width *= link/grid;
            this.xLineEffect[2].getChildByName('white').height *= link/grid;
            this.xcirLineEffect[2].width *= link/grid;
            this.xcirLineEffect[2].height *= link/grid;
            this.xcirLineEffect[2].getChildByName('white').width *= link/grid;
            this.xcirLineEffect[2].getChildByName('white').height *= link/grid;
            this.xxLineEffect[2].width *= link /grid;
            this.xxLineEffect[2].height *= link /grid;
            this.xxLineEffect[2].getChildByName('white').width *= link/grid;
            this.xxLineEffect[2].getChildByName('white').height *= link/grid;

            //初始化棋盘上的点，并为每个节点添加事件
            for(var y = 0;y<grid;y++){
                for(var x = 0;x<grid;x++){
                    var newNode = cc.instantiate(this.chessPrefab);
                    this.node.addChild(newNode);
                    newNode.setLocalZOrder(-1); //改变渲染位置
                    newNode.setPosition(cc.p(x*(684/grid)+(684/(2*grid)),y*(684/grid)+(684/(2*grid))));//根据棋盘和棋子的大小算出棋子应落下的指定位置
                    newNode.tag = y*grid+x;//根据每个节点的tag就可以算出其二维坐标
                    newNode.on(cc.Node.EventType.TOUCH_START,function(event){
                        this.width = 684/grid;
                        this.height = 684 /grid;
                        //播放下棋声音
                        self.touchChess = this;
                        if (cc.exports.curType == cc.exports.NextGobangType.C2C){
                            if (this.getComponent(cc.Sprite).spriteFrame === null){
                                self.clickMus.play();
                                if(self.gameState === GAME_STATE.CIRCLE){
                                    this.getComponent(cc.Sprite).spriteFrame = self.circleSpriteFrame;//下子后添加棋子图片使棋子显示
                                    var fill = this.getComponent(cc.Animation);
                                    fill.play("fill");
        
                                }else if(self.gameState === GAME_STATE.WRONG){
                                    this.getComponent(cc.Sprite).spriteFrame = self.wrongSpriteFrame;
                                    this.scaleY = -1;
                                    this.getComponent(cc.Sprite).fillType = cc.Sprite.FillType.VERTICAL;
                                    this.getComponent(cc.Sprite).fillStart = 0;
                                    this.getChildByName('X').active = true;
                                    this.getChildByName('X').width = 684 / grid;
                                    this.getChildByName('X').height = 684 /grid;
                                    var fill = this.getComponent(cc.Animation);
                                    fill.play("fill");
                                }

                                    self.judgeOver(grid,link);
                            }
                        
                return;
                }
                        if(cc.exports.curType == cc.exports.NextGobangType.P2P || cc.exports.curType == cc.exports.NextGobangType.P2C){
                            if(this.getComponent(cc.Sprite).spriteFrame === null){
                                if(self.gameState === GAME_STATE.CIRCLE){
                                    self.clickMus.play();
                                    this.getComponent(cc.Sprite).spriteFrame = self.circleSpriteFrame;
                                    var fill = this.getComponent(cc.Animation);
                                    fill.play("fill");
                                    self.judgeOver(grid,link);
                                    if(self.gameState === GAME_STATE.WRONG){
                                        self.scheduleOnce(function(){self.ai(grid,link,lv)},0.5);//延迟0.5秒电脑下
                                    }
    
                                }
                            }

                        }

                    });
                    this.chessList.push(newNode);
                }
            }
            //闯关或人机模式，电脑先手
            if(changeNum % 2 === 0 && (cc.exports.curType == cc.exports.NextGobangType.P2P || cc.exports.curType == cc.exports.NextGobangType.P2C)){
                var random = this.getRandom(0,grid*grid - 1);
                this.chessList[random].getComponent(cc.Sprite).spriteFrame = this.wrongSpriteFrame;
                this.chessList[random].scaleY = -1;
                this.chessList[random].width = 684 / grid;
                this.chessList[random].height = 684 / grid;
                this.chessList[random].getComponent(cc.Sprite).fillType = cc.Sprite.FillType.VERTICAL;
                this.chessList[random].getComponent(cc.Sprite).fillStart = 0;
                this.chessList[random].getChildByName('X').active = true;
                this.chessList[random].getChildByName('X').width = 684 / grid;
                this.chessList[random].getChildByName('X').height = 684 / grid;
                var fill = this.chessList[random].getComponent(cc.Animation);
                fill.play("fill");
                this.gameState = GAME_STATE.CIRCLE;
            }


            //添加三元数组
            //横向
            //连接数为3时
            if(link === 3){
                for(var y=0;y<grid;y++){
                    for(var x=0;x<grid - 2;x++){
                        this.threeGroup.push([y*grid+x,y*grid+x+1,y*grid+x+2]);
                    }  
                }
                //纵向
                for(var x=0;x<grid;x++){
                    for(var y=0;y<grid - 2;y++){
                        this.threeGroup.push([y*grid+x,(y+1)*grid+x,(y+2)*grid+x]);
                    }
                }
                //右上斜向
                for(var b=3 - grid;b<=grid - 3;b++){
                    for(var x=0;x<grid - 2;x++){
                        if(b+x < 0 || b+x > grid - 3){
                            continue;
                        }else{
                            this.threeGroup.push([(b+x)*grid+x,(b+x+1)*grid+x+1,(b+x+2)*grid+x+2]);
                        }
                    }
                }
                //右下斜向
                for(var b=2;b<=2*grid - 4;b++){
                    for(var y=0;y<grid - 2;y++){
                        if(b-y <2 || b-y > grid - 1){
                            continue;
                        }else{
                            this.threeGroup.push([y*grid+b-y,(y+1)*grid+b-y-1,(y+2)*grid+b-y-2]);
                        }
                    }
                }
            }
            //连接数为4时
            else if(link === 4 && grid >= 4){
                for(var y=0;y<grid;y++){
                    for(var x=0;x<grid - 3;x++){
                        this.threeGroup.push([y*grid+x,y*grid+x+1,y*grid+x+2,y*grid+x+3]);
                    }  
                }
                //纵向
                for(var x=0;x<grid;x++){
                    for(var y=0;y<grid - 3;y++){
                        this.threeGroup.push([y*grid+x,(y+1)*grid+x,(y+2)*grid+x,(y+3)*grid+x]);
                    }
                }
                //右上斜向
                for(var b=4 - grid;b<=grid - 4;b++){
                    for(var x=0;x<grid - 3;x++){
                        if(b+x < 0 || b+x > grid - 4){
                            continue;
                        }else{
                            this.threeGroup.push([(b+x)*grid+x,(b+x+1)*grid+x+1,(b+x+2)*grid+x+2,(b+x+3)*grid+x+3]);
                        }
                    }
                }
                //右下斜向
                for(var b=3;b<=2*grid - 5;b++){
                    for(var y=0;y<grid - 3;y++){
                        if(b-y <3 || b-y > grid - 1){
                            continue;
                        }else{
                            this.threeGroup.push([y*grid+b-y,(y+1)*grid+b-y-1,(y+2)*grid+b-y-2,(y+3)*grid+b-y-3]);
                        }
                    }
                }
            }
            //连接数为5时
            else if(link === 5 && grid > 5){
                for(var y=0;y<grid;y++){
                    for(var x=0;x<grid - 4;x++){
                        this.threeGroup.push([y*grid+x,y*grid+x+1,y*grid+x+2,y*grid+x+3,y*grid+x+4]);
                    }  
                }
                //纵向
                for(var x=0;x<grid;x++){
                    for(var y=0;y<grid - 4;y++){
                        this.threeGroup.push([y*grid+x,(y+1)*grid+x,(y+2)*grid+x,(y+3)*grid+x,(y+4)*grid+x]);
                    }
                }
                //右上斜向
                for(var b=5 - grid;b<=grid - 5;b++){
                    for(var x=0;x<grid - 4;x++){
                        if(b+x < 0 || b+x > grid - 5){
                            continue;
                        }else{
                            this.threeGroup.push([(b+x)*grid+x,(b+x+1)*grid+x+1,(b+x+2)*grid+x+2,(b+x+3)*grid+x+3,(b+x+4)*grid+x+4]);
                        }
                    }
                }
                //右下斜向
                for(var b=4;b<=2*grid - 6;b++){
                    for(var y=0;y<grid - 4;y++){
                        if(b-y <4 || b-y > grid - 1){
                            continue;
                        }else{
                            this.threeGroup.push([y*grid+b-y,(y+1)*grid+b-y-1,(y+2)*grid+b-y-2,(y+3)*grid+b-y-3,(y+4)*grid+b-y-4]);
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
                this.overPanel[4].active = true;
                this.node.parent.active = false;
            }
        },

        cancel:function(){
            this.overPanel[4].active = false;
            this.node.parent.active = true;
        },

        sure:function(){
            if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                cc.director.loadScene('level');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                cc.director.loadScene('pc');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                cc.director.loadScene('battle');
            }             
        },
        //电脑下棋逻辑
        ai:function(grid,link,lv){
            //评分
            for(var i=0;i<this.threeGroup.length;i++){
                var b=0;//三元组里叉叉的个数
                var w=0;//三元组里圈圈的个数
                for(var j=0;j<link;j++){
                        if(this.chessList[this.threeGroup[i][j]].getComponent(cc.Sprite).spriteFrame == this.circleSpriteFrame){
                            w++;
                        }else if(this.chessList[this.threeGroup[i][j]].getComponent(cc.Sprite).spriteFrame == this.wrongSpriteFrame){
                            b++;
                        }
                }
                //根据连子数选择对应棋子位置估值,简单模式电脑一直处于防守状态(不赌玩家子，只顾自己发育)，一般模式电脑偶尔防守，偶尔进攻，困难模式电脑一直进攻(堵玩家子)
                switch(lv){
                    case "简单":
                    switch(link){
                        case 3:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 15;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 400;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 35;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 800;
                        }
                        break;
                        case 4:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 15;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 400;
                        }else if(b==0&&w==3){
                            this.threeGroupScore[i] = 1800;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 35;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 800;
                        }else if(w==0&&b==3){
                            this.threeGroupScore[i] = 15000;
                        }
                        break;
                        case 5:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 15;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 400;
                        }else if(b==0&&w==3){
                            this.threeGroupScore[i] = 1800;
                        }
                        else if(b==0&&w==4){
                            this.threeGroupScore[i] =100000;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 35;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 800;
                        }else if(w==0&&b==3){
                            this.threeGroupScore[i] = 15000;
                        }else if(w==0&&b==4){
                            this.threeGroupScore[i] = 800000;
                        }
                        break;
                    }
                    break;
                    case "一般":
                    switch(link){
                        case 3:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 35;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 400;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 15;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 800;
                        }
                        break;
                        case 4:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 35;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 400;
                        }else if(b==0&&w==3){
                            this.threeGroupScore[i] = 15000;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 15;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 800;
                        }else if(w==0&&b==3){
                            this.threeGroupScore[i] = 1800;
                        }
                        break;
                        case 5:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 35;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 400;
                        }else if(b==0&&w==3){
                            this.threeGroupScore[i] = 15000;
                        }
                        else if(b==0&&w==4){
                            this.threeGroupScore[i] =100000;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 15;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 800;
                        }else if(w==0&&b==3){
                            this.threeGroupScore[i] = 1800;
                        }else if(w==0&&b==4){
                            this.threeGroupScore[i] = 800000;
                        }
                        break;
                    }
                    break;
                    case "困难":
                    switch(link){
                        case 3:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 35;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 800;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 15;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 400;
                        }
                        break;
                        case 4:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 35;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 800;
                        }else if(b==0&&w==3){
                            this.threeGroupScore[i] = 15000;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 15;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 400;
                        }else if(w==0&&b==3){
                            this.threeGroupScore[i] = 1800;
                        }
                        break;
                        case 5:
                        if(b+w==0){
                            this.threeGroupScore[i] = 7;
                        }else if(b>0&&w>0){
                            this.threeGroupScore[i] = 0;
                        }else if(b==0&&w==1){
                            this.threeGroupScore[i] = 35;
                        }else if(b==0&&w==2){
                            this.threeGroupScore[i] = 800;
                        }else if(b==0&&w==3){
                            this.threeGroupScore[i] = 15000;
                        }
                        else if(b==0&&w==4){
                            this.threeGroupScore[i] =800000;
                        }
                        else if(w==0&&b==1){
                            this.threeGroupScore[i] = 15;
                        }else if(w==0&&b==2){
                            this.threeGroupScore[i] = 400;
                        }else if(w==0&&b==3){
                            this.threeGroupScore[i] = 8000;
                        }else if(w==0&&b==4){
                            this.threeGroupScore[i] = 100000;
                        }
                        break;
                    }
                    break;
                }

            }
            var flag1 = false;//无子
            var flag2 = false;//有子
            var nPosition = 0;
            var hScore = 0;
            var mPosition=0;
            for(var i=0;i<this.threeGroupScore.length;i++){
                if(this.threeGroupScore[i]>hScore){
                    hScore = this.threeGroupScore[i];
                    mPosition = i;
                //     mPosition = this.getRandom(0,i);
                //     if(this.chessList[this.threeGroup[mPosition][nPosition]].getComponent(cc.Sprite).spriteFrame != null){
                //         flag1 = true;
                //         flag2 = true;
                //         mPosition = i;
                // }
                //     // console.log(mPosition);
                    // mPosition=this.getRandom(0,i);
                }
            }
            //在最高分的三元组里找到最优下子位置
            for(var i=0;i<link;i++){
                //如果无子
                if(!flag1&&this.chessList[this.threeGroup[mPosition][i]].getComponent(cc.Sprite).spriteFrame == null){
                    // nPosition = i;
                    nPosition = this.getRandom(0,i);
                    if(this.chessList[this.threeGroup[mPosition][nPosition]].getComponent(cc.Sprite).spriteFrame != null){;
                        nPosition = i;
                    }
                }
                //有子
                if(!flag2&&this.chessList[this.threeGroup[mPosition][i]].getComponent(cc.Sprite).spriteFrame != null){
                    flag1 = true;
                    flag2 = true;
                }
                //无子
                if(flag2&&this.chessList[this.threeGroup[mPosition][i]].getComponent(cc.Sprite).spriteFrame == null){
                    // nPosition = i;
                    nPosition = this.getRandom(0,i);
                    if(this.chessList[this.threeGroup[mPosition][nPosition]].getComponent(cc.Sprite).spriteFrame != null){
                        nPosition = i;
                    }
                } 
            }
            // console.log('mPosition =' + mPosition);
            // console.log('nPosition =' + nPosition);
            //在最优位置下子 
            if( this.chessList[this.threeGroup[mPosition][nPosition]].getComponent(cc.Sprite).spriteFrame!==null){
                return;
            }else{
                this.chessList[this.threeGroup[mPosition][nPosition]].getComponent(cc.Sprite).spriteFrame = this.wrongSpriteFrame;
                this.touchChess =  this.chessList[this.threeGroup[mPosition][nPosition]];
                this.touchChess.scaleY = -1;
                this.touchChess.width = 684 / grid;
                this.touchChess.height = 684 / grid;
                this.touchChess.getComponent(cc.Sprite).fillType = cc.Sprite.FillType.VERTICAL;
                this.touchChess.getComponent(cc.Sprite).fillStart = 0;
                this.touchChess.getChildByName('X').active = true;
                this.touchChess.getChildByName('X').width = 684 / grid;
                this.touchChess.getChildByName('X').height = 684 / grid;
                var fill = this.touchChess.getComponent(cc.Animation);
                fill.play("fill");
                this.judgeOver(grid,link);
            }


        },
        
        judgeOver:function(grid,link){
            var x0 = this.touchChess.tag % grid;
            var y0 = parseInt(this.touchChess.tag / grid);
            var f = y0 - x0;
            var f1 = y0 + x0;
            //判断横向
            var threeCount = 0;
            for(var x = 0;x < grid;x++){
                if((this.chessList[y0*grid+x].getComponent(cc.Sprite)).spriteFrame === this.touchChess.getComponent(cc.Sprite).spriteFrame){
                    threeCount++; 
                    if(threeCount==link){
                        switch(threeCount){
                            case 3:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.cirLineEffect[0].scaleX = -1;
                                this.cirLineEffect[0].setPosition(cc.p((this.chessList[y0*grid+x].x+this.chessList[y0*grid+x-2].x)/2,this.chessList[y0*grid+x].y));
                                var cirLineFill = this.cirLineEffect[0].getComponent(cc.Animation);
                                cirLineFill.play('linefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xLineEffect[0].scaleX = -1;
                                this.xLineEffect[0].setPosition(cc.p((this.chessList[y0*grid+x].x+this.chessList[y0*grid+x-2].x)/2,this.chessList[y0*grid+x].y));
                                var xLineFill = this.xLineEffect[0].getComponent(cc.Animation);
                                xLineFill.play('xfill');
                            } 
                            break;
                            case 4:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.cirLineEffect[1].scaleX = -1;
                                this.cirLineEffect[1].setPosition(cc.p((this.chessList[y0*grid+x].x+this.chessList[y0*grid+x-3].x)/2,this.chessList[y0*grid+x].y));
                                var cirLineFill = this.cirLineEffect[1].getComponent(cc.Animation);
                                cirLineFill.play('linefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xLineEffect[1].scaleX = -1;
                                this.xLineEffect[1].setPosition(cc.p((this.chessList[y0*grid+x].x+this.chessList[y0*grid+x-3].x)/2,this.chessList[y0*grid+x].y));
                                var xLineFill = this.xLineEffect[1].getComponent(cc.Animation);
                                xLineFill.play('xfill');
 
                            } 
                            break;
                            case 5:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.cirLineEffect[2].scaleX = -1;
                                this.cirLineEffect[2].setPosition(cc.p((this.chessList[y0*grid+x].x+this.chessList[y0*grid+x-4].x)/2,this.chessList[y0*grid+x].y));
                                var cirLineFill = this.cirLineEffect[2].getComponent(cc.Animation);
                                cirLineFill.play('linefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xLineEffect[2].scaleX = -1;
                                this.xLineEffect[2].setPosition(cc.p((this.chessList[y0*grid+x].x+this.chessList[y0*grid+x-4].x)/2,this.chessList[y0*grid+x].y));
                                var xLineFill = this.xLineEffect[2].getComponent(cc.Animation);
                                xLineFill.play('xfill');
 
                            } 
                            break;
                        }
                        this.scheduleOnce(() =>{
                            this.showResult();
                        },1);
                        return;
                    }
                }else{
                    threeCount=0;
                }
            }
            //判断纵向
            threeCount = 0;
            for(var y = 0;y < grid;y++){
                if((this.chessList[y*grid+x0].getComponent(cc.Sprite)).spriteFrame === this.touchChess.getComponent(cc.Sprite).spriteFrame){
                    threeCount++; 
                    if(threeCount==link){
                        switch(threeCount){
                            case 3:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.cirLineEffect[0].scaleX = -1;
                                this.cirLineEffect[0].rotation = 90;
                                this.cirLineEffect[0].setPosition(cc.p(this.chessList[y*grid+x0].x,(this.chessList[y*grid+x0].y+this.chessList[(y-2)*grid+x0].y)/2));
                                var cirLineFill = this.cirLineEffect[0].getComponent(cc.Animation);
                                cirLineFill.play('linefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xLineEffect[0].scaleX = -1;
                                this.xLineEffect[0].rotation = 90;
                                this.xLineEffect[0].setPosition(cc.p(this.chessList[y*grid+x0].x,(this.chessList[y*grid+x0].y+this.chessList[(y-2)*grid+x0].y)/2));
                                var xLineFill = this.xLineEffect[0].getComponent(cc.Animation);
                                xLineFill.play('xfill');
 
                            } 
                            break;
                            case 4:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.cirLineEffect[1].scaleX = -1;
                                this.cirLineEffect[1].rotation = 90;
                                this.cirLineEffect[1].setPosition(cc.p(this.chessList[y*grid+x0].x,(this.chessList[y*grid+x0].y+this.chessList[(y-3)*grid+x0].y)/2));
                                var cirLineFill = this.cirLineEffect[1].getComponent(cc.Animation);
                                cirLineFill.play('linefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xLineEffect[1].scaleX = -1;
                                this.xLineEffect[1].rotation = 90;
                                this.xLineEffect[1].setPosition(cc.p(this.chessList[y*grid+x0].x,(this.chessList[y*grid+x0].y+this.chessList[(y-3)*grid+x0].y)/2));
                                var xLineFill = this.xLineEffect[1].getComponent(cc.Animation);
                                xLineFill.play('xfill');
 
                            } 
                            break;
                            case 5:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.cirLineEffect[2].scaleX = -1;
                                this.cirLineEffect[2].rotation = 90;
                                this.cirLineEffect[2].setPosition(cc.p(this.chessList[y*grid+x0].x,(this.chessList[y*grid+x0].y+this.chessList[(y-4)*grid+x0].y)/2));
                                var cirLineFill = this.cirLineEffect[2].getComponent(cc.Animation);
                                cirLineFill.play('linefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xLineEffect[2].scaleX = -1;
                                this.xLineEffect[2].rotation = 90;
                                this.xLineEffect[2].setPosition(cc.p(this.chessList[y*grid+x0].x,(this.chessList[y*grid+x0].y+this.chessList[(y-4)*grid+x0].y)/2));
                                var xLineFill = this.xLineEffect[2].getComponent(cc.Animation);
                                xLineFill.play('xfill');
 
                            } 
                            break;
                        }
                        this.scheduleOnce(() =>{
                            this.showResult();
                        },1);
                        return;
                    }
                }else{
                    threeCount=0;
                }
            }
            //判断右上斜向

            threeCount = 0;
            for(var x = 0;x < grid;x++){
                if(f+x < 0 || f+x > grid - 1){
                    continue;
                }
                if((this.chessList[(f+x)*grid+x].getComponent(cc.Sprite)).spriteFrame === this.touchChess.getComponent(cc.Sprite).spriteFrame){
                    threeCount++; 
                    if(threeCount==link){
                        switch(threeCount){
                            case 3:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.xcirLineEffect[0].setPosition(cc.p((this.chessList[(f+x)*grid+x].x+this.chessList[(f+x-2)*grid+x-2].x)/2,(this.chessList[(f+x)*grid+x].y+this.chessList[(f+x-2)*grid+x-2].y)/2));
                                var cirLineFill = this.xcirLineEffect[0].getComponent(cc.Animation);
                                cirLineFill.play('xlinefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xxLineEffect[0].setPosition(cc.p((this.chessList[(f+x)*grid+x].x+this.chessList[(f+x-2)*grid+x-2].x)/2,(this.chessList[(f+x)*grid+x].y+this.chessList[(f+x-2)*grid+x-2].y)/2));
                                var xLineFill = this.xxLineEffect[0].getComponent(cc.Animation);
                                xLineFill.play('xxfill');
    
                            } 
                            break;
                            case 4:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.xcirLineEffect[1].setPosition(cc.p((this.chessList[(f+x)*grid+x].x+this.chessList[(f+x-3)*grid+x-3].x)/2,(this.chessList[(f+x)*grid+x].y+this.chessList[(f+x-3)*grid+x-3].y)/2));
                                var cirLineFill = this.xcirLineEffect[1].getComponent(cc.Animation);
                                cirLineFill.play('xlinefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xxLineEffect[1].setPosition(cc.p((this.chessList[(f+x)*grid+x].x+this.chessList[(f+x-3)*grid+x-3].x)/2,(this.chessList[(f+x)*grid+x].y+this.chessList[(f+x-3)*grid+x-3].y)/2));
                                var xLineFill = this.xxLineEffect[1].getComponent(cc.Animation);
                                xLineFill.play('xxfill');
    
                            } 
                            break;
                            case 5:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.xcirLineEffect[2].setPosition(cc.p((this.chessList[(f+x)*grid+x].x+this.chessList[(f+x-4)*grid+x-4].x)/2,(this.chessList[(f+x)*grid+x].y+this.chessList[(f+x-4)*grid+x-4].y)/2));
                                var cirLineFill = this.xcirLineEffect[2].getComponent(cc.Animation);
                                cirLineFill.play('xlinefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xxLineEffect[2].setPosition(cc.p((this.chessList[(f+x)*grid+x].x+this.chessList[(f+x-4)*grid+x-4].x)/2,(this.chessList[(f+x)*grid+x].y+this.chessList[(f+x-4)*grid+x-4].y)/2));
                                var xLineFill = this.xxLineEffect[2].getComponent(cc.Animation);
                                xLineFill.play('xxfill');
    
                            } 
                            break;
                        }
                        this.scheduleOnce(() =>{
                            this.showResult();
                        },1);
                        return;
                    }
                }else{
                    threeCount=0;
                }
            }
            //判断右下斜向
            threeCount = 0;
            for(var x = 0;x < grid;x++){
                if(f1-x < 0 || f1-x > grid - 1){
                    continue;
                }
                if((this.chessList[(f1-x)*grid+x].getComponent(cc.Sprite)).spriteFrame === this.touchChess.getComponent(cc.Sprite).spriteFrame){
                    threeCount++; 
                    if(threeCount==link){
                        switch(threeCount){
                            case 3:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.xcirLineEffect[0].rotation = 90;
                                this.xcirLineEffect[0].setPosition(cc.p((this.chessList[(f1-x)*grid+x].x+this.chessList[(f1-x+2)*grid+x-2].x)/2,(this.chessList[(f1-x)*grid+x].y+this.chessList[(f1-x+2)*grid+x-2].y)/2));
                                var cirLineFill = this.xcirLineEffect[0].getComponent(cc.Animation);
                                cirLineFill.play('xlinefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xxLineEffect[0].rotation = 90;
                                this.xxLineEffect[0].setPosition(cc.p((this.chessList[(f1-x)*grid+x].x+this.chessList[(f1-x+2)*grid+x-2].x)/2,(this.chessList[(f1-x)*grid+x].y+this.chessList[(f1-x+2)*grid+x-2].y)/2));
                                var xLineFill = this.xxLineEffect[0].getComponent(cc.Animation);
                                xLineFill.play('xxfill');
    
                            } 
                            break;
                            case 4:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.xcirLineEffect[1].rotation = 90;
                                this.xcirLineEffect[1].setPosition(cc.p((this.chessList[(f1-x)*grid+x].x+this.chessList[(f1-x+3)*grid+x-3].x)/2,(this.chessList[(f1-x)*grid+x].y+this.chessList[(f1-x+3)*grid+x-3].y)/2));
                                var cirLineFill = this.xcirLineEffect[1].getComponent(cc.Animation);
                                cirLineFill.play('xlinefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xxLineEffect[1].rotation = 90;
                                this.xxLineEffect[1].setPosition(cc.p((this.chessList[(f1-x)*grid+x].x+this.chessList[(f1-x+3)*grid+x-3].x)/2,(this.chessList[(f1-x)*grid+x].y+this.chessList[(f1-x+3)*grid+x-3].y)/2));
                                var xLineFill = this.xxLineEffect[1].getComponent(cc.Animation);
                                xLineFill.play('xxfill');
    
                            } 
                            break;
                            case 5:
                            if(this.gameState === GAME_STATE.CIRCLE){
                                this.xcirLineEffect[2].rotation = 90;
                                this.xcirLineEffect[2].setPosition(cc.p((this.chessList[(f1-x)*grid+x].x+this.chessList[(f1-x+4)*grid+x-4].x)/2,(this.chessList[(f1-x)*grid+x].y+this.chessList[(f1-x+4)*grid+x-4].y)/2));
                                var cirLineFill = this.xcirLineEffect[2].getComponent(cc.Animation);
                                cirLineFill.play('xlinefill');
                            } else if(this.gameState == GAME_STATE.WRONG){
                                this.xxLineEffect[2].rotation =90;
                                this.xxLineEffect[2].setPosition(cc.p((this.chessList[(f1-x)*grid+x].x+this.chessList[(f1-x+4)*grid+x-4].x)/2,(this.chessList[(f1-x)*grid+x].y+this.chessList[(f1-x+4)*grid+x-4].y)/2));
                                var xLineFill = this.xxLineEffect[2].getComponent(cc.Animation);
                                xLineFill.play('xxfill');
    
                            } 
                            break;
                        }

                        this.scheduleOnce(() =>{
                            this.showResult();
                        },1);

                        return;
                    }
                }else{
                    threeCount=0;
                }
            }

            //判断是否平局
            var count = 0;
            for(var y =0;y<grid;y++){
                for(var x=0;x<grid;x++){
                    if(this.chessList[y*grid+x].getComponent(cc.Sprite).spriteFrame !== null){
                        count ++;
                        if(count === grid * grid){
                            this.scheduleOnce(()=>{
                                this.draw();
                            },1);
                        }
                    }
                }
            }
            
            //没有输赢交换下子顺序
            if(this.gameState === GAME_STATE.CIRCLE){
                this.gameState = GAME_STATE.WRONG;
                this.playerImg[0].opacity = 138;
                this.playerImg[1].opacity = 255;
                this.heightLight[0].opacity = 0;
                this.heightLight[1].opacity = 255;
            }else{
                this.gameState = GAME_STATE.CIRCLE;
                this.playerImg[0].opacity = 255;
                this.playerImg[1].opacity = 138;
                this.heightLight[0].opacity = 255;
                this.heightLight[1].opacity = 0;
            }
        },

        //输赢
        showResult: function(){
            this.current = cc.audioEngine.play(this.endMus,false,1);
            if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                this.overPanel[1].active = true;
                this.node.parent.active = false;
                if(this.gameState === GAME_STATE.WRONG){
                    this.result[1].spriteFrame = this.resultImg[1];
                    this.overLabel[1].string = "失败！";
                    this.overLabel[1].node.color = new cc.Color(255,131,23,255);
                    this.ScoreLabel[1].string = "0:1";
                    this.score.string = "0:1";
                }else if(this.gameState == GAME_STATE.CIRCLE){
                    this.result[1].spriteFrame = this.resultImg[0];
                    this.overLabel[1].string = "胜利！";
                    this.overLabel[1].node.color = new cc.Color(34,145,254,255);
                    this.ScoreLabel[1].string = "1:0"
                    this.score.string = "1:0";
                }
            }else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                this.overPanel[2].active = true;
                this.node.parent.active = false;
                if(this.gameState === GAME_STATE.WRONG){
                    this.result[2].spriteFrame = this.resultImg[4];
                    this.overLabel[2].string = "获胜者";
                    this.ScoreLabel[2].string = "0:1";
                    this.score.string = "0:1";
                }else if(this.gameState == GAME_STATE.CIRCLE){
                    this.result[2].spriteFrame = this.resultImg[3];
                    this.overLabel[2].string = "获胜者";
                    this.ScoreLabel[2].string = "1:0";
                    this.score.string = "1:0";
                }
            }else if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                this.node.parent.active = false;
                var lvNum = storage.getData('lvNum');
                var fail = storage.getData('fail');
                if(this.gameState === GAME_STATE.WRONG){
                    fail ++;
                    if(levelMap[lvNum].win===3){
                        lvNum ++;
                        levelMap[lvNum].isOpen = true;
                        this.overPanel[3].active = true;
                        this.result[3].spriteFrame = this.resultImg[1];
                        this.overLabel[3].string = "失败！";
                        this.overLabel[3].node.color = new cc.Color(255,131,23,255);
                        this.ScoreLabel[3].string = levelMap[lvNum].win.toString() + ':' +fail.toString();
                        this.winNumLab[1].string = levelMap[lvNum].win.toString() + ' wins';
                    }
                    else{
                        this.overPanel[0].active = true;
                        this.result[0].spriteFrame = this.resultImg[0];
                        this.overLabel[0].string = "胜利！";
                        this.overLabel[0].node.color = new cc.Color(34,145,254,255);
                        this.ScoreLabel[0].string = levelMap[lvNum].win.toString() + ':' +fail.toString();
                        this.winNumLab[0].string = levelMap[lvNum].win.toString() + ' wins';
                    }
                    storage.setData('fail',fail);
                }else if(this.gameState == GAME_STATE.CIRCLE){
                    levelMap[lvNum].win ++;
                    if(levelMap[lvNum].win === 3){
                        lvNum ++;
                        levelMap[lvNum].isOpen = true;
                        storage.setData('lvNum',lvNum);
                        this.overPanel[3].active = true;
                        this.result[3].spriteFrame = this.resultImg[0];
                        this.overLabel[3].string = "胜利！";
                        this.overLabel[3].node.color = new cc.Color(34,145,254,255);
                        this.ScoreLabel[3].string = levelMap[lvNum-1].win.toString() + ':' +fail.toString();
                        this.winNumLab[1].string = levelMap[lvNum-1].win.toString() + ' wins';
                    }
                    else{
                        this.overPanel[0].active = true;
                        this.result[0].spriteFrame = this.resultImg[0];
                        this.overLabel[0].string = "胜利！";
                        this.overLabel[0].node.color = new cc.Color(34,145,254,255);
                        this.ScoreLabel[0].string = levelMap[lvNum].win.toString() + ':' +fail.toString();
                        this.winNumLab[0].string = levelMap[lvNum].win.toString() + ' wins';
                    }
    
                }
            }

            this.gameState = GAME_STATE.OVER;
        },

        //平局
        draw:function(){
            this.node.parent.active = false;
            this.current = cc.audioEngine.play(this.endMus,false,1);
            if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                this.overPanel[1].active = true;
                this.result[1].spriteFrame = this.resultImg[2];
                this.overLabel[1].string = "平局！";
                this.overLabel[1].node.color = new cc.Color(146,146,146,255);
                this.ScoreLabel[1].string = "0:0"
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                this.overPanel[2].active = true;
                this.result[2].spriteFrame = this.resultImg[2];
                this.overLabel[2].string = "平局！";
                this.overLabel[2].node.color = new cc.Color(146,146,146,255);
                this.ScoreLabel[2].string = "0:0"
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                this.overPanel[0].active = true;
                var lvNum = storage.getData('lvNum');
                var fail = storage.getData('fail');
                this.result[0].spriteFrame = this.resultImg[2];
                this.overLabel[0].string = "平局！";
                this.overLabel[0].node.color = new cc.Color(146,146,146,255);
                this.ScoreLabel[0].string = levelMap[lvNum].win.toString() + ':' +fail.toString();
                this.winNumLab[0].string = levelMap[lvNum].win.toString() + ' wins';
                }
        },
        //获取随机数
        getRandom:function(min,max){
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        //进入下一关
        nextLevel:function(){
            var lvNum = storage.getData('lvNum');
            var lvInfo = levelMap[lvNum];
            var lvNum = lvInfo.lvNum;
            var grid = lvInfo.grid;
            var lv = lvInfo.lv;
            var link = lvInfo.link;
            lvInfo.isOpen = true;
            storage.setData('lvNum',lvNum);
            storage.setData('grid',grid);
            storage.setData('lv',lv);
            storage.setData('link',link);
            storage.setData('fail',0);
            cc.director.loadScene('game');
        },

        //关闭弹窗
        closeWindow:function(){
            this.node.parent.active = true;
            this.mask.active = true;
            if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                this.overPanel[1].active = false;
            }else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                this.overPanel[2].active = false;
            }else if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                this.overPanel[0].active = false;
                this.overPanel[3].active = false;
                var lvNum = storage.getData('lvNum');
                var fail = storage.getData("fail");
                if(levelMap[lvNum].win >= 3){
                    this.score.string = levelMap[lvNum].win .toString() + ":" +fail.toString();
                }
            }
        },

        //重开游戏
        restart:function(){
            var lvNum = storage.getData('lvNum');
            var fail = storage.getData("fail");
            if(levelMap[lvNum].win >= 3){
                this.score.string = levelMap[lvNum].win .toString() + ":" +fail.toString();
            }
            cc.director.loadScene('game');
            
        },

        //进入设置界面
        trunToSet:function(){
            cc.exports.curType = GobangType.GAME;
            cc.director.loadScene('setting');
        },

        //返回菜单
        returnToMenu:function(){
            cc.director.loadScene('menu');
        },

        //返回上一场景
        exit:function(){
            if(cc.exports.curType == cc.exports.NextGobangType.P2P){
                cc.director.loadScene('level');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.P2C){
                cc.director.loadScene('pc');
            }
            else if(cc.exports.curType == cc.exports.NextGobangType.C2C){
                cc.director.loadScene('battle');
            }    
        }
});

cc.exports.NextGobangType = GobangType;
