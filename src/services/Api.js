import axios from 'axios';

const key = '24355682-9ff8d18cf689b459b447658d3';

const fetchApi = (query = '', page = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(({ data }) => data.hits.map(elem => elem));
};

export { fetchApi };
