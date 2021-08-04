/**
 * Created by Administrator on 2017/6/30.
 */
/*通过判断大鱼与食物的距离，小于某个值则判为吃掉食物*/
function momFishCollisionFood() {
    /*先判断食物的状态再计算鱼和食物的距离*/
    if(!data.gameOver){
        for (var i = 0; i < fruit.num; i++) {
            if(fruit.alive[i]){
                //计算鱼与食物的距离
                var l = calLength2(fruit.x[i],fruit.y[i], fishMom.x, fishMom.y);
                if(l<900){
                    //平方值小于900，则食物被吃掉
                    fruit.dead(i);
                    data.fruitNum++;
                    fishMom.momBodyCount++;
                    if(fishMom.momBodyCount>7){
                        fishMom.momBodyCount =7;
                    }
                    if(fruit.fruitType[i] == "blue"){//如果吃到蓝果实，则数量加倍
                        data.double = 2;
                    }
                }
            }
        }
    }
}

//通过判断小鱼和鱼妈妈的距离来判断大鱼是否给小鱼喂食了
function momBabyCollision() {
    if(data.fruitNum > 0 && !data.gameOver){//大鱼必须吃到果实并且游戏为结束时对小鱼的碰撞才有效
        var cal = calLength2(fishMom.x,fishMom.y,fishBaby.x,fishBaby.y);
        if(cal <900){
            //小鱼恢复生命值
            fishBaby.babyBodyCount = 0;//小鱼身体变红
            fishMom.momBodyCount = 0;//当大鱼碰到小鱼时身体变白
            data.addScore();//大鱼碰到小鱼时加载分值
        }
    }

}