import React, { useState, useEffect } from 'react';
import Spinner from './components/Loader';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './components/Button';

import Modal from './components/Modal';
import { fetchApi } from './services/Api';

function App() {
  const [photos, setPhoto] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  useEffect(() => {
    function fetchPictures() {
      setIsLoading(true);
      fetchApi(searchQuery, page)
        .then(photos => {
          if (photos.length < 12) {
            setShowLoadMoreBtn(false);
            toast('no more pictures ');
            return;
          }
          setPhoto(prev => [...prev, ...filterPictures(photos)]);
          setShowLoadMoreBtn(true);
        })
        .catch(error => toast.error(error.message))
        .finally(() => {
          setIsLoading(false);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
    if (searchQuery) {
      fetchPictures();
    }
  }, [searchQuery, page]);
  function handleFormSubmit(query) {
    setSearchQuery(query);
    setPage(1);
    setPhoto([]);
  }
  function filterPictures(pictures) {
    const array = pictures.map(({ id, webformatURL, user, largeImageURL }) => {
      return { id, webformatURL, user, largeImageURL };
    });
    return array;
  }
  function handleLoadMoreBtnClick() {
    setPage(prev => prev + 1);
  }
  function handleModalOpen(img) {
    setLargeImageUrl(img);
  }
  function handleModalClose() {
    setLargeImageUrl('');
  }
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery photos={photos} onModalOpen={handleModalOpen} />
      {showLoadMoreBtn && <Button onClick={handleLoadMoreBtnClick} />}
      {isLoading && <Spinner />}
      {largeImageUrl && (
        <Modal largeImageUrl={largeImageUrl} onModalClose={handleModalClose} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
