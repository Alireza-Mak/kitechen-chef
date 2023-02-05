/** @format */

import axios from 'axios';
import { app_id, app_key } from '../config';

// Create a search Class
export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `https://api.edamam.com/search?app_id=${app_id}&app_key=${app_key}&q=${this.query}`
      );
      this.results = res.data.hits;
    } catch (error) {
      console.log(error);
    }
  }
}
