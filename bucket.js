

class Node {
    constructor(value=null, next=null) {
        this.value = value;
        this.next = next;
    }
}
let node = new Node();
console.log(node);

class LinkedList {
    constructor() {
        this.head = null;
    }
    
    append(value) {
        let tail = null;
        if (this.head == null) {
            this.head = new Node(value);
        } else {
            tail = this.head;
            while (tail.next != null) {
                tail = tail.next;
            }
            tail.next = new Node(value);
        }
    }

    prepend(value) {
        if (this.head == null) {
            this.head = new Node(value);
        } else {
            let list = this.head;
            this.head = new Node(value, list);
        }
    }

    size() {
        let counter = 1;
        let list = this.head;
        while (list.next != null) {
            list = list.next;
            counter += 1;
        }
        return counter;
    }

    listHead() {
        return this.head;
    }

    tail() {
        let list = this.head;
        while (list) {
            if (list.next == null) {
                break;
            }
            list = list.next;
        }
        return list;
    }

    at(index) {
        let list = this.head;
        if (index >= this.length) return null;
        if (index === 0) return list;
        while (list) {
            if (index === 0) {
                break;
            }
            list = list.next;
            index -= 1;
        }
        return list;
    }

    pop() {
        let list = this.head;
        let popped;
        while (list) {
            if (list.next.next == null) {
                popped = list.next.value;
                list.next = null;
                break;
            }
            list = list.next;
        }
        return popped;
    }

    contains(value) {
        let list = this.head;
        let status = false;
        if (list.value === value) return true;
        while (list.next !== null) {
            if (list.next.value === value) {
                status = true;
            } 
            list = list.next;
        }
        return status;
    }

    find(value) {
        let index = 1;
        let list = this.head;
        if (list.value === value) return 0;
        while (list.next !== null) {
            if (list.next.value === value) break;
            if (list.next.value !== value && list.next.next === null) return null;
            index += 1;
            list = list.next;
        }
        return index;
    }

    toString() {
        let list = this.head;
        let string = `${list.value}`;
        while (list.next !== null) {
            string += ` -> ${list.next.value}`;
            list = list.next;
        }
        return string += ` -> ${null}`;
    }

    insertAt(value, index) {
        if (index >= this.size()) return this.append(value);
        let list = this.head;
        let tail = this.at(index);
        let values = [];
        let tailValues = [];
        this.head = null;
        if (index === 0) {
            return this.head = new Node(value, list);
        };
        while(list.next !== null) {
            if (list.value === tail.value) {
                break;
            }
            values.push(list.value);
            list = list.next
        }
        while(tail) {
            tailValues.push(tail.value);
            tail = tail.next
        }
        while(values.length) {
            this.append(values.shift())
            if (values.length === 0) {
                this.append(value);
            }
        }
        while(tailValues.length) {
            this.append(tailValues.shift())
        }
    }

    removeAt(index) {
        if (index >= this.size()) return null;
        let list = this.head;
        let tail = this.at(index);
        let values = [];
        let tailValues = [];
        this.head = null;
        if (index === 0) {
            let value = list.next.value;
            return this.head = new Node(value, list.next.next);
        };
        while(list.next !== null) {
            if (list.value === tail.value) {
                break;
            }
            values.push(list.value);
            list = list.next
        }
        while(tail) {
            tailValues.push(tail.value);
            tail = tail.next
        }
        while(values.length) {
            this.append(values.shift())
        }
        tailValues.shift()
        while(tailValues.length) {
            this.append(tailValues.shift())
        }
    }

}

module.exports = {LinkedList};