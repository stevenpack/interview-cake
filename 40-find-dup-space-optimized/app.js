"use strict";
var assert = require('chai').assert;

class App {

  /**
   * 3rd cut, union splitting from hints
   *
   * array contains elements in the range 1..n with 1 or more dupes.
   * So, if the range of possiblities is split in half to 1..n/2 and n/2+1..n, then whichever is greater will have
   * the dupe.
   *
   * e.g. n=5 and arr of 1,2,3,4,1
   * range 1 = 1..2
   * range 2 = 2..4
   * count up the range 1 = 3 ( 2 instances of 1's and 1 instance of 2)
   * count up the range 2 = 2 (1 instance of 3 and 1 instance 4)
   * So, now we can restrict our search to just 1..2. Split that into two and we quickly see it's 1
   *
   *
   * @param arr
     */
  findFirstDupeNonDestructive(arr) {

    console.log(arr);

    let n = arr.length - 1;
    let range1Start = 0;
    let range1End = parseInt(n / 2);

    let range2Start = parseInt(n / 2) + 1;
    let range2End = arr.length - 1;

    let attempt = 0;

    //Should always be less iterations than elements
    while (attempt < n) {

      let range1Count = 0;
      let range2Count = 0;

      console.log(`Searching ${range1Start}..${range1End} and ${range2Start}..${range2End}`);
      for (let item of arr) {
        //in range 1?
        if (this.inBetween(item, range1Start, range1End)) {
          range1Count += 1;
        }
        //in range 2?
        else if (this.inBetween(item, range2Start, range2End)) {
          range2Count += 1;
        } else {
          console.log(`item ${item} not in either range`)
        }
      }

      //Down to 1 number
      if (range1Count == 0 && range2Count > 0) {
        assert.equal(range2Start, range2End, "Assuming the range is down to 1 at this point");
        return range2Start;
      }
      if (range2Count == 0 && range1Count > 0) {
        assert.equal(range1Start, range1End, "Assuming the range is down to 1 at this point");
        return range1Start;
      }

      console.log(`range1Count=${range1Count} range2Count=${range2Count}`);
      if (range2Count > range1Count) {
        console.log("in upper range");
        range1Start = range2Start;
        range1End = range1Start + parseInt(((range2End - range1Start) / 2));

        range2Start = range1End + 1;
        //range2End = range2End;
      } else if (range2Count < range1Count) {
        console.log("in lower range");

        let tmpRange1End = range1End;
        //range1Start = range1Start;
        range1End = range1Start + (parseInt((range1End - range1Start) / 2));
        range2Start = range1End + 1;
        range2End = tmpRange1End;
      } else {
        console.log("equal counts. what does this mean? it means it's in the smaller range.");

        let range1Size = range1End - range1Start;
        let range2Size = range2End - range2Start;

        if (range1Size < range2Size) {
          console.log("lower range");

          //TODO: COPY PASTE
          let tmpRange1End = range1End;
          //range1Start = range1Start;
          range1End = range1Start + (parseInt((range1End - range1Start) / 2));
          range2Start = range1End + 1;
          range2End = tmpRange1End;
        }
        if (range2Size < range1Size) {
          console.log("upper range");
          //TODO: COPY PASTE
          range1Start = range2Start;
          range1End = range1Start + parseInt(((range2End - range1Start) / 2));

          range2Start = range1End + 1;
          //range2End = range2End;
        }
        assert.notEqual(range1Size, range2Size, "did not expect equal size ranges if there was equal counts. implies array is not following rules");
      }
      attempt += 1;
      console.log("Iteration: " + attempt);
    }
    return -1;
  }

  inBetween(val, start, end) {
    return (val >= start) && (val <= end);
  }

  /**
   * 2nd cut, sort first, space optimized
   * @param arr
   * @returns {Array}
     */
  findDupesOpt(arr) {
    let sortedArr = this.sortInPlace(arr);
    let currentNumAdded = false;
    let currentNumSeen = false;
    let currentNum = -1;
    let dupes = [];
    for (let item of sortedArr) {
      if (item != currentNum) {
        currentNum = item;
        currentNumSeen = false;
        currentNumAdded = false;
        continue;
      }
      if (currentNumAdded) {
        continue;
      }
      dupes.push(currentNum);
      currentNumAdded = true;
    }
    console.log(dupes);
    return dupes;
  }

  sortInPlace(arr) {
    //javascript sort is in-place
    //but sorts by string by default
    return arr.sort((a,b) => a-b);
  }

  /**
   * First cut, naive impl.
   * @param arr
   * @returns {Array}
   */
  findDupes(arr) {
    let matches = [];
    let seen = new Set();
    for (let item of arr) {
      if (!seen.has(item)) {
        seen.add(item);
        continue;
      }
      if (!matches.includes(item)) {
        matches.push(item);
      }
    }
    return matches;
  }
}
var app = new App();
module.exports = app;
