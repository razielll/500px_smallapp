import React from 'react';
import './App.css';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const BASE_API_URL = 'https://api.500px.com/v1/photos';
// const GET_PHOTOS = `https://api.500px.com/v1/photos?feature=popular&${CONSUMER_KEY}`

const Spinner = () => (
  <div className="loader-wrapper">
    <Loader
      type="Grid"
      color="#4673ce"
      height={120}
      width={120}
    />
  </div >
)
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
    const { current_page } = this.state;
    try {
      this.setState({ isLoading: true }, () => this.loadData(this.picsURL(current_page + 1)));
    } catch (e) {
      console.log('Error loading data ', e);
    }
    finally {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 750)
    }

  };

  picsURL = (page) => {
    const { feature } = this.state
    return `${BASE_API_URL}?feature=${feature}&consumer_key=${process.env.REACT_APP_CONSUMER_KEY}&page=${page}`;
  };

  loadData = async (endPoint) => {
    // This isn't working on localhost without a cors disable chrome extension
    // Seems it's working without a consumer_key also
    // https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/related?hl=en
    fetch(endPoint)
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        this.setState(data);
      }).catch((e) => {
        console.log('Failed fetching -> ', e);
      });
  }



  componentDidMount = () => {
    // console.log(process.env);
    this.loadData(this.picsURL(1));
  };

  render() {
    const { photos, current_page, total_pages, isLoading } = this.state;
    return (
      <div className="App">
        500px challenge!

        {isLoading ?
          <Spinner />
          :
          <>
            <div className="images-container">
              {photos && photos.map((photo, i) => (
                <img className="img-resp" key={photo.id + i} src={photo.image_url} alt={photo.name} title={photo.name} />
              ))}
            </div>

            <div>
              {current_page > 1 && <button>Back</button>}
              <button onClick={this.handleNextPage}>Next</button>
            </div>
          </>
        }

      </div>
    );
  }
}
