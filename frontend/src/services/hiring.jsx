import axios from "axios";
const apiUrl = "http://localhost:8080/hiring";

export function getRegistrationHistory() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/token`, {
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

