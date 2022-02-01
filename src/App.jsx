import { Component } from 'react';

import ApiService from './services/ApiService';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Spinner from './components/Loader';
import Modal from './components/Modal';

import styles from './App.module.scss';

class App extends Component {
  state = {
    images: [],
    pageNumber: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
    error: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      images: [],
      pageNumber: 1,
      searchQuery: query.trim(),
      error: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, pageNumber } = this.state;
    const arg = { searchQuery, pageNumber };
    if (!searchQuery) return;

    this.setState({ isLoading: true });

    ApiService(arg)
      .then(({ hits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          pageNumber: prevState.pageNumber + 1,
          total: hits.length,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  // fetchImages = async () => {
  //   try {
  //     const { searchQuery, pageNumber } = this.state;
  //     const arg = { searchQuery, pageNumber };

  //     if (!searchQuery) {
  //       return;
  //     }

  //     this.setState({ isLoading: true });

  //     const { hits } = await ApiService(arg);
  //     console.log(hits);

  //     this.setState(prevState => ({
  //       images: [...prevState.images, ...hits],
  //       pageNumber: prevState.pageNumber + 1,
  //     }));

  //     if (pageNumber !== 1) {
  //       this.scrollToLoadButton();
  //     }

  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

  toggleModal = () => {
    this.setState({ largeImage: '', showModal: false });
  };

  openModal = largeImageURL => {
    this.setState({ largeImage: largeImageURL, showModal: true });
  };

  render() {
    const { images, isLoading, showModal, largeImage, error, total } =
      this.state;

    const showLoadMoreButton = images.length !== 0 && !isLoading && total > 0;

    console.log(showLoadMoreButton);

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <p>Произошла ошибка ...</p>}

        <ImageGallery images={images} onImageClick={this.openModal} />

        {showLoadMoreButton && <Button onClickButton={this.fetchImages} />}

        {isLoading && <Spinner />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

// fetchImages = async () => {
//   try {
//     const { searchQuery, pageNumber } = this.state;
//     const arg = { searchQuery, pageNumber };

//     if (!searchQuery) {
//       return;
//     }

//     this.setState({ isLoading: true });

//     const { hits } = await ApiService(arg);
//     console.log(hits);

//     this.setState(prevState => ({
//       images: [...prevState.images, ...hits],
//       pageNumber: prevState.pageNumber + 1,
//     }));

//     if (pageNumber !== 1) {
//       this.scrollToLoadButton();
//     }

//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   } catch (error) {
//     this.setState({ error });
//   } finally {
//     this.setState({ isLoading: false });
//   }
// };
