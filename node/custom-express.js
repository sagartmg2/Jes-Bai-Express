const express = () => {
  return {
    get: () => {
      console.log("get request..");
    },
    listen: () => {
      console.log("server started");
    },
  };
};

module.exports = express;
