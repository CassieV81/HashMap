const Bucket = require('./bucket.js');

class HashSet {

    constructor() {
        this.buckets = new Array(10).fill(null);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 17;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    add(key) {
        const loadCapacity = Math.floor(0.75 * this.buckets.length)
        if (this.length() > loadCapacity) {
            this.grow();
        }
        const hashCode = this.hash(key);
        const index = hashCode % this.buckets.length;
        if (this.buckets[index] !== null) {
            if (this.has(key)) this.remove(key);
            if (this.buckets[index]) return this.buckets[index].append(key);
        }
        const bucket = new Bucket.LinkedList();
        bucket.append(key);
        this.buckets[index] = bucket;
    }

    grow() {
        const keyPairs = this.keys();
        this.buckets = new Array(this.length() * 2).fill(null);
        keyPairs.map((pairs) => {
            this.add(pairs);
        })
    }

    has(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;
        if (!this.buckets[index]) return false;
        if (this.buckets[index].size() > 0) {
            let list = this.buckets[index].head
            while (list) {
                if (list.value === key) return true;
                list = list.next;
            }
        }
        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;
        if (!this.buckets[index]) return false;
        if (this.buckets[index].size() > 1) {
            let list = this.buckets[index].head;
            let idx = 0;
            while (list) {
                if (list.value === key) {
                    this.buckets[index].removeAt(idx);
                    return true;
                };
                idx += 1;
                list = list.next;
            }
        } else {
            this.buckets[index] = null;
            return true;
        }
        return false;
    }

    length() {
        let counter = 0;
        this.buckets.map((element) => {
            if (element !== null) {
                counter += 1;
            }
        })
        return counter;
    }

    clear() {
        return this.buckets = new Array(10).fill(null);
    }

    keys() {
        let keys = [];
        for (let i = 0; i < this.buckets.length; i ++) {
            if (this.buckets[i] === null) continue;
            let list = this.buckets[i].head;
            while (list) {
                keys.push(list.value);
                list = list.next;
            }
        }
        return keys
    }

    print() {
        console.log(this.buckets)
    }

}

let set = new HashSet();

// Adding unique elements
console.log("Adding elements:");
set.add('John Doe');
set.add('30');
set.add('New York');
set.add('Software Engineer');
set.add('Photography');
set.add('Pizza');
set.add('JavaScript');
set.add('React');
set.add('Visual Studio Code');
set.add('Windows');
set.add('USA');
set.add('Blue');
set.add('Tesla Model 3');
set.add('Classical');
set.add('To Kill a Mockingbird');
set.add('Inception');
set.add('Soccer');
set.add('Dog');
set.add('Coffee');
set.add('Chess');


console.log("Lenght of buckets", set.length());
set.add('30');
console.log("Lenght of buckets", set.length());
console.log("Has 'New York':", set.has('New York'))
console.log("Has 'Nonexistent Item':", set.has('Nonexistent Item'))
console.log("Lenght of buckets", set.length());
set.remove('New York');
console.log("Has 'New York' after removal:", set.has('New York')); 
set.print();
set.clear();
set.print();

for (let i = 0; i < 20; i++) {
    set.add(`Item ${i}`);
}
set.print();

console.log(set.keys())

