/**
 * Created by Administrator on 2017/7/2.
 */
var DustObj = function () {
    this.x = [];
    this.y = [];
    this.amp = [];//振幅
    this.NO = [];//第几张图片
    this.alpha = '';
}
DustObj.prototype.num = 30;
DustObj.prototype.init = function () {
    for(var i = 0;i<this.num;i++){
        this.x[i] = Math.random()*canWidth;
        this.y[i] = Math.random()*canHeight;
        this.amp[i] = 20+Math.random()*25;
        this.NO[i] = Math.floor(Math.random()*7);//图片序号是0~6
    }
    this.alpha = 0;
}
DustObj.prototype.draw = function() {
    this.alpha += delTime*0.0008;//角度的变化
    var l = Math.sin(this.alpha);//幅度的变化
    for(var i = 0;i<this.num;i++){
        var no = this.NO[i];
        ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]+this.amp[i]*l);
    }
}