function waiting(delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  
  export default waiting;
  