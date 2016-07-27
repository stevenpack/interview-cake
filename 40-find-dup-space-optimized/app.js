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

    //lower range
    let n = arr.length - 1;
    let lowerStart = 0;
    let lowerEnd = parseInt(n / 2);

    //upper range
    let upperStart = parseInt(n / 2) + 1;
    let upperEnd = arr.length - 1;

    let attempt = 0;

    //Should always be less iterations than elements
    while (attempt < n) {

      //TODO: perf: this runs unecessarily right at the end
      //How many times do numbers appear in each range?
      let counts = this.getRangeCounts(arr, lowerStart, lowerEnd, upperStart, upperEnd);
      let lowerCount = counts[0];
      let upperCount = counts[1];

      //Down to 1 number,what's the result?
      if (lowerCount == 0 && upperCount > 0) {
        assert.equal(upperStart, upperEnd, "Assuming the range is down to 1 at this point");
        return upperStart;
      }
      if (upperCount == 0 && lowerCount > 0) {
        assert.equal(lowerStart, lowerEnd, "Assuming the range is down to 1 at this point");
        return lowerStart;
      }

      console.log(`lowerCount=${lowerCount} upperCount=${upperCount}`);

      //OK, is it in the upper or lower?
      let inUpperRange = upperCount > lowerCount;
      let inLowerRange = lowerCount > upperCount;
      if (lowerCount == upperCount) {
        //Equal counts, so it's in the smaller one;
        let lowerSize = lowerEnd - lowerStart;
        let upperSize = upperEnd - upperStart;

        inUpperRange = upperSize < lowerSize;
        inLowerRange = lowerSize < upperSize;

        assert.notEqual(lowerSize, upperSize, "did not expect equal size ranges if there was equal counts. implies array is not following N+1");
      }

      //Cut in half again
      if (inUpperRange ){
        console.log("in upper range");
        lowerStart = upperStart;
        lowerEnd = lowerStart + parseInt(((upperEnd - lowerStart) / 2));

        upperStart = lowerEnd + 1;
        //upperEnd = upperEnd;
      } else if (inLowerRange) {
        console.log("in lower range");
        let tmpRange1End = lowerEnd;
        //lowerStart = lowerStart;
        lowerEnd = lowerStart + (parseInt((lowerEnd - lowerStart) / 2));
        upperStart = lowerEnd + 1;
        upperEnd = tmpRange1End;
      } 
      attempt += 1;
      console.log("Iteration: " + attempt);
    }
    return -1;
  }



  getRangeCounts(arr, lowerStart, lowerEnd, upperStart, upperEnd) {
    let lowerCount = 0;
    let upperCount = 0;
    console.log(`Searching ${lowerStart}..${lowerEnd} and ${upperStart}..${upperEnd}`);
    for (let item of arr) {
      //in range 1?
      if (this.inBetween(item, lowerStart, lowerEnd)) {
        lowerCount += 1;
      }
      //in range 2?
      else if (this.inBetween(item, upperStart, upperEnd)) {
        upperCount += 1;
      }
      //otherwise ignored
    }
    return [lowerCount, upperCount];
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
