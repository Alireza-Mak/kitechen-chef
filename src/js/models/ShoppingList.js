/** @format */
import uniqid from 'uniqid';

export default class ShoppingList {
  constructor() {
    this.items = [];
  }

  // Add item to the list of items
  addItem(quantity, unit, text) {
    const item = {
      quantity,
      unit,
      text,
      id: uniqid(),
    };
    this.items.push(item);
    return item;
  }

  // Update the Item
  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
  }
  // Update Items
  updateQuantity(id, newQuanity) {
    this.items.find((el) => el.id === id).quantity = newQuanity;
  }
}
