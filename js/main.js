import {
    requestAnimFrame
} from './common'
import apple from './apple';
import banana from './banana';
import Basket from './basket';
import Grade from './grade';
import appleImg from '../img/apple.png';
import bananaImg from '../img/banana.png';

let lastTime = new Date();
let fruits = [];
let basket = new Basket(document.getElementById('basket'));
let grade = new Grade(document.getElementById('grade').childNodes[0]);
let time = 30;
let appleCount = 0;
// 设置分值
let success = 28 * 3;
let state = true;


// 生成苹果并加入到dom中，然后增加style.margintop
const product = (fruitName) => {
    // console.log(++appleCount);
    const isApple = fruitName === 'apple' ? true : false;
    let fruitNode = document.createElement('img');
    fruitNode.src = isApple ? appleImg : bananaImg;
    let fruitObj = {};
    // 随机的横坐标
    let x = Math.random() * 70;
    fruitObj = isApple ? new apple(x, 0) : new banana(x, 0);
    //根据对象生成Node节点
    fruitNode.style.top = 0 + 'vh';
    fruitNode.style.left = x + 'vw';
    document.getElementById('fruit').appendChild(fruitNode);
    fruitObj.node = fruitNode;
    fruitObj.setY(-5);
    fruits.push(fruitObj);
}

//修改水果高度
const dropFruit = (fruitObj) => {
    let now = Date.now();
    let deltaTime = now - fruitObj.lastTime;
    fruitObj.lastTime = now;
    fruitObj.setY(fruitObj.y + deltaTime / 20);
}

//整体水果下降,产生新水果，回收水果
const dropAll = () => {
    if(state) {
        let now = Date.now();
        let deltaTime = now - lastTime;
        if (deltaTime > 800) {
            product('apple');
            lastTime = now;
        } 
        requestAnimFrame(dropAll);
        fruits.map((fruitObj) => {
            fruitObj.y < 75 ? dropFruit(fruitObj) : recycle(fruitObj);

        })
    }
    // 判断是否与篮子的x位置相同，有则计分
}


// 回收下降水果 
const recycle = (fruitObj) => {
    computed(fruitObj);
    let i = fruits.indexOf(fruitObj);
    fruits.splice(i, 1);
    document.getElementById('fruit').removeChild(fruitObj.node);
    fruitObj = null; //待验证，释放内存
    // console.log(fruits)
}

//判断是否有入框的
const computed = (fruitObj) => {
    let x = fruitObj.x;
    basket.left < x && basket.right > x ? grade.addGrade(3):'';
}


class Touch {
    constructor() {
        this.touchstartX = 0;
        // this.touchstartY = 0;
        this.touchendX = 0;
        // this.touchendY = 0;
    }
    handleTouchstart (e)  {
        this.touchstartX = e.targetTouches[0].pageX;
    }
    handleTouchmove  (e) {
        let moveX = (e.targetTouches[0].pageX - this.touchstartX) /20;
        // console.log(moveX)
        basket.setX(basket.marginLeft + moveX)
        // console.log('move')
    }
    
}

let touch = new Touch();

const startGame = () => {
    document.addEventListener('touchstart',touch.handleTouchstart, true);
    document.addEventListener('touchmove',touch.handleTouchmove,true);
    //点击右侧篮子右边滑动
    // 点击左侧，篮子左边活动
    document.addEventListener('click',function(e){
        let middleX = document.body.clientWidth / 2 ;
        // console.log(middleX)
        e.pageX > middleX ? basket.setX(basket.marginLeft + 5) : basket.setX(basket.marginLeft - 5);
    })
    const timer = setInterval(function(){
        if(time>0){
            time--;
            document.getElementById('time').childNodes[0].innerText = time;
        } else {
            state = false;
            clearInterval(timer);
            const resultNode = document.getElementById('result')
            resultNode.innerHTML = `<h1>${getResult()}</h1>`;
            resultNode.style.top = 0;
        }  
    },1000)
    dropAll();
}


document.getElementById('start').addEventListener('click',function(e){
    e.target.parentNode.style.display = 'none';
    startGame();
})


// 判断结果
const getResult = () => {
    if(grade.number < success){
        return '恭喜你，挑战成功\(^o^)/~'
    } else {
        return '非常遗憾挑战失败'
    }
}

// 更改生成apple的方式，回收利用
// 使用感应API
// 设置时间
// 添加香蕉
//优化css布局
//待完善，调整下降速度
// 音乐图标旋转
// fastclick

