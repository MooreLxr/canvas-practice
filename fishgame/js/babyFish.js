/**
 * Created by Administrator on 2017/6/30.
 */
var BabyFishObj = function () {
    this.x = '';
    this.y = '';
    this.angle = '';

    this.babyToilTimer = 0;//设置定时器，指定时间时更换刷新鱼尾巴
    this.babyToilCount = 0;//进入哪一张鱼尾巴图片
    this.babyEyeTimer = 0;//
    this.babyEyeCount = 0;//
    this.babyEyeInterval = 1000;//当前图片持续的时间
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}
BabyFishObj.prototype.init = function() {
    //定义小鱼的位置，初始时候在画布中间，与鱼妈妈间隔50px的距离
    this.x = canWidth/2-30;
    this.y = canHeight/2+30;
    this.angle = 0;
}
BabyFishObj.prototype.draw = function() {
    /*小鱼随着大鱼游动*/
    this.x = lerpDistance(fishMom.x,this.x,0.98);/*0.98是移动的速度*/
    this.y = lerpDistance(fishMom.y,this.y,0.98);/*0.98是移动的速度*/
    /*角度差Math.atan2(y,x)*/
    var deltaY = fishMom.y-this.y;/*高度差为鼠标的高度-当前鱼的高度*/
    var deltaX = fishMom.x-this.x;
    var bata = Math.atan2(deltaY,deltaX);
    //lerpAngle(aim,cur,radio)，使当前角度不断趋近了bata
    this.angle = lerpAngle(bata,this.angle,0.6);

    //定时刷新鱼尾巴
    this.babyToilTimer += delTime;
    if(this.babyToilTimer > 50){/*时间到，则切换下一张鱼尾巴图片*/
        this.babyToilCount = (this.babyToilCount+1)%8;//使得每次图片都是在babyTail0~7间循环
        this.babyToilTimer %= 50;//时间复原复原
    }
    //定时刷新鱼眼睛
    this.babyEyeTimer += delTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount+1)%2;/*为了使它在0~1循环*/
        this.babyEyeTimer %= this.babyEyeInterval;//把定时器归零

        //设置睁着眼睛的时间比闭着眼睛的时间长
        if(this.babyEyeCount == 0){//睁着眼睛时
            this.babyEyeInterval = Math.random() *1500 + 2000;
        }
        else{
            this.babyEyeInterval = 200;
        }
    }
    //定时刷新小鱼身体
    this.babyBodyTimer += delTime;
    if(this.babyBodyTimer > 400){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 400;//把定时器归零
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;//此时小鱼身体完全变白
            //游戏结束
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyToilCount;
    var babyEyeCount = this.babyEyeCount;
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width/2+23,-babyTail[babyTailCount].height/2);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width/2,-babyBody[babyBodyCount].height/2);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width/2,-babyEye[babyEyeCount].height/2);
    ctx1.restore();


}