/**
 * Created by Administrator on 2017/6/28.
 */
document.body.onload=game;
var can1;
var can2;
var ctx1;
var ctx2;

var canWidth;
var canHeight;
var lastTime;
var delTime;/*时间差*/
var bgpic = new Image();
var ane;
var fruit;
var fishMom;
/*定义鼠标的变量*/
var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;
var dust;
var dustPic = [];
function game() {
    init();
    lastTime = Date.now();
    delTime = 0;
    gameloop();
}
function init() {
    //画布1,获取画布，getContext()为画布设置画笔
    can1 = document.getElementById('canvas1');//fish,dust,ui,circle
    ctx1 = can1.getContext('2d');/*获取上下文环境*/
    //画布2
    can2 = document.getElementById('canvas2');//background, ane,fruit
    ctx2 = can2.getContext('2d');

    bgpic.src = "./pic/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new AneObj();
    ane.init();

    fruit = new FruitObj();
    fruit.init();

    fishMom = new FishMomObj();
    fishMom.init();

    fishBaby = new BabyFishObj();
    fishBaby.init();

    mx = canWidth/2;
    my = canHeight/2;
    /*为鼠标添加监听事件*/
    can1.addEventListener("mousemove",onMouseMove,false);

    for(var i = 0;i<8;i++){
        babyTail[i] = new Image();
        babyTail[i].src="./pic/babyTail"+i+".png";/*指定8张小鱼尾巴数组*/
    }
    for(var j=0;j<2;j++){
        babyEye[j] = new Image();
        babyEye[j].src = "./pic/babyEye"+j+".png";
    }
    for(var t = 0; t<20; t++){
        babyBody[t] = new Image();
        babyBody[t].src = "./pic/babyFade"+t+".png";
    }

    for(var m = 0;m<8;m++){
        momTail[m] = new Image();
        momTail[m].src = "./pic/bigTail"+m+".png";
    }
    for(var n = 0;n<2;n++){
        momEye[n] = new Image();
        momEye[n].src = "./pic/bigEye"+n+".png";
    }
    for(var s = 0;s<8;s++){
        momBodyOrange[s] = new Image();
        momBodyBlue[s] = new Image();
        momBodyOrange[s].src = "./pic/bigSwim"+s+".png";
        momBodyBlue[s].src = "./pic/bigSwimBlue"+s+".png";
    }
    data = new DataObj();
    ctx1.font = "20px verdana";
    ctx1.textAlign = "center";

    for(var l = 0;l<7;l++){
        dustPic[l] = new Image();
        dustPic[l].src = "./pic/dust"+l+".png";
    }
    dust = new DustObj();//声明对象
    dust.init();

}
/*动态刷新页面*/
function gameloop() {
    requestAnimFrame(gameloop);//使用该函数导致每帧图片的间隔不一样
    var now = Date.now();
    delTime = now-lastTime;
    lastTime = now;
    if(delTime>40){delTime = 40;}/*加上该句的判断可防止因为帧与帧时间间隔差很大而导致食物特别大*/

    drawbg();/*注意函数定义完一定要调用*/
    ane.draw();/*画海葵*/
    fruitMonitor();
    fruit.draw();
    fruit.dead();
    ctx1.clearRect(0,0,canWidth,canHeight);/*将整个画布清空*/
    fishMom.draw();
    fishBaby.draw();
    momFishCollisionFood();
    momBabyCollision();
    data.draw();
    dust.draw();

}
function onMouseMove(e) {
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mx = e.offSetX == undefined ? e.layerX: e.offSetX;
            my = e.offSetY == undefined ? e.layerY: e.offSetY;
        }
    }
}