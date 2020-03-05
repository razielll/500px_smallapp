# 500px Challenge submission

App.js -> main login, controls modal display.

PhotoGrid -> functional component for displaying photos, and control buttons.

Modal -> toggle from App.js, modal screen overlay.

Spinner -> component to show loading status, utilizes react-loader-spinner library.

## To work with the app there is a need to enable CORS - done with extension; 
 https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/related?hl=en

### notes
To set up the consumer_key in a private manner, add .env to the root folder. add to .env
REACT_APP_CONSUMER_KEY=MY_KEY_STRING
usage in application files; 
process.env.REACT_APP_CONSUMER_KEY


### Bugs?
1. Api highest_rated and popular, seems to return the same results, when sending request with 'highest_rated' the feature that is returned is popular
2. consumer_key isn't necessary to access the api 
