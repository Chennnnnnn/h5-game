export default class grade {
    constructor (node) {
        this.number = 0;
        this.node = node;
    }
    setGrade (num) {
        this.number = num;
        this.node.innerText = `${this.number}`
    }
    addGrade (num) {
        this.number += num;
        this.node.innerText = `${this.number}`
        console.log(this.number)
    }
} 