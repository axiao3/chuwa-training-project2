import axios from "axios";
const apiUrl = "http://localhost:8080/hiring";

export function getVisasInProgress() {
    return new Promise((resolve, reject) => {
        axios
            .get(`${apiUrl}/Inprogress`, {
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

export function sendEmail(email, type) {
    console.log(email, type);
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/notification`, {
          type: type,
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