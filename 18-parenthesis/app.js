

class App {
    hello() {
        return 1;
    }

    findMatching(pos, str) {
        let openCount = 0;
        let strPos = 0;
        for (var i = pos; i < str.length; i++) {
            let char = str[i];
            strPos = i;
            if (char === '(') {
                openCount += 1;
            }
            if (char === ')') {
                openCount -= 1;
            }
            if (openCount === 0) {
                break;
            }
        }
        return strPos;
    }

}
var app = new App();

module.exports = app;