const Bucket = require('./bucket.js');
let bucket = new Bucket.LinkedList();

class HashMap {

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

    set(key, value) {
        const loadCapacity = Math.floor(0.75 * this.buckets.length)
        if (this.length() > loadCapacity) {
            this.grow();
        }
        const hashCode = this.hash(key);
        const obj = {key: key, value: value};
        const index = hashCode % this.buckets.length;
        if (this.buckets[index]) {
            return this.buckets[index].append(obj);
        }
        const bucket = new Bucket.LinkedList();
        bucket.append(obj);
        this.buckets[index] = bucket;
    }

    grow() {
        const keyPairs = this.entries();
        this.buckets = new Array(this.length() * 2).fill(null);
        keyPairs.map((pairs) => {
            this.set(pairs[0], pairs[1]);
        })
    }

    get(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;
        console.log(`index: ${index}`)
        if (!this.buckets[index]) return null;
        if (this.buckets[index].size() > 0) {
            let list = this.buckets[index].head
            while (list) {
                if (list.value.key === key) return list.value.value;
                list = list.next;
            }
        }
        return null
    }

    has(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;
        if (!this.buckets[index]) return false;
        if (this.buckets[index].size() > 0) {
            let list = this.buckets[index].head
            while (list) {
                if (list.value.key === key) return true;
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
                if (list.value.key === key) {
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
                keys.push(list.value.key);
                list = list.next;
            }
        }
        return keys
    }

    entries() {
        let keyPairs = [];
        for (let i = 0; i < this.buckets.length; i ++) {
            if (this.buckets[i] === null) continue;
            let list = this.buckets[i].head;
            while (list) {
                keyPairs.push([list.value.key, list.value.value]);
                list = list.next;
            }
        }
        return keyPairs
    }

    print() {
        console.log(this.buckets)
    }

}
// let b = bucket.append(5)
let c = new HashMap();
c.set('name', 'John Doe');
c.set('age', '30');
c.set('city', 'New York');
c.set('occupation', 'Software Engineer');
c.set('hobby', 'Photography');
c.set('favoriteFood', 'Pizza');
c.set('language', 'JavaScript');
// c.set('framework', 'React');
// c.set('editor', 'Visual Studio Code');
// c.set('operatingSystem', 'Windows');
// c.set('country', 'USA');
// c.set('favoriteColor', 'Blue');
// c.set('car', 'Tesla Model 3');
// c.set('music', 'Classical');
// c.set('book', 'To Kill a Mockingbird');
// c.set('movie', 'Inception');
// c.set('sport', 'Soccer');
// c.set('pet', 'Dog');
// c.set('drink', 'Coffee');
// c.set('game', 'Chess');
// c.set('phone', 'iPhone');
// c.set('laptop', 'MacBook Pro');
// c.set('exercise', 'Running');
// c.set('season', 'Fall');
// c.set('tvShow', 'Stranger Things');
// c.set('superhero', 'Spider-Man');
// c.set('snack', 'Chocolate');
// c.set('dessert', 'Ice Cream');
// c.set('holiday', 'Christmas');
// c.set('languageSpoken', 'English');


// let n = c.remove('operatingSystem')
// console.log(n);
let l = c.entries();
console.log(l)
c.print()
