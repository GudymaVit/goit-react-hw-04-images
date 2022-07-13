import React, { Component } from 'react';
import ApiReuest from './api';
import SearchBar from './searchbar';
import Loader from './loader';
import ImageGallery from './imageGallery';
import Button from './button';
import Modal from './modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    largeImageURL: '',
    tag: '',
    status: 'idle',
    isModalShow: false,
  };

  searchApi = new ApiReuest();

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      try {
        this.setState({ status: 'pending' });
        await this.searchApi.fetchSearch(page, searchQuery).then(res => {
          const images = res.data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          if (images.length === 0) {
            this.setState({ status: 'rejected' });
            alert(`Can't find ${searchQuery} images`);
          } else {
            this.setState(state => ({
              images: [...state.images, ...images],
              status: 'resolve',
            }));
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  }

  handleFormSubmt = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };
  handleButtonClick = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalShow: !prevState.isModalShow,
    }));
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  render() {
    const { searchQuery, images, status, largeImageURL, tags, isModalShow } =
      this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmt} />
        {status === 'idle' && <h2>Enter to search</h2>}
        {status === 'pending' && <Loader />}
        {status === 'resolve' && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {status === 'rejected' && <h3>Could not find photo: {searchQuery}</h3>}
        {status === 'resolve' && <Button onClick={this.handleButtonClick} />}

        {isModalShow && largeImageURL && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
export default App;
