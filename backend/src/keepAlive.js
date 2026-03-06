import axios from 'axios';

const URL = "https://coffee-shop-website-0dfy.onrender.com"; 

const keepAlive = () => {
  setInterval(async () => {
    try {
      await axios.get(URL);
      console.log("Self-pinging to stay awake...");
    } catch (e) {
      console.log("Ping failed, but server is likely awake.");
    }
  }, 14 * 60 * 1000);
};

export default keepAlive;