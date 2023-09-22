import axios from "axios";

const Axios = axios.create({
  baseURL: 'http://localhost:3000/api', // Set a base URL for this instance
  timeout: 5000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token"), // Set default headers
    'Content-Type': 'application/json',
  },
});

export default Axios