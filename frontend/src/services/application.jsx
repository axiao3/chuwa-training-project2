import axios from "axios";
const apiUrl = "http://localhost:8080/application";

export function createApplication(data) {
  // console.log("token sending: ", localStorage.getItem("token"));
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getAllApplications() {
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function getApplicationById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("response.data in service: ", response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function updateApplicationById(id, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl}/${id}`, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
