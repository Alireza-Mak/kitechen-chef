/** @format */

import { elements } from './base';
import {limitTitle} from './searchView'
/** @format */
export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikeMenu = (numLiked) => {
  elements.likesMenu.style.visibility = numLiked > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
  const html = `
  <a href="#${like.id}" class="likes__list item-hl p-4">
    <div class="d-flex flex-row justify-content-start align-items-center row-hl">
      <img class="item-hl rounded-circle mr-4" src="${like.image}" width="50" height="50" alt="Test"/>
      <div class="item-hl likes__data">
        <h4 class="likes__name text-primary font-weight-bold">${limitTitle(like.label,16)}
        </h4>
        <h5 class="likes__author text-secondary">${limitTitle(like.source,16)}</h5>
      </div>
    </div>
  </a>`;
  elements.likesResults.insertAdjacentHTML('beforeend', html);
};

export const deleteLike = (id) => {
  const el = document.querySelector(`.likes__list[href*="${id}"]`);
  if (el) {
    el.parentElement.removeChild(el);
  }
};
