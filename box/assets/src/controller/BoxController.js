/**
 * Created by bing on 20/04/2018.
 */

//负责head展现和变换。
const CameraController = require('CameraController');
let StageConfig = require("StageConfig");
let BlockConfig = require("BoxConfig1");
let CycleConfig = require("CycleConfig");
let ToolConfig = require("ToolConfig");
let AttributeConfig = require("AttributeConfig");
let BoxConfig = require("BoxConfig");
let RewardConfig = require("RewardConfig");


let GameType = require("GameType");
let GameUtils = require("GameUtils");
let GameState = require("GameState");
let BlockBigFactory = require("BlockBigFactory");
let BlockSmallFactory = require("BlockSmallFactory");
let RewardItemFactory = require("RewardItemFactory");
let SpriteFrameCenter = require("SpriteFrameCenter");
let ParticleSystemCenter = require("ParticleSystemCenter");
let SkeletonDataCenter = require("SkeletonDataCenter");
// let GameMenuController = require('GameMenuController');

let Global = require('Global');


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
        RewardItem:cc.Prefab,
        UIBottom:cc.Prefab,
        Sky:cc.Node,
        Bgbz:cc.Node,
        Underground:cc.Node,
        motionStreak: cc.MotionStreak,
        // hammer: sp.Skeleton,
        boxSpine:sp.Skeleton,
        btnbox:cc.Button,
        GameMenu:cc.Node,
        treasure:cc.Button,
        upgradView:cc.Node,
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
        },
        gameState:GameState.init ,//0 init 1 playing 2 rolling 3 end
    },


    onLoad:function () {
        SpriteFrameCenter.preLoadAtlas("png/box",this.initdata.bind(this));
        this.GameMenuController = cc.find("GameMenu").getComponent("GameMenuController");
        Global.initInfo();
        this.blocks = [];
        this.marginlist=[];
        this.hammers={};
        this.rewardItem =[];
        this.startPos = -GameHeight/2;
        this.boxSpine.setCompleteListener(trackEntry => {
            var animationName1 = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("recordSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName1);
            // this.restart();
            this.addItems();

        });
        this.firstOpen = true;
    },
    playBoxSpine:function () {
        this.boxSpine.node.active = true;
        this.boxSpine.setAnimation(0, "newAnimation", false);
    },
    stopBoxSpine:function () {
        this.boxSpine.node.active = false;
    },
    playHammerSpine:function (hammerpos) {

        this.hammers[hammerpos].node.active = true;
        this.hammers[hammerpos].setAnimation(0, "newAnimation", true);
    },
    playHammers:function(){
        for( var i = 3 ;i< 7;i++){
            if(this.hammers[i] != undefined){
                this.setSmPosition(i);
            }
        }
    },
    stopHammerSpine:function (hammerpos) {
        this.hammers[hammerpos].node.active = false;
    },
    addHammer:function(id){
        let node = new  cc.Node();
        let hammer = node.addComponent(sp.Skeleton);
        let info = ToolConfig[id];
        let animation = info.animation;
        SkeletonDataCenter.addSkeletonData(animation,hammer) ;
        this.GameMenu.addChild(node);
        this.hammers[id]=hammer;
        hammer.node.active = false;
        hammer.setCompleteListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
            hammer.node.active = false;
            if(this.checkCanHammer(id)){
                this.smCallback(id);
            }
        });
        let conf = AttributeConfig[info.attribute];

        let  timescale = 0.17*conf.att/parseFloat(conf.time);
        hammer.timeScale = timescale;
    },
    changeHammerSpine:function(data){
        this.hammer.skeletonData = data;
    },
    start:function(){
        this.hard = Global.hard;
        this.GameMenuController.initInfo();
        this.hammers={};
        let timescale=1;
        let hammer = Global.hammer;
        for(let i=1;i<7;i++){
            if(hammer[i]  == undefined)
                continue;
            if(ToolConfig[i].id ==1 || ToolConfig[i].id ==2 )
                continue;
            let node = new  cc.Node();
            let nodehammer = node.addComponent(sp.Skeleton);
            let info = ToolConfig[i];
            let animation = info.animation;
            SkeletonDataCenter.addSkeletonData(animation,nodehammer) ;
            this.GameMenu.addChild(node);
            this.hammers[hammer[i].id]=nodehammer;
            nodehammer.node.active = false;
            nodehammer.setCompleteListener(trackEntry => {
                var animationName = trackEntry.animation ? trackEntry.animation.name : "";
                cc.log("HammerSpine [track %s][animation %s] end.", trackEntry.trackIndex, animationName);
                nodehammer.node.active = false;
                if(this.checkCanHammer(i)){
                    this.smCallback(i);
                }
            });
            let attribute = Global.hammer[i].attribute;
            let conf1 = AttributeConfig[attribute];
            hammer.timeScale = 0.17 * conf1.att/parseFloat(conf1.time);
        }

    },
    restart:function(){
        this.hard++;
        Global.hard++;
        this.boxSpine.node.active = false;
        for(let i=1;i<4;i++){
            // let node = this.rewardItem[i];
            this.rewardItem[i].destroy();
            // if(cc.isValid( node)){
            //     node.destroy();
            // }
        }
        this.rewardItem =[];
        // this.addItems();
        this.initdata();
        this.gameState = GameState.hatting;

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
        this.btnbox.node.active = true;
        this.playHammers();
        this.initTreasure();
        if(this.firstOpen){
            this.GameMenuController.addUIBottom();
            this.firstOpen= false;
        }

    },
    checkCanHammer :function(id){
        var hammer = Global.hammer;
        if(hammer[id] != undefined && hammer[id].attribute != -1)
            return true;
        return false;
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
        let location = this.hammerpos(line,row);
        let texiao=this.getEffByBlock(line,row);
        if(cc.isValid(node) ) {
            ParticleSystemCenter.addParticleForNode(texiao+".plist",this.GameMenuController.node,location);
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
        // this.myinfo.exp++;
        Global.exp++;
        // cc.sys.localStorage.setItem('myinfo',JSON.stringify(this.myinfo));
        Global.saveExp(Global.exp);
        this.GameMenuController.updateDate({exp: Global.exp});

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
    setSmPosition:function(hammerpos){
        let realwidth=this.blockWidth+this.blockBlank;
        let maxline = this.curMaxLine;
        let maxrow = this.totoalRowNum(0);
        if(maxline == 0 && maxrow ==   0)
        {
            this.HattingPos =null;
            // this.sm.node.visible = false;
            this.hammers[hammerpos].node.active = false;
            return ;
        }
        this.hammers[hammerpos].node.active = true;
        let range = this.geScreenRange();
        // let line = GameUtils.randomInt(range.min,range.max);
        let line = this.curMaxLine;
        let find = false;
        let canclick=[];
        for(var i = 0;i<this.rowNum;i++){//当前行可以删除的
            if(this.blocks[line]&&this.checkCanDestroy(line,i) ){
                let find = false;
                for(let j=1;j<=4;j++){
                    if( this.HattingPos && this.HattingPos[j]){
                        if(this.HattingPos[j].x == line && i ==this.HattingPos[j].y){
                            find= true;
                            break;
                        }
                    }
                }
                if(!find){
                    canclick.push(i);
                }
            }
        }

        if(canclick.length ==0 && line ==0){
            this.HattingPos[hammerpos] = null;
            return;
        }else if(canclick.length == 0){
            line= line-1;
            for(var i = 0;i<this.rowNum;i++){//当前行可以删除的
                if(this.blocks[line]&&this.checkCanDestroy(line,i) ){
                    let find = false;
                    for(let j=1;j<=4;j++){
                        if( this.HattingPos && this.HattingPos[j]){
                            if(this.HattingPos[j].x == line && i ==this.HattingPos[j].y){
                                find= true;
                                break;
                            }
                        }
                    }
                    if(!find){
                        canclick.push(i);
                    }
                }
            }
        }
        let num = GameUtils.randomInt(0,canclick.length-1);
        let row= canclick[num];

        let location = this.hammerpos(line,row);
        let texiao=this.getEffByBlock(line,row);
        // ParticleSystemCenter.addParticleForNode(texiao+".plist",this.GameMenuController.node,location);
        if(this.HattingPos == null){
            this.HattingPos= {};
        }
        this.HattingPos[hammerpos] ={x:line,y:row};
        this.hammers[hammerpos].node.position=location;
        this.playHammerSpine(hammerpos);
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
        let hamX= realx - BaseWidth - 42+this.blockWidth;
        let hamY = realy - 42;
        return cc.p(hamX,hamY);

    },
    smCallback:function(hammerpos){
        if(this.HattingPos != null && this.HattingPos[hammerpos]!=null ){
            let y= this.HattingPos[hammerpos].y;
            let x= this.HattingPos[hammerpos].x;
            if(cc.isValid(this.blocks[x][y])){
                // this.blocks[x][y].destroy();
                this.destroyBlock(x,y);
            }
            this.cameraCentPosY();
            this.setSmPosition(hammerpos);
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
            // ParticleSystemCenter.addParticleForNode(texiao+".plist",this.GameMenuController.node,location);
            this.destroyBlock(line,row);
        }
    },
    touchStartCallBack:function (location) {
        if(!this.canTouch){
            return;
        }
        if(this.gameState == GameState.end){
            this.restart();
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
        this.gameState = GameState.end;
        this.playBoxSpine();
    },
    update:function(){
        this.cameraCentPosY();
    },
    eventcallback: function(type, id) {
        // let node= this.itemList.indexOf(sender);
        switch (type) {
            case 0:
                break;
            case 1:
                // let info = ToolConfig[id];
                // let animation = info.animation;
                // // BoxController.changeHammerSpine(animation);
                // SkeletonDataCenter.addSkeletonData(animation, BoxController.changeHammerSpine);
                this.toolChange(id);
                break;
            case 2:
                break;
        }
    },
    toolChange:function(id) {
        let info = ToolConfig[id];
        // let animation = info.animation;
        // this.BoxController.changeHammerSpine(animation);
        // let node = this.BoxController.hammers[id-1];
        // SkeletonDataCenter.addSkeletonData(animation,node);

        if(Global.hammer[id] == undefined){
            let bool =this.checkCanAdd(id);
            if(bool) {
                Global.hammer[id] = {id: id, attribute: info.attribute};
                Global.saveHammer(Global.hammer);
                if(id != 1 && id !=2){
                    this.addHammer(id);
                    this.setSmPosition(id);
                }
            }else{
                this.addAdTime(id);
            }
            this.GameMenuController.updateButtom();
        }else{

            let conf = AttributeConfig[Global.hammer[id].attribute];
            let mess ={};

            if(conf.costtype = 1001){
                Global.gold -= conf.cost;
                mess['gold']=Global.gold;
            }else if(conf.costtype = 1002){
                Global.gem -= conf.cost;
                mess['gem']=Global.gem;
            }
            if(conf.next != -1){
                Global.hammer[id].attribute = conf.next;
                let conf1=AttributeConfig[conf.next];
                Global.saveHammer(Global.hammer);
                this.hammers[id].timeScale = 0.17*(conf1.att/parseFloat(conf1.time));
            }
            this.GameMenuController.updateDate(mess);
        }
    },
    checkCanAdd:function(id){
        let conf = ToolConfig[id];
        let thisID;
        let confArry;
        if(id == 1 || id == 2 )
            return false;
        if("unlock" in conf) {
            if (conf.unlock.indexOf(";") != -1) {
                confArry = conf.unlock.split(";");
                thisID = confArry[0];
            } else {
                thisID = parseInt(conf.unlock);
            }
            if (thisID == -1 ) {
                return true;
            }
            if(thisID == 0){//点击激活
                return true;
            }else if(thisID == 1){//视频激励
                 return Global.openAdTimes>0;
            }else if(thisID == 2){//等级激活
                let needlvl = confArry[1];
                if(Global.level<needlvl){
                    return false;
                }else{
                    return true;
                }

            }else if(thisID == 3){//邀请好友
                if( Global.inviteFriends< confArry[1])
                    return false;
                else
                    return true;
            }
        }
        return true;

    },
    addAdTime:function(id){
        let conf = ToolConfig[id];
        let thisID;
        let confArry;
        if(id == 1 || id == 2 )
            return;
        if("unlock" in conf) {
            if (conf.unlock.indexOf(";") != -1) {
                confArry = conf.unlock.split(";");
                thisID = confArry[0];
            } else {
                thisID = parseInt(conf.unlock);
            }
            if(thisID == 1){//视频激励
                return Global.openAdTimes++;
            }else if(thisID == 3){//邀请好友
                Global.inviteFriends++;
            }
        }
    },
    addItems:function(){

        let hard = Global.hard;
        let boxID = StageConfig[hard].box;
        let rewardID= BoxConfig[boxID].reward;
        let conf = RewardConfig[rewardID];
        let num = conf.num;
        let itemdata = {};
        let totoal=0;
        let reward ={};
        let max =0;
        for (let i =1;i<7;i++){
            if(conf['rate'+i] !=0){
                totoal=conf['rate'+i];
                if(i == 1){
                    itemdata[i] = totoal;
                    max = itemdata[i];
                }else{
                    itemdata[i] = itemdata[i-1] + totoal;
                    max = itemdata[i];
                }
            }
        }
        for (let j=1;j<=num;j++){
            let random= GameUtils.random(max);
            for(let z =1;itemdata[z] != undefined;z++){
                if(itemdata[z]<random){
                    continue;
                }
                reward[j]=conf['item'+z];
                break;
            }
        }
        let gold =0;
        let gem= 0;
        let str ="";
        for(let i=1; i<=num;i++){
            if(reward[i] != undefined){
                str+=reward[i]+"--";
                if(reward[i].indexOf(";") != -1){
                    let rewardarry = reward[i].split(";");
                    if(rewardarry[0] == 1001){
                        gold+=parseInt(rewardarry[1]);
                    }else if(rewardarry[0] == 1002){
                        gem+=parseInt(rewardarry[1]);
                    }
                }
            }
            this.createRewardItem(reward[i],i);
        }
        if(gold>0 || gem >0){
            let golds = Global.gold+gold;
            let gems = Global.gem+gem;
            this.GameMenuController.updateDate({gold:golds,gem:gems});
            Global.saveGold(golds);
            Global.saveGem(gems );
        }

    },
    initTreasure:function(){
        let BoxID = StageConfig[this.hard].box;
        let BoxConf = BoxConfig[BoxID];
        this.treasure.normalSprite = SpriteFrameCenter.getFrameFromAtlas("png/box",BoxConf.icon+".png");
        this.treasure.pressedSprite = SpriteFrameCenter.getFrameFromAtlas("png/box",BoxConf.icon+".png");
        this.treasure.hoverSprite = SpriteFrameCenter.getFrameFromAtlas("png/box",BoxConf.icon+".png");
        this.treasure.disabledSprite = SpriteFrameCenter.getFrameFromAtlas("png/box",BoxConf.icon+".png");
        let animation = BoxConf.animation+".json";
        SkeletonDataCenter.addSkeletonDataWait(animation,  this.boxSpine);
        this.treasure.node.y = - GameHeight/2+ this.blockWidth+35 -20;
        this.boxSpine.node.y = - GameHeight/2+ this.blockWidth+35 -20;

    },
    createRewardItem:function(reward,i){
        if(this.rewardItem[i]){
            this.rewardItem[i].destroy();
            this.rewardItem[i]=null;
        }
        let start = -400 +i*200;

        let node = RewardItemFactory.create(reward);
        let location = this.treasure.node.position;
        this.rewardItem[i]=(node);
        node.position = location;
        let action =cc. moveTo(0.5,cc.p(start,-20));
        let action2 = cc.callFunc(()=> {
            node.getComponent("RewardItem").setFinish();
        },this);
        // node.runAction(cc. moveTo(0.5,cc.p(start,-20)));
        this.gameNode.addChild(node);
        node.runAction(cc.sequence(action, action2));
    }
});
//