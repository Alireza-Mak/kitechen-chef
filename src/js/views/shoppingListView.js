/** @format */

import { elements } from './base';

// Render items of the current recipe in shopping List
export const renderItem = (item) => {
  const html = `            
<li class="list-group-item bg-light shopping__item py-3 px-0" data-itemid=${item.id}>
  <div class="d-flex justify-content-between align-items-center row-hl">
    <div class="item-hl">
      <div class="shopping__count">
        <input class="shopping__input" type="number" id="quantity" min="0" value="${item.quantity}" step="${item.quantity}"/>
        <div class="d-inline">${item.unit}</div>
      </div>
    </div>
    <div class="item-hl shopping__description">${item.text}</div>
    <button class="item-hl shopping__delete ml-3 btn-tiny"> 
      <svg>
        <use href="img/icons.svg#icon-circle-with-cross"></use>
      </svg>
    </button>
  </div>
</li>`;
  elements.shoppingList.insertAdjacentHTML('beforeend', html);
};

// Delete items of shopping List

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemId="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};
