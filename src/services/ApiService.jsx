import axios from 'axios';

const apiKey = '24355682-9ff8d18cf689b459b447658d3';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const ApiService = async ({ searchQuery, pageNumber }) => {
  const response = await axios.get(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&per_page=$12&key=${apiKey}&page=${pageNumber}`,
  );

  const data = await response;
  return data.data;
};

export default ApiService;
