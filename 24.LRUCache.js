class LRUCache {
    constructor(capacity) {
        this.map = new Object();
        this.size = 0; // to track the total number of items which should not be more than capacity
        this.store = new DoublyLinkedList();
        this.capacity = capacity; // max size of the cache
    }
    get(key) {
        // if key is not present 
        if (!this.map[key]) {
            return -1;
        }
        // if key is present , remove the node from its position and put it at the tail as most recently used
        const targetNode = this.map[key];
        targetNode.remove();
        this.map[targetNode.key] = this.store.append(targetNode.key, targetNode.val);
        return targetNode.val;
    }
    put(key, val) {
        // if the node is present in cache
        if (this.map[key]) {
            const targetNode = this.map[key];
            targetNode.remove();
            this.size -= 1;
        }
        // in either case, a new node is created and put as the most recently used at the tail
        const newNode = this.store.append(key, val);
        this.map[key] = newNode;
        this.size += 1;
        if (this.size > this.capacity) {
            const firstNode = this.store.removeFirst(); // remove the least recently used
            delete this.map[firstNode.key];
            this.size -= 1;
        }
    }
}



// Creating a node class of doubly LL
class ListNode {
    constructor(key = null, val = null) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
    remove() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.prev = null;
        this.next = null;
    }
}


// Creating a doubly linked list
class DoublyLinkedList {
    constructor() {
        this.head = new ListNode();
        this.tail = new ListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    append(key, val) {
        const newNode = new ListNode(key, val);
        const lastNode = this.tail.prev;

        lastNode.next = newNode;
        newNode.prev = lastNode;

        this.tail.prev = newNode;
        newNode.next = this.tail;

        return newNode;
    }
    removeFirst() {
        const firstNode = this.head.next;
        firstNode.remove();
        return firstNode;
    }
}



