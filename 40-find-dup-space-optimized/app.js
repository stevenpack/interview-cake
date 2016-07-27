"use strict";
class App {

  /**
   * 3rd cut, union splitting from hints
   * @param arr
     */
  findFirstDupeNonDestructive(arr) {

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
