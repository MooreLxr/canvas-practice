/**
 * Created by Administrator on 2017/6/30.
 */
var FruitObj = function() {
    this.alive = [];/*果实存活状态*/
    this.x = [];/*存放果实的x坐标*/
    this.y = [];/*存放果实的y坐标*/
    this.l = [];/*设置果实生长长度*/
    this.speed = [];/*设置果实上漂和生长的速度*/
    this.fruitType = [];/*果实类型：橙色，蓝色*/
    this.orange = new Image();
    this.blue = new Image();
    this.aneNo = [];
}
FruitObj.prototype.num = 30;

FruitObj.prototype.init = function() {
    for(var i = 0;i< this.num;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNo[i] = 0;
        this.speed[i] = Math.random()*0.02+0.01;/*设置果实的生长速度不一致*/
        this.fruitType[i] = '';
    }
    this.orange.src = "./pic/orange.png";
    this.blue.src = "./pic/blue.png";
}
FruitObj.prototype.draw = function () {
    for(var i = 0;i<this.num;i++){
        if(this.alive[i]){
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }
            else{
               pic = this.orange;
            }
           /*果实的大小<15则继续生长*/
            if(this.l[i]<=15){
                var no = this.aneNo[i];
                this.x[i] = ane.headx[no];
                this.y[i] = ane.heady[no];
                this.l[i] += this.speed[i]*delTime;/*果实慢慢变大，使动画更流畅*/
            }
            /*果实的大小>15则往生漂*/
            else{
                /*果实慢慢往上漂，高度不断减小*/
                this.y[i] -= this.speed[i]*7*delTime;
            }
            ctx2.drawImage(pic,this.x[i]-this.l[i]/2,this.y[i]-this.l[i]/2,this.l[i],this.l[i]);
            /*如果果实的高度<10,则让果实处于休眠状态*/
            if(this.y[i]<10){
                this.alive[i] = false;
            }
        }
    }
}
/*定义果实生长的位置*/
FruitObj.prototype.born = function (i) {
    this.aneNo[i] = Math.floor(Math.random()*ane.num);/*随机获取一个海葵*/
    this.l[i] = 0;
    this.alive[i] = true;
    /*通过随机数来确定产生的是蓝果实还是橙果实*/
    var ran = Math.random();
    if(ran<0.15){
        this.fruitType[i] = 'blue';
    }
    else{
        this.fruitType[i] = 'orange';
    }
}
//定义食物消失函数，食物被鱼吃掉后执行该函数
FruitObj.prototype.dead = function (i){
    this.alive[i] = false;
}
//统计果实数量，若<15个则让果实出生
function fruitMonitor() {
    var num = 0;
    for(var i =0;i<fruit.num;i++){
        if(fruit.alive[i]){num++;}
    }
    if(num<15){
        sendFruit();
    }
}
/*判断当前果实的状态,处于休眠态的果实即可出生*/
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {/*如果当前果实处于休眠状态，则让这个果实出生*/
            fruit.born(i);
            return;
        }
    }
}