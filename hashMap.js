const Bucket = require('./bucket.js');
let bucket = new Bucket.LinkedList();

class HashMap {

    constructor() {
        this.buckets = new Array(10);
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
        let hashCode = this.hash(key);
        let obj = {key: key, value: value};
        let index = hashCode % this.buckets.length;
        console.log(`index: ${index}`)
        if (this.buckets[index]) {
            console.log(this.buckets[index])
            return this.buckets[index].append(obj);
        }
        let bucket = new Bucket.LinkedList();
        bucket.append(obj);
        this.buckets[index] = bucket;
    }

    get(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.buckets.length;
        if (!this.buckets[index]) return null;
        if (this.buckets[index].size() > 0) {
            let list = this.buckets[index].head
            while (list) {
                if (list.value.key === key) return list.value.value;
                list = list.next;
            }
        }
    }

    has(key) {
        let hashCode = this.hash(key);
        let index = this.buckets.findIndex((key) => {
            return key.key === hashCode;
        })
        if (index >= 0) return true;
        return false;
    }

    remove(key) {
        let hashCode = this.hash(key);
        let index = this.buckets.findIndex((key) => {
            return key.key === hashCode;
        })
        if (index >= 0) {
            this.buckets.splice(index, 1);
            return true;
        }
        return false;
    }

    length() {
        return this.buckets.length;
    }

    clear() {
        return this.buckets = [];
    }

    keys() {
        let keys = [];
        this.buckets.map((key) => {
            let bucket = key.bucket.head;
            keys.push(bucket.value.key);
        })
        return(keys);
    }

    entries() {
        let keys = [];
        this.buckets.map((key) => {
            let bucket = key.bucket.head;
            keys.push([bucket.value.key, bucket.value.value]);
        })
        return(keys);
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
c.set('framework', 'React');
c.set('editor', 'Visual Studio Code');
c.set('operatingSystem', 'Windows');

c.print()

let n = c.get('editor')
console.log(n);
// console.log(c.clear())
