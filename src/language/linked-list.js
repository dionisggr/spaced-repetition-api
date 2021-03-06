class _Node {
  constructor(value, next = null) {
    (this.value = value), (this.next = next);
  }
}

class LinkedList {
  constructor(head) {
    this.head = head;
  }

  insertFirst(item) {
    if (!item) {
      return "No value to insert.";
    }
    let newNode = new _Node(item);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  insertLast(item) {
    if (!item) {
      return "No value to insert";
    }
    if (!this.head) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertAt(nthPos, itemToInsert) {
    if (!itemToInsert) {
      return "No value to insert.";
    }
    if (nthPos < 0) {
      throw Error("Position error.");
    }
    if (nthPos === 0 || !this.head) {
      this.insertFirst(itemToInsert);
    } else {
      const node = this._findNthElement(nthPos - 1);
      const newNode = new _Node(itemToInsert, node.next);
      node.next = newNode;
    }
  }

  _findNthElement(pos) {
    let node = this.head;
    for (let i = 0; i < pos; i++) {
      if (!node.next) {
        return node;
      } else {
        node = node.next;
      }
    }
    return node;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value.id === item.id) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let prevNode = this.head;
    while (currNode !== null && currNode.value.id !== item.id) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      throw Error("Item not found.");
    }
    prevNode.next = currNode.next;
  }

  find(id) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;
    while (currNode.value.id !== id) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
}

const list = new LinkedList();

module.exports = list;
