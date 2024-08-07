import dotenv from 'dotenv';
import Duolingo from "duolingo-api-js";

dotenv.config();

const duo = new Duolingo({userName: process.env.DUOLINGO_USERNAME, password: process.env.DUOLINGO_PASSWORD});

duo.logIn()
  .then((result) => {
    console.log('Login successful:', result);
    return duo.getData();
  })
  .then(data => {
    // Use returned data or use userData on duo instance
    console.log(duo.userData);
  })
  .catch(e => {
    // Handle error
    console.error('Error:', e);
  });