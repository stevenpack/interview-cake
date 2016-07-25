class App {
  hello() {
    return "hello";
  }
}
class Queue {

  constructor() {
    this.primary = [];
    this.tmp = [];
  }

  enqueue(item) {
    this.primary.push(item);
    console.log("this.primary.length=" + this.primary.length);
  };

  dequeue() {
    if (this.primary.length === 0) {
      return null;
    }

    if (this.primary.length === 1) {
      return this.primary.pop();
    }

    //move to tmp
    for (let i = 0; i < this.primary.length; i++) {
      let item = this.primary.pop();
      this.tmp.push(item);
      console.log(`Moved ${item} from primary -> tmp`)
    }
    console.log(`Post move to temp: primary.length = ${this.primary.length} and tmp.length=${this.tmp.length}`);

    //pop
    let firstItem = this.primary.pop();
    console.log("Popped from primary: " + firstItem);

    //move back to primary
    let tmpLength = this.tmp.length;
    for (let i = 0; i < tmpLength; i++) {
      let item  = this.tmp.pop();
      this.primary.push(item);
      console.log(`Moved ${item} from tmp -> primary`)
    }
    console.log(`Post move back to primary: primary.length = ${this.primary.length}) and tmp.length=${this.tmp.length}`);

    return firstItem;
  };
}
module.exports.App = App;
module.exports.Queue = Queue;
