export default class apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = this.__proto__.constructor.name;
        this.node = {};
        this.lastTime = Date.now();
    }
    moveY(y) {
        this.y += y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
        // this.node.style.transform = 'translateY('+y+'vh)';
        this.node.style.transform = 'translate3d(0,'+ y + 'vh,0)';
    }
}

// class语法尚不支持共用属性的写法
apple.prototype.grade = 10;

// y = { 0,75 vh}
// x = { 4, 96vw}