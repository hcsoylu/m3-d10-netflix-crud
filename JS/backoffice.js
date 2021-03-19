const url = "https://striveschool-api.herokuapp.com/api/movies/";
const header =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZmZiZDg5YzI2ZjAwMTU3ZjljMzciLCJpYXQiOjE2MTU5ODY2MjIsImV4cCI6MTYxNzE5NjIyMn0.AyRPiVtwG7x9WECC-vJot8Up1i-MvHXzrAODtXJHOZk";

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
  category = urlParams.get("category");
  if (id) {
    let response = await fetch(url + category, {
      method: "GET",
      headers: {
        Authorization: header,
        "Content-Type": "application/json",
      },
    });
    // contacting the endpoint for a single event
    let movie = await response.json(); // transforming the response body in an usable object, asyncronous operation!
    console.log("this is ", movie);

    document.getElementById("name").value = movie[0].name;
    document.getElementById("description").value = movie[0].description;
    document.getElementById("categories").value = movie[0].category;
    document.getElementById("imageUrl").value = movie[0].imageUrl;
  }
};
const handleSubmit = (e) => {
  e.preventDefault(); // preventing the default browser event handling
  submitMovie(); //
};

const submitMovie = async () => {
  let spinner = document.querySelector("#loadingSpinner");
  spinner.classList.toggle("d-none"); // showing the spinner
  let newMovie = {
    // gathering the data from the form, field by field
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    category: document.querySelector("#categories").value,
    imageUrl: document.querySelector("#imageUrl").value,
  };

  try {
    let response;

    if (id) {
      let urlParams = new URLSearchParams(window.location.search);
      category = urlParams.get("category");
      console.log("hello");

      response = await fetch(url + id, {
        method: "PUT",
        body: JSON.stringify(newMovie), // we need to stringify the JS object in order to send it
        headers: new Headers({
          // we need also to declare the content type
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZmZiZDg5YzI2ZjAwMTU3ZjljMzciLCJpYXQiOjE2MTU5ODY2MjIsImV4cCI6MTYxNzE5NjIyMn0.AyRPiVtwG7x9WECC-vJot8Up1i-MvHXzrAODtXJHOZk",
          "Content-Type": "application/json",
        }),
      });

      movie = await response.json();

      only = movie[0];
      console.log(only);
    } else {
      response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newMovie), // we need to stringify the JS object in order to send it
        headers: new Headers({
          // we need also to declare the content type
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZmZiZDg5YzI2ZjAwMTU3ZjljMzciLCJpYXQiOjE2MTU5ODY2MjIsImV4cCI6MTYxNzE5NjIyMn0.AyRPiVtwG7x9WECC-vJot8Up1i-MvHXzrAODtXJHOZk",
          "Content-Type": "application/json",
        }),
      });
    }

    if (response.ok) {
      // checking the ok property which stores the successful result of the operation
      spinner.classList.toggle("d-none"); // hiding the spinner
      alert(`Movie ${id ? "updated" : "created"} successfully`);
      location.assign("index.html");
    } else {
      spinner.classList.toggle("d-none"); // hiding the spinner
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};
