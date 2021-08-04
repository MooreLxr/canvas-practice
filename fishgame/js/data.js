/**
 * Created by Administrator on 2017/7/1.
 */
var DataObj = function () {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0;
}
DataObj .prototype.reset = function() {
    this.fruitNum = 0;
    this.double = 1;
}
DataObj.prototype.draw = function() {
    var w = can1.width;
    var h = can1.height;

    ctx1.save();
    ctx1.fillStyle = "white";
    ctx1.shadowBlur = 15;
    ctx1.shadowColor = "white";
    ctx1.fillText("SCORE: "+this.score,w/2,h-30);
    if(this.gameOver){
        this.alpha += delTime*0.0005;
        if(this.alpha == 1){
            this.alpha =1;
        }
        ctx1.fillStyle = "Rgba(255,255,255," + this.alpha +")";
        ctx1.fillText("GAME OVER",w*0.5,h*0.5);
    }
    ctx1.restore();
}
//计算分值
DataObj.prototype.addScore = function(){
    this.score += this.fruitNum*100*this.double;
    this.reset();
}