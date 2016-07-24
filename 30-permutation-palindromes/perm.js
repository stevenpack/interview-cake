/**
 * Created by steve on 12/07/2016.
 */
class PermutationChecker {

    check(str) {
        console.log(`Checking '${str}'`);

        //if odd number, even numbers of letters and 1 odd number
        //if even, even numbers.

        let charTable = {};
        let chars = str.split("");
        for (var i = 0; i < chars.length; i++) {
            this.upsert(chars[i], charTable);
        }
        console.log(charTable);
        if (str.length % 2 == 0) {
            return this.countOdds(charTable) == 0;
        } else {
            return this.countOdds(charTable) == 1;
        }
    }

    countOdds(charTable) {
        let odds = 0;
        for (let key in charTable) {
            if (charTable[key] % 2 != 0) {
                odds += 1;
            }
        }
        console.log("odds=" + odds);
        return odds;
    }

    upsert(char, charTable) {
        if (!charTable[char]) {
            charTable[char] = 0;
        }
        charTable[char] += 1;
    }

    reverse(str) {
        let arr = str.split("");
        let reverseArr = arr.reverse();
        let reverseStr = reverseArr.join("");
        return reverseStr;
    }

    match(str1,str2) {
        console.log(`${str1}===${str2}`);
        return str1 === str2;
    }
}

/**
 * Quick way to exercise code. Replaced in other solutions using yeoman testable-js with mocha
 */
class TestRunner {
    static run() {
        TestRunner.test1();
        TestRunner.test2();
        TestRunner.test3();
        TestRunner.test4();
        TestRunner.test5();
    }

    static test1() {
        let p = new PermutationChecker();
        console.log(p.check("civic"));
    }

    static test2() {
        let p = new PermutationChecker();
        console.log(p.check("ivicc"));
    }

    static test3() {
        let p = new PermutationChecker();
        console.log(p.check("civil"));
    }

    static test4() {
        let p = new PermutationChecker();
        console.log(p.check("livci"));
    }

    static test5() {
        let p = new PermutationChecker();
        console.log(p.check("AAAAxbbbxAAAA"));
    }
}

TestRunner.run();
