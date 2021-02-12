/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const fetch = require("node-fetch");

const reservationInformation = {
  name: "Jane Doe",
  numberOfPeople: 2,
};

async function makeReservation() {
  // YOUR CODE GOES IN HERE
  try {
    const response = await fetch(
      "https://reservation100-sandbox.mxapps.io/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationInformation),
      }
    );
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.log("Ooops something went wrong!", err.message);
  }
}

makeReservation();
