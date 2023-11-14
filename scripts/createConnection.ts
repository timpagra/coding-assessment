import { response } from "express";

fetch("http://localhost:3001/connection-created").then((response) => {
  console.log(response);
});
