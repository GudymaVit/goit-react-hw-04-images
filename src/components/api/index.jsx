import axios from 'axios';
const API_KEY = '27264986-7652febb8acf881c536036047';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiReuest {
  // constructor() {
  //   this.searchQuery = '';
  //   this.page = 1;
  // }
  async fetchSearch(page, searchQuery) {
    const option = new URLSearchParams({
      key: API_KEY,
      q: `${searchQuery}`,
      page: `${page}`,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
    });

    return await axios.get(`${BASE_URL}?${option}`);
  }
}
