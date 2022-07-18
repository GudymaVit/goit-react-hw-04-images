import { useState, useEffect } from 'react';
import ApiReuest from '../api';
import SearchBar from './searchbar';
import Loader from './loader';
import ImageGallery from './imageGallery';
import Button from './button';
import Modal from './modal';
import * as Scroll from 'react-scroll';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('idle');
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    const searchApi = new ApiReuest();
    if (searchQuery === '') {
      return;
    }
    try {
      setStatus('pending');
      searchApi.fetchSearch(page, searchQuery).then(res => {
        const images = res.data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        if (images.length === 0) {
          setStatus('rejected');
          alert(`Can't find ${searchQuery} images`);
        } else {
          setImages(prevState => [...prevState, ...images]);
          setStatus('resolve');
          setTotalImages(res.data.totalHits);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [page, searchQuery]);

  const handleFormSubmt = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
    }
  };
  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);

    if (status === 'resolve') {
      scrollPage();
    }
  };

  const toggleModal = () => {
    setIsModalShow(prevState => !prevState);
  };

  const handleImageClick = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };
  const scrollPage = () => {
    const element = document.querySelector('#card');
    Scroll.animateScroll.scrollMore(element.offsetHeight * 2, {
      smooth: 'linear',
    });
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmt} />

      {status === 'resolve' && images.length > 0 && (
        <ImageGallery images={images} onClick={handleImageClick} />
      )}
      {status === 'rejected' && <h3>Could not find photo: {searchQuery}</h3>}
      {status === 'pending' && <Loader />}
      {status === 'resolve' && page < Math.ceil(totalImages / 12) && (
        <Button onClick={handleButtonClick} />
      )}

      {isModalShow && largeImageURL && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

export default App;
