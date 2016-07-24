class App {

    permutations(str) {
        console.log("Generating permutations for: " + str);
        let set = new Set();
        this.permutateRecursive(str, 0, set);
        return set;
    }
    permutateRecursive(str, index, set) {

        //First time through
        if (index === 0) {
            set.add(str[0]);
            this.permutateRecursive(str, index + 1, set);
            return;
        }

        //We're finished
        if (index >= str.length ) {
            return;
        }

        //Add the next letter to every permutation we already have
        console.log(`new recursion at index ${index}`);
        let lastCharForIndex = str[index];

        let newPerms = [];
        for (let perm of set) {
            for (var pos = 0; pos <= perm.length; pos++) {
                let permWithExtraChar = this.insertCharAt(perm, pos, lastCharForIndex);
                console.log(`Adding ${permWithExtraChar}`);
                newPerms.push(permWithExtraChar);
            }
        }
        set.clear();
        App.addToSet(set, newPerms);

        this.permutateRecursive(str, index + 1, set);
    }

    static addToSet(set, items) {
        for (let item of items) {
            set.add(item)
        }
    }

    /**
     * Inserts char at position pos in str
     * @param str
     * @param pos
     * @param char
     * @returns {string}
     */
    insertCharAt(str, pos, char) {
        console.log(`Inserting '${char}' in \"${str}\" at ${pos}`);
        return str.substr(0,pos) + char + str.slice(pos, str.length);
    }

    switchChars(str, index1, index2) {
        let chars = str.split('');
        let tmp = chars[index1];
        chars[index1] = chars[index2];
        console.log(`Switching ${tmp} <-> ${chars[index2]} in ${str}`);
        chars[index2] = tmp;
        return chars.join("");
    }
}
var app = new App();
module.exports = app;
