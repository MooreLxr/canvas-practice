/**
 * Created by Administrator on 2017/6/30.
 */
function AneObj () {
    this.rootx = [];/*存放海葵位置变量*/
    this.headx = [];/*存放海葵的不同高度*/
    this.heady = [];
    this.alpha = 0;
    this.amp = [];
}
AneObj.prototype.num = 50;
AneObj.prototype.init = function () {
    for(var i = 0;i<this.num;i++){
        this.rootx[i] = i*16 + Math.random()*20;//海葵根部x坐标
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight-220 + Math.random()*40;
        this.amp [i] = Math.random()*50+50;//摆动幅度
    }
}
AneObj.prototype.draw = function () {
    this.alpha += delTime*0.0008;//控制摆动的速度
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;/*设置透明度*/
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i] = this.rootx[i]+l * this.amp[i]
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
}