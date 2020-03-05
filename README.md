



To set up the consumer_key in a private manner, add .env to the root folder, and in that
REACT_APP_CONSUMER_KEY=MY_KEY_STRING
use it with 
process.env.REACT_APP_CONSUMER_KEY


## Bugs?
1. Api highest_rated and popular, seems to return the same, when sending request with 'highest_rated' the feature that is returned is popular
2. consumer_key isn't necessary to access the api, however need to enable CORS - done with extension; 
 https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino/related?hl=en