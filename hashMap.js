const Bucket = require('./bucket.js');
let bucket = new Bucket.LinkedList();

class HashMap {

    constructor() {
        this.buckets = [];
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    set(key, value) {
        let hashCode = this.hash(key);
        let obj = {key: key, value: value};
        let index;
        if (this.buckets.length === 0) {
            let bucket = new Bucket.LinkedList();
            bucket.append(obj);
            this.buckets.push({key: hashCode, bucket});
            return this.buckets;
        } 
        index = this.buckets.findIndex((key) => {
            return key.key === hashCode;
        })
        // console.log(`index: ${index}`)
        if (index >= 0) {
            this.buckets[index].bucket.append(obj);
            return this.buckets;
        }
        let bucket = new Bucket.LinkedList();
        bucket.append(obj);
        this.buckets.push({key: hashCode, bucket});
        return this.buckets;
    }

    get(key) {
        let hashCode = this.hash(key);
        let index = this.buckets.findIndex((key) => {
            return key.key === hashCode;
        })
        if (index < 0) return null;
        
        let list = this.buckets[index].bucket.head
        console.log(list)
        let string = `${list.value.value}`;
        while (list.next !== null) {
            string += ` -> ${list.next.value.value}`;
            list = list.next;
        }
        return string += ` -> ${null}`;
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
c.set('h', 's');
c.set('j', 's');
c.set('h', 's');
c.set('l', 's');
c.set('j', 's');
c.set('k', 'y');
c.set('h', 's');
c.set('k', 'y');
c.set('k', 'y');
c.print()
let n = c.entries()
console.log(n);
// console.log(c.clear())
