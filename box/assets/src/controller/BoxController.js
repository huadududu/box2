/**
 * Created by bing on 20/04/2018.
 */

//负责head展现和变换。
const CameraController = require('CameraController');
let StageConfig = require("StageConfig");
let BlockConfig = require("BoxConfig1");
let CycleConfig = require("CycleConfig");
let ToolConfig = require("ToolConfig");

let GameType = require("GameType");
let GameUtils = require("GameUtils");
let BlockBigFactory = require("BlockBigFactory");
let BlockSmallFactory = require("BlockSmallFactory");
let SpriteFrameCenter = require("SpriteFrameCenter");
let ParticleSystemCenter = require("ParticleSystemCenter");
let SkeletonDataCenter = require("SkeletonDataCenter");
// let GameMenuController = require('GameMenuController');


let winsize = cc.winSize;
const BaseHeight =  winsize.height/2;
const BaseWidth =  winsize.width/2;
const GameHeight = 514;
const GameCenterY = 360;
const BaseGame = 257 ;

cc.Class({
    extends:cc.Component,

    properties:{
        gameNode:cc.Node,
        camera: cc.Camera,
        BlockBig:cc.Prefab,
        BlockSmall:cc.Prefab,
        MarginsBig:cc.Prefab,
        MarginsSmall:cc.Prefab,
        UIBottom:cc.Prefab,
        Sky:cc.Node,
        Bgbz:cc.Node,
        Underground:cc.Node,
        motionStreak: cc.MotionStreak,
        // hammer: sp.Skeleton,
        boxSpine:sp.Skeleton,
        btnbox:cc.Button,
        // GameMenuController: GameMenuController,
        language:{
            visible: false,
            default:"English" 
        },
        hard:{
            visible : true,
            default:5
        },
        myinfo:{
            visible : true,
            default:null
        },
        type:{
            visible : false,
            default:0
        },
        floorNum:{
            visible:false,
            default:5
        },
        rowNum:{
            visible:false,
            default:5
        },
        blockWidth:100,
        blockBlank:{
            visible:false,
            default:0
        },
        moveNum:{
            visible:false,
            default:0
        },
        margins:{
            visible:false,
            default:0
        },
        curMaxLine:{
            visible: false,
            default:0
        },
        canTouch:{
            visible:false,
            default:true
        },
        previousPt:{
            visible:false,
            default:null
        },
        Hatting:{
            visible:false,
            default:false
        },
        HattingPos:{
            visible: false,
            default:null
        }
    },


    onLoad:function () {
        SpriteFrameCenter.preLoadAtlas("png/box",this.initdata.bind(this));
        this.GameMenuController = cc.find("GameMenu").getComponent("GameMenuController");
        this.blocks = [];
        this.marginlist=[];
        this.hammers=[];
        this.startPos = -GameHeight/2;
        // this.sm.on('stop',      this.smCallback,        this);
        // this.hammer.setCompleteListener(trackEntry => {
        //     var animationName = trackEntry.animation ? trackEntry.animation.name : "";
        //     cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        //     this.hammer.node.active = false;
        //       this.smCallback(this.hammer);
        // });
         this.boxSpine.node.active = false;
        this.boxSpine.setCompleteListener(trackEntry => {
            var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
             this.restart();
            this.boxSpine.node.active = false;

        });
    },
    playBoxSpine:function () {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
    },
    stopBoxSpine:function () {
        this.boxSpine.node.active = false;
    },
    playHammerSpine:function (hammer) {

         hammer.node.active = true;
         hammer.setAnimation(0, "newAnimation", true);
    },
    stopHammerSpine:function (hammer) {
        hammer.node.active = false;
    },
    changeHammerSpine:function(data){
        // this.hammer.node.active = false;
        this.hammer.skeletonData = data;
    },
    start:function(){
        // this.initdata();
        this.myinfo = JSON.parse(cc.sys.localStorage.getItem('myinfo'));
        if(this.myinfo == null){
            this.myinfo ={hard:1,level:1,gold:1,gem:1,exp:1,hammer:[]};
        }
        this.myinfo ={hard:1,level:1,gold:1,gem:1,exp:1,hammer:[{"id":1,"attribute":101},{"id":2,"attribute":201},{"id":3,"attribute":301},{"id":4,"attribute":401}]};
        cc.sys.localStorage.setItem('myinfo',JSON.stringify(this.myinfo));
        this.hard = this.myinfo["hard"];
        this.GameMenuController.initInfo(this.myinfo);

    },
    restart:function(){
        this.hard++;
        this.myinfo.hard++;
        this.myinfo.gold+=1000;
        this.initdata();
    },
    initdata:function(){
        this.floorNum=StageConfig[this.hard].layer;
        for (var i = 0;i<BlockConfig.length;i++){
            if(BlockConfig[i].blockwidth == StageConfig[this.hard].size){
                this.type = BlockConfig[i].type;
                break;
            }
        }
        this.rowNum=BlockConfig[this.type].count;
        this.blockWidth=BlockConfig[this.type].blockwidth;
        this.blockBlank=BlockConfig[this.type].blank;
        this.margins=BlockConfig[this.type].margins;

        this.addBlocks();
        this.cameraStartPosY();
        // this.setSmPosition(this.hammer);
        this.GameMenuController.addUIBottom();

        // this.playHammers(this.hammer);
        this.btnbox.node.active = true;
        for(let i=0;i<this.hammers.length;i++){
            let node = this.hammers[i];
            node.destroy();
        }
        this.hammers=[];
        let timescale=1;
        for(let i=0;i<this.myinfo.hammer.length;i++){
            let node = this.myinfo.hammer[i];
            if(node != null){
                node = new  cc.Node();
                let hammer = node.addComponent(sp.Skeleton);
                let info = ToolConfig[i+1];
                let animation = info.animation;
                SkeletonDataCenter.addSkeletonData(animation,hammer) ;
                this.gameNode.addChild(node);
                this.hammers.push(hammer);
                hammer.setCompleteListener(trackEntry => {
                    var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                    cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
                    hammer.node.active = false;
                    this.setSmPosition(hammer);
                    this.smCallback(hammer);
                });
                timescale*=0.9;
                hammer.timeScale = timescale;


            }
        }
    },
    resetMarginList:function(){
        if(this.marginlist.length>0){
            for(let i=0 ;i<this.marginlist.length;i++){
                let node = this.marginlist[i];
                if(cc.isValid(node)){
                    node.destroy();
                }
            }
        }
        this.marginlist=[];
    },
    resetBlockList:function(){
        if(this.blocks.length>0){
            for(let i=0 ;i<this.blocks.length;i++){
                for( let j=0;j<this.blocks[i].length;j++){
                    let node = this.blocks[i][j];
                    if(cc.isValid(node)){
                        node.destroy();
                    }
                }
            }
        }
        this.blocks=[];
    },
    //--------- block -----------------------
    addBlocks:function() {

        this.resetBlockList();
        this.resetMarginList();
        for (var i =0;i< this.floorNum-1;i++){

            var lineinfo=this.addLines(this.getPngName(StageConfig[this.hard].cycleID,i),i);

            this.blocks.push(lineinfo);
            lineinfo=[];
        }
        let topline = this.addLines(StageConfig[this.hard].top,i);
        this.blocks.push(topline);
    },
    addLines:function (pngname,thisNum) {

        let conf=BlockConfig[this.type];
        let count = conf.count;
        let factory= this.type == 0?BlockBigFactory:BlockSmallFactory;
        let curX= conf.margins+conf.blank -BaseWidth;
        let curY= thisNum*(this.blockWidth+conf.blank) + this.startPos;
        let lineArray=[];
        let left = factory.createMargins(pngname);

        left.position = cc.p(conf.margins/2-BaseWidth,curY+this.blockWidth/2);
        this.gameNode.addChild(left);
        this.marginlist.push(left);
        let right = factory.createMargins(pngname);
        let endpos = BaseWidth- conf.margins/2;
        right.position = cc.p(endpos,curY+this.blockWidth/2);
        this.gameNode.addChild(right);
        this.marginlist.push(right);

        for(var i=0;i<count;i++){
            let node = factory.create(pngname);
            node.position = cc.p(curX+this.blockWidth/2,curY+this.blockWidth/2);
            curX+=this.blockWidth+conf.blank;
            this.gameNode.addChild(node);
            lineArray.push(node);
        }

        return lineArray;
    },

    //根据 获得 图片的名字
    getPngName(cycleID,thisNum){
        let thisID;
        if(cycleID.indexOf(";") != -1){
            let cycleArry = cycleID.split(";");
            let getnum=GameUtils.randomInt(0,cycleArry.length-1);
            thisID=cycleArry[getnum];
        }else{
            thisID=parseInt(cycleID);
        }
        let neednumber=0;
        for(var i =1;i<=10 ;i++)
        {
            if(CycleConfig[thisID]["num"+i] == 0){
                i=0;
                continue;
            }
            neednumber+=CycleConfig[thisID]["num"+i];
            if(neednumber>=thisNum){
                return CycleConfig[thisID]["block"+i]
            }
            if(i==10){
                i=0;
            }
        }
    },
    //销毁砖块
    destroyBlock:function(line,row ){

        if(!this.blocks[line])
            return;
        let node = this.blocks[line][row];
        if(cc.isValid(node) ) {
            node.destroy();
            this.destroyUpdate();
        }

    },
    checkCanDestroy :function(line,row){
        if(!cc.isValid(this.blocks[line]) || !cc.isValid(this.blocks[line][row]) )
            return false;
        if(line >= this.floorNum-1)
            return true;
        let node;
        node = this.blocks[line+1][row];
        if(!cc.isValid(node)){
            return true;
        }
        if(line>0){
            node = this.blocks[line-1][row];
            if(!cc.isValid(node)){
                return true;
            }
        }
        if(row>0 && row <this.rowNum-1){
            node = this.blocks[line][row-1];
            if(!cc.isValid(node)){
                return true;
            }
            node = this.blocks[line][row+1];
            if(!cc.isValid(node)){
                return true;
            }
        }else if (row == 0){
            node = this.blocks[line][row+1];
            if(!cc.isValid(node)){
                return true;
            }
        }else if(row == this.rowNum-1){
            node = this.blocks[line][row-1];
            if(!cc.isValid(node)) {
                return true;
            }
        }
        return false;
    },
    destroyUpdate:function(){
        this.myinfo.exp++;
        cc.sys.localStorage.setItem('myinfo',JSON.stringify(this.myinfo));
        this.GameMenuController.updateDate({exp:this.myinfo.exp});

    },
    //--------- block -----------------------
    maxLineNum:function(){
        var max=0;
        for(var i=0;i<this.floorNum;i++){
            for(var j= 0;j<this.rowNum;j++) {
                if (this.blocks && this.blocks[i] && this.blocks[i][j]) {
                    var node = this.blocks[i][j];
                    if (!cc.isValid(node))
                        continue;
                    if (i > max) {
                        max = i;
                    }
                    break;
                }
            }
        }
        return max;
    },

    totoalRowNum:function(line) {//line 行拥有点的数量
        var max = 0;
        for(var j= 0;j<this.rowNum;j++){
            var node = this.blocks[line][j];
            if(!cc.isValid(node) )
                continue;
            max++;
        }
        return max;
    },

    //************camera 相关设置 start **********************
    cameraCentPosY:function(){

        let maxline=this.maxLineNum();
        if(this.curMaxLine<= maxline){
            return;
        }
        let move = this.curMaxLine-maxline;
        this.curMaxLine=maxline;
        let oldY = this.camera.node.getPositionY();
        if(oldY<=GameCenterY){
            return;
        }
        let newY= oldY-this.blockWidth*move;
        if(newY>=GameCenterY){
            this.camera.node.setPositionY(newY);
        }else {
            this.camera.node.setPositionY(GameCenterY);
        }

    },

    cameraStartPosY:function(){
        let height = this.floorNum*(this.blockWidth+this.blockBlank);
        //地下
        this.Underground.height=height;
        let posbottom= (height-GameHeight)/2;
        this.Underground.y=posbottom;
        //地面
        let totoal= this.Bgbz.height+height -50;
        let skyposy;
        let bzYbottom;
        let other = GameHeight- totoal;
        bzYbottom= (totoal+height - GameHeight)/2 -25;
        this.Bgbz.y=bzYbottom;
        if(other>0){
            this.Sky.active = true;
            this.Sky.height = other+10;
            skyposy= (GameHeight - other)/2;
            this.Sky.y=skyposy;
            this.camera.node.setPositionY(GameCenterY);
        }else{
            this.Sky.active = false;
            this.camera.node.setPositionY(GameCenterY - other);

        }
        this.curMaxLine = this.floorNum -1;
    },


    //************camera 相关设置 end **********************
    //*********** 锤子 相关设置  start***************
    setSmPosition:function(hammer){
        let realwidth=this.blockWidth+this.blockBlank;
        let maxline = this.curMaxLine;
        let maxrow = this.totoalRowNum(0);
        if(maxline == 0 && maxrow ==   0)
        {
            this.HattingPos =null;
            // this.sm.node.visible = false;
            hammer.node.active = false;
            return ;
        }
        hammer.node.active = true;
        let range = this.geScreenRange();
        // let line = GameUtils.randomInt(range.min,range.max);
         let line = this.curMaxLine;
        let find = false;
        let canclick=[];
        for(var i = 0;i<this.rowNum;i++){
            if(this.blocks[line]&&this.checkCanDestroy(line,i) ){
                canclick.push(i);

            }
        }

       let num = GameUtils.randomInt(0,canclick.length-1);
        let row= canclick[num];

        let location = this.hammerpos(line,row);
        let texiao=this.getEffByBlock(line,row);
        ParticleSystemCenter.addParticleForNode(texiao+".plist",this.GameMenuController.node,location);
        this.HattingPos ={x:line,y:row};
       hammer.node.position=location;
        this.playHammerSpine(hammer);
    },
    //根据小块的位置 过的特效文件
    getEffByBlock(line,row){

        let type = this.type == 0? "BlockBig":"BlockSmall";
        let node = this.blocks[line][row].getComponent(type);
        return node.getPngId();
    },
    geScreenRange : function(){
        let max = this.curMaxLine;
        let cameraPosY = this.camera.node.getPositionY();
        let min=0;
        let realwidth=this.blockWidth+this.blockBlank;
        if(cameraPosY <= BaseHeight){
            min =0;
        }else{
            let maxPosY= max*realwidth;
            let canshowy = (maxPosY - cameraPosY+BaseHeight)/realwidth;
            min = Math.floor(max- canshowy);
        }
        return {max:max,min:min};
    },
    //根据块的位置计算锤子的位置
    hammerpos:function(line,row){
        let cameraY= this.camera.node.getPositionY();
        let gameY = this.gameNode.y;
        let realwidth=this.blockWidth+this.blockBlank;
        let realx = row * realwidth+this.margins+this.blockBlank;
        let realy = line * realwidth+gameY -cameraY -BaseGame;
        let hamX= realx - BaseWidth + 42+this.blockWidth;
        let hamY = realy - 42;
        return cc.p(hamX,hamY);

    },
    smCallback:function(hammer){
        if(this.HattingPos != null){
            let y= this.HattingPos.y;
            let x= this.HattingPos.x;
            if(cc.isValid(this.blocks[x][y])){
                // this.blocks[x][y].destroy();
                this.destroyBlock(x,y);
            }
            this.cameraCentPosY();
             this.setSmPosition(hammer);
        }
    },
    //*********** 锤子 相关设置  end*****************

    updateTouch:function(point){
        let cameraY= this.camera.node.getPositionY();
        let gameY = this.gameNode.y;
        let realwidth=this.blockWidth+this.blockBlank;
        var line = Math.floor((point.y-(gameY-cameraY+BaseHeight - BaseGame))/realwidth);
        var row = Math.floor((point.x-this.margins - this.blockBlank)/realwidth);
        if(this.checkCanDestroy(line,row)){
            let location = this.hammerpos(line,row);
            let texiao=this.getEffByBlock(line,row);
            ParticleSystemCenter.addParticleForNode(texiao+".plist",this.GameMenuController.node,location);
            this.destroyBlock(line,row);
        }
    },
    touchStartCallBack:function (location) {
        if(!this.canTouch){
            return;
        }
        if(location.x<this.margins || location.x >(2*BaseWidth-this.margins)){
            this.motionStreak.reset();
            return;
        }
        console.log("touchStartCallBack");
        this.previousPt = location;
        this.motionStreak.node.setPositionX(location.x);
        this.motionStreak.node.setPositionY(location.y);
        this.motionStreak.reset();
        // this.isTouching = false;
    },

    touchCancelCallBack:function (location) {
        this.updateTouch(location);
        this.isTouching = false;
        this.motionStreak.reset();
    },

    touchEndCallBack:function (location) {
        // this.touchPosition(location);
        this.updateTouch(location);
        this.isTouching = false;
        console.log("touchEndCallBack");
         this.motionStreak.reset();
    },
    touchMoveCallBack:function (location) {
        if(location.x<this.margins || location.x >(2*BaseWidth-this.margins
        || location.y<216 )){
            this.motionStreak.reset();
            return;
        }
        this.updateTouch(location);
        this.previousPt = location;
        this.motionStreak.node.setPositionX(location.x);
        this.motionStreak.node.setPositionY(location.y);
    },

    onClickTreasure:function(event){
        var maxlinenum= this.maxLineNum();
        var totoalRowNum= this.totoalRowNum(0);
        if(maxlinenum != 0  || totoalRowNum != 0){
            this.touchEndPoint = event.getLocation();

            this.updateTouch(this.touchEndPoint);
            return;
        }
        this.btnbox.node.active = false;
        this.playBoxSpine();
    },
    update:function(){
        this.cameraCentPosY();
    }
});