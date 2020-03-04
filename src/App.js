import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Spinner from './components/Spinner';
import Modal from './components/Modal';


const BASE_API_URL = 'https://api.500px.com/v1/photos';
// const GET_PHOTOS = `https://api.500px.com/v1/photos?feature=popular&${CONSUMER_KEY}`

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      current_page: 1,
      total_pages: null,
      total_items: null,
      feature: 'popular',
      filters: {},
      photos: [],
      isLoading: false,
    };
  };

  handleNextPage = async () => {
    const { current_page, total_pages } = this.state;
    if (current_page + 1 < total_pages) {
      this.loadData(this.picsURL(current_page + 1))
    }
  };

  handlePrevPage = async () => {
    const { current_page, total_pages } = this.state;
    if (current_page - 1 > 0) {
      this.loadData(this.picsURL(current_page - 1));
    }
  };

  picsURL = (page) => {
    const { feature } = this.state
    // rpp is bugged? 21 to get 20 results
    return `${BASE_API_URL}?feature=${feature}&consumer_key=${process.env.REACT_APP_CONSUMER_KEY}&page=${page}&rpp=21`;
  };

  fetchEndpoint = async (endPoint) => {
    return fetch(endPoint)
      .then(response => response.json())
      .then(data => data)
      .catch((e) => {
        console.log('Failed fetching -> ', e);
      });
  };

  loadData = (endPoint) => {
    try {
      this.setState({ isLoading: true }, async () => {
        const data = await this.fetchEndpoint(endPoint);
        console.log('data', data);

        this.setState({ ...data });
      })
    } catch (e) {
      console.log('Error loading data ', e);
    }
    finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 750)
    }
  };

  handleModal = (id) => {
    const selectedPic = this.state.photos.filter((_photo) => _photo.id === id)[0];
    let body = document.querySelector('body');
    body.style.overflow = 'hidden';
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({ selectedPic })
  }

  handleCloseModal = () => {
    this.setState({ selectedPic: null })
    let body = document.querySelector('body');
    body.style.overflow = 'unset';
  }

  componentDidMount = () => {
    this.loadData(this.picsURL(1));
  };

  render() {
    const { photos, current_page, total_pages, isLoading, selectedPic } = this.state;
    return (
      <div className="App">
        <h1 className="page-title">
          <Logo /> challenge!
        </h1>

        {isLoading ?
          <Spinner />
          :
          <>
            <div className="images-container">
              {photos && photos.map((photo, i) => (
                <div onClick={() => this.handleModal(photo.id)} className="img-wrapper" key={photo.id + i}>
                  <div className="rating">{photo.rating}⭐</div>
                  <img className="img-resp" src={photo.image_url} alt={photo.name} title={photo.name} />
                </div>
              ))}
            </div>

            <div>
              {current_page > 1 && <button onClick={this.handlePrevPage}>Back</button>}
              {current_page < total_pages && <button onClick={this.handleNextPage}>Next</button>}
            </div>
            {selectedPic && <Modal selectedPic={selectedPic} handleCloseModal={this.handleCloseModal} />}
          </>
        }
      </div>
    );
  }
}
