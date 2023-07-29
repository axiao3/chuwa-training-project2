import axios from "axios";
const apiUrl = "http://localhost:8080/auth";

export function generateToken(email) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/generateToken`, {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function isTokenValid(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/token`, {
        params: {
          token: token,
        },
      })
      .then((response) => {
        resolve({
          status: true,
          token: response.data.token,
        });
      })
      .catch((err) => {
        reject({
          status: false,
          message: err.response.data.message,
        });
      });
  });
}

export function signUp(token, email, password, username) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/signup`, {
        token: token,
        email: email,
        password: password,
        username: username,
      })
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log("fetched error in service: ", err.response);
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function signIn(username, password) {
  // console.log("Sign in services SignIn");
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiUrl}/signin`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("response.data: ", response.data);
        resolve({
          id: response.data.id,
          email: response.data.email,
          username: response.data.username,
          token: response.data.token,
          type: response.data.type,
          emailReceivedLink: response.data.emailReceivedLink,
          applicationStatus: response.data.applicationStatus,
        });
      })
      .catch((err) => {
        reject({ status: false, message: err.response.data.error.message });
      });
  });
}

export function logOut(key, value) {
  if (key) {
    //if there is such a user signed in, log it out
    localStorage.clear();
  }
  console.log("log out: " + key + value);
}
