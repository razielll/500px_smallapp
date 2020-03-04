import React from 'react';
import './App.css';

const BASE_API_URL = 'https://api.500px.com/v1/photos';
const FEATURE = '?feature=popular';
const CONSUMER_KEY = '&consumer_key=P7LLhKkPAnPUpbfAXk3Jq2iDjYmCx87zgfEDxQVS';
// const GET_PHOTOS = `https://api.500px.com/v1/photos?feature=popular&${CONSUMER_KEY}`

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      current_page: null,
      total_pages: null,
      total_items: null,
      feature: '',
      filters: {},
      photos: [],
    };
  };

  componentDidMount = () => {
    // This isn't working on localhost without a cors disable chrome extension
    // Seems it's working without a consumer_key also
    // https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/related?hl=en
    fetch(BASE_API_URL + FEATURE + CONSUMER_KEY)
      .then(response => response.json())
      .then(data => {
        console.log('data', data)
        this.setState(data)
      });
  };

  render() {
    const { photos, current_page, total_pages } = this.state;
    return (
      <div className="App">
        500px challenge!
    </div>
    );
  }
}
