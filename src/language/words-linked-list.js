const LinkedList = function() {
  const self = this;

  const Node = function(value, next) {
    this.value = value;
    this.next = next;
  };

  let first;
  let head;

  self.insert = (value) => {
    const node = new Node(value, null);
    if (!first) {
      first = head = node;
    } else {
      let current = first
      while (current.next) {
        current = current.next;
      };
      current.next = node;
    };
  };

  self.show = () => {
    if (!head) {
      return head;
    }
    return head.value;
  };

  self.findByID = (id) => {
    let current = first;
    while (current) {
      if (current.value.id === id) {
        return current.value;
      };
      current = current.next;
    };
    return null;
  };

  self.showAll = () => {
    let current = first;
    while (current) {
      console.log(current);
      current = current.next;
    }
  };

  return self;
}

module.exports = LinkedList;