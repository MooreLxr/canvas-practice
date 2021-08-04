/**
 * Created by Administrator on 2017/6/30.
 */
var FishMomObj = function () {
    this.x = [];
    this.y = [];
    this.angle = '';

    this.momToilTimer = 0;//设置定时器，指定时间时更换刷新鱼尾巴
    this.momToilCount = 0;//进入哪一张鱼尾巴图片
    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;//当前图片持续的时间
    this.momBodyCount = 0;

}
FishMomObj.prototype.init = function () {
    this.x =canWidth/2;
    this.y =canHeight/2;
    this.angle = 0;
}
FishMomObj.prototype.draw = function () {

    /*使大鱼跟着鼠标移动，lerpDistance(aim,cur,radio),设置物体随目标值移动*/
    this.x = lerpDistance(mx,this.x,0.98);
    this.y = lerpDistance(my,this.y,0.98);
    /*角度差Math.atan2(y,x)*/
    var deltaY = my-this.y;/*高度差为鼠标的高度-当前鱼的高度*/
    var deltax = mx-this.x;
    var bata = Math.atan2(deltaY,deltax);
    //lerpAngle(aim,cur,radio)，趋近函数
    this.angle = lerpAngle(bata,this.angle,0.6);

    //动态刷新鱼尾巴
    this.momToilTimer += delTime;
    if(this.momToilTimer > 50){
        this.momToilCount = (this.momToilCount+1)%8;/*0~7循环*/
        this.momToilTimer %= 50;
    }
    this.momEyeTimer += delTime;
    if(this.momEyeTimer > this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount+1)%2;
        this.momEyeTimer %= this.momEyeInterval;
        if(this.momEyeCount == 0){//如果大鱼眼睛闭着
            this.momEyeInterval = Math.random()*1500 + 2000;//把持续的时间变长
        }
        else{
            this.momEyeInterval = 200;
        }
    }


    ctx1.save();
    ctx1.translate(this.x,this.y);/*将坐标原点移到大鱼的身体处*/
    ctx1.rotate(this.angle);/*让大鱼随鼠标旋转*/

    var momToilCount = this.momToilCount;
    var momEyeCount = this.momEyeCount;
    var momBodyCount = this.momBodyCount;
    if(data.double ==1){//绘制橙色
        ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width/2,-momBodyOrange[momBodyCount].height/2);
    }
    else{
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width/2,-momBodyBlue[momBodyCount].height/2);
    }
    ctx1.drawImage(momTail[momToilCount],-momTail[momToilCount].width/2+30,-momTail[momToilCount].height/2);
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width/2,-momEye[momEyeCount].height/2);
    ctx1.restore();
}