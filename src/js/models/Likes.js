/** @format */

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, label, source, image) {
    const like = {
      id,
      label,
      source,
      image,
    };
    this.likes.push(like);

    // Add data in local storage
    this.addLikesToLocalStorage();
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
    // Add data in local storage
    this.addLikesToLocalStorage();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  addLikesToLocalStorage() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }
  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) {
      this.likes = storage;
    }
  }
}
