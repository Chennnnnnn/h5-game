export default class basket {
    constructor(node) {
        this.marginLeft = 90;
        this.width = 20;
        this.height = 20;
        this.node = node;
        // 篮子的左右位置，用于判断是否得分
        this.left = this.marginLeft - 50;
        this.right = this.marginLeft + this.width - 50;
    }
    setX(x) {
        x > 130 ? this.marginLeft = 130 :
            x < 50 ? this.marginLeft = 50 : this.marginLeft = x;
        this.node.style.marginLeft = this.marginLeft + 'vw';
        this.left = this.marginLeft - 50;
        this.right = this.marginLeft + this.width - 50;
    }

}
//篮子的位置 x = {50vw , 130vw}