const productResults = document.querySelector(".container-products");
const url = "https://striveschool-api.herokuapp.com/api/movies/";
const header =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZmZiZDg5YzI2ZjAwMTU3ZjljMzciLCJpYXQiOjE2MTU5ODY2MjIsImV4cCI6MTYxNzE5NjIyMn0.AyRPiVtwG7x9WECC-vJot8Up1i-MvHXzrAODtXJHOZk";

// const id = null

let urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const category = urlParams.get("category");
window.onload = async () => {
  // let urlParams = new URLSearchParams(window.location.search);
  // const id = urlParams.get("id");
  // const category = urlParams.get('category')
  try {
    let response = await fetch(url + category, {
      method: "GET",
      headers: {
        Authorization: header,
      },
    });

    let movies = await response.json();
    let movie = movies.find((movie) => movie._id === id);
    let element = document.createElement("p");
    element.innerHTML = `${movie.name} : ${movie.description}`;

    document.querySelector("#details").appendChild(element);
  } catch (error) {
    //   alert("Something went wrong");
    console.log(error);
  }
};

const handleDelete = async () => {
  // let urlParams = new URLSearchParams(window.location.search);
  // const id = urlParams.get("id");
  // const category = urlParams.get('category')
  try {
    const response = await fetch(url + id, {
      method: "DELETE",
      headers: {
        Authorization: header,
      },
    });

    if (response.ok) {
      // checking the ok property which stores the successful result of the operation
      alert("Product deleted successfully");
      window.location.assign("index.html");
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleEdit = () => {
  window.location.href = `backoffice.html?id=${id}&category=${category}`;
};
