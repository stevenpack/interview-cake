class App {
  hello() {
    return "hello";
  }
}

class Rand {
    rand7() {

        //Simulate rand7 function that returns 1-7
        while (true) {
            var r = Math.random() * 10;
            if (r <= 7.999 && r >= 1.0) {
                return parseInt(r);
            }
        }
    }

    rand5() {
        let rand;
        do {
           rand = this.rand7();
        } while((rand < 0) || (rand > 5))

        return rand;
    }
};

module.exports.App = App;
module.exports.Rand = Rand;

