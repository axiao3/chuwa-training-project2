import axios from "axios";
const apiUrl = "http://localhost:8080";

export function getEmployeesList() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/api/employees`, {
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //   },
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

export function getOneEmployee(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}/api/employees/${id}`, {
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //   },
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

export function updateEmployee(id, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apiUrl}/employees/${id}`, data, {
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //   },
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
