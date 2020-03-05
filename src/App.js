import React from 'react';
import Logo from './components/Logo';
import Spinner from './components/Spinner';
import Modal from './components/Modal';
import PhotoGrid from './components/PhotoGrid';
import './App.css';

const BASE_API_URL = 'https://api.500px.com/v1/photos';

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
    const { current_page } = this.state;
    if (current_page - 1 > 0) {
      this.loadData(this.picsURL(current_page - 1));
    }
  };

  // return `${BASE_API_URL}?feature=${feature}&consumer_key=${process.env.REACT_APP_CONSUMER_KEY}&page=${page}&rpp=20`;
  picsURL = (page) => `${BASE_API_URL}?feature=${this.state.feature}&page=${page}&rpp=20`;

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
    body.style.marginRight = '16px';
    this.setState({ selectedPic })
  };

  handleFeatureChange = (category_value) => {
    this.setState({ feature: category_value }, () => {
      this.loadData(this.picsURL(1));
    })
  }

  handleCloseModal = () => {
    this.setState({ selectedPic: null })
    let body = document.querySelector('body');
    body.style.overflow = 'unset';
    body.style.marginRight = '0px';
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

        <h4>Select a category or browse our popular pictures</h4>
        <select className="select-menu" onChange={e => this.handleFeatureChange(e.target.value)}>
          <option value="popular">Popular</option>
          <option value="highest_rated">Top Rated</option>
          <option value="editors">Editors Choice</option>
          <option value="fresh_today">Today's</option>
          <option value="fresh_yesterday">Yesterday's</option>
          <option value="fresh_week">This weeks</option>
        </select>

        {isLoading ? <Spinner /> :
          <>
            {photos && photos.length >= 1 && (
              <PhotoGrid
                photos={photos}
                current_page={current_page}
                total_pages={total_pages}
                handleNextPage={this.handleNextPage}
                handlePrevPage={this.handlePrevPage}
                handleModal={this.handleModal}
              />
            )}
            {selectedPic && <Modal selectedPic={selectedPic} handleCloseModal={this.handleCloseModal} />}
            <footer style={{ padding: '20px 0' }}>Made by <a target="_blank" href="https://github.com/razielll">Anton</a> with ❤️</footer>
          </>
        }

      </div>
    );
  }
}
