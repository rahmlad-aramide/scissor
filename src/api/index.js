/* eslint-disable no-unused-vars */
import axios from 'axios';
// export const BASE_URL = 'http://localhost:8080/http://cutly.onrender.com';
export const BASE_URL = 'http://cutly.onrender.com';

const signUpData = {
  name: 'Abdrahman Oladimeji',
  email: 'abdrahmanoladimeji02@gmail.com',
  hashed_password: 'password',
  address: 'Oyo, Oyo State',
  phone_number: '09023600083',
};

const signUpResponseBody = {
  data: {
    is_active: true,
    name: 'Abdrahman Oladimeji',
    phone_number: '09023600083',
    profile_photo: null,
    time_created: '2023-06-29T07:36:52',
    id: 2,
    email: 'abdrahmanoladimeji02@gmail.com',
    hashed_password:
      '$2b$12$7xxGLqBnqtqjYDtpK54.teQ8f0KD9SWCNDVS3.KEuVS1db33VoXMe',
    address: 'Oyo, Oyo State',
  },
  status: 201,
};

export const signUp = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/api/v1/users/register`, data)
      // .post(`/api/v1/users/register`, data)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        reject(new Error(err));
        console.log(err);
      });
  });
};

// Login
const loginData = {
  username: 'string',
  password: 'string',
};
const loginResponseBody = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MTkxMjgzMTZ9.7qMcaZu0g7wUno8miJhsivX6K98R6jIs0Y5qTtJINdk',
  token_type: 'bearer',
};

// export const sendRequest = async (username, password) => {
export const signIn = async () => {
  const url = 'https://cutly.onrender.com/api/v1/users/login';
  const headers = {
    // eslint-disable-next-line prettier/prettier
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = new URLSearchParams();
  data.append('grant_type', '');
  data.append('username', 'abdrahmanoladimeji02@gmail.com');
  data.append('password', 'password');
  data.append('scope', '');
  data.append('client_id', '');
  data.append('client_secret', '');

  try {
    const response = await axios.post(url, data, { headers });
    console.log(response.data);
    return response.data;
    // Process the response data as needed
  } catch (error) {
    console.error(error);
    return error;
    // Handle any errors that occurred during the request
  }
};

// export const signIn = async (data) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(`${BASE_URL}/api/v1/users/login`, data)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         reject(new Error(err));
//       });
//   });
// };

export const login = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/api/v1/users/login`, data)
      // .post(`/api/v1/users/login`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

// Get user
const getUserData = {
  email: 'string',
};
const loggedUserResponseBody = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MTkwNzM1NzZ9.qrOrE6EDg_yPOX0yVmycWXMdsOOzfu7_ydpt08VQB9s',
  token_type: 'bearer',
};

export const loggedUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/api/v1/users/register`, data)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        reject(new Error(err));
        console.log(err);
      });
  });
};
