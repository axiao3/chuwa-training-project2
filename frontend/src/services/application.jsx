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
