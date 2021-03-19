const productResults = document.querySelector(".container-products");
const url = "https://striveschool-api.herokuapp.com/api/movies/";
const header =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZmZiZDg5YzI2ZjAwMTU3ZjljMzciLCJpYXQiOjE2MTU5ODY2MjIsImV4cCI6MTYxNzE5NjIyMn0.AyRPiVtwG7x9WECC-vJot8Up1i-MvHXzrAODtXJHOZk";

renderProducts = (products) => {
  const productList = document.querySelector("#product-list");
  productList.innerHTML = "";
  products.forEach((movie) => {
    let listItem = document.createElement("div");
    listItem.classList.add("col");
    listItem.classList.add("mr-3");
    listItem.classList.add("mb-3");
    listItem.classList.add("product-card");
    listItem.classList.add("card");
    listItem.classList.add("trending");

    listItem.innerHTML = `<img src="${movie.imageUrl}" style="height:250px;"/>
                    <div class="card-body" style="height: 200px; overflow-y: auto">
                        
                      <div>
                        <div><h6 class ="movie-name">${movie.name}</h6></div>
                        <div><p>${movie.description}</p></div>
                        <div><h6 class ="movie-category">${movie.category}</h6></div>
                      </div>
                        
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                          <a class="btn btn-info btn-danger" href="details.html?id=${movie._id}&category=${movie.category}">VIEW DETAILS</a>
                        </div>

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary btnHide" onclick="hideToggle()"
                        >Hide
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-danger onclick=""
                        >
                        <span><i class="far fa-play-circle"></i></i></span>
                        </button>
                        </div>
                        

                    </div>
                    </div>`;
    productList.appendChild(listItem);
  });
};

// const productList = document.querySelector("#product-list");

let productLibrary = [];

const clearContainer = (productList) => {
  //use function for new data
  productResults.innerHTML = "";
  // productResults.querySelectorAll("*").forEach((node) => node.remove()); //same as above
};

// document.getElementById("categories")
//   .addEventListener("change", () => {
//     getProducts(document.querySelector("#category").value);
//   });

//   <button
//   class="dropdown-item"
//   type="button"
//   style="color: white"
//   onclick=""
// >
//   Horror
// </button>

const fetchCategories = async () => {
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: header,
      },
    });
    const categories = await result.json();
    console.log(categories);
    let data = await Promise.all(
      categories.map(async (category) => {
        const result = await fetch(url + category, {
          method: "GET",
          headers: {
            Authorization: header,
          },
        });
        return await result.json();
      })
    );
    console.log(data);
    // let listItem = document.createElement("div");
    // listItem.classList.add("col");
    // listItem.classList.add("mr-3");
    // listItem.classList.add("mb-3");
    // listItem.classList.add("product-card");
    // listItem.classList.add("card");
    // listItem.classList.add("trending");
    document.querySelector(".movie-rows").innerHTML = data
      .map(
        (arr, index) => `<h3 class="mt-2 text-white">${
          data[index][0].category
        }</h3>
  <div
    class="row no-gutters row-cols-lg-5"
    id="product-list"
  >${arr
    .map(
      (movie) => `<div class="col mr-3 product-card card trending">
  <img src="${movie.imageUrl}" style="height:250px;"/>
<div class="card-body" style="height: 200px; overflow-y: auto">
    
  <div>
    <div><h6 class ="movie-name">${movie.name}</h6></div>
    <div><p>${movie.description}</p></div>
    <div><h6 class ="movie-category">${movie.category}</h6></div>
  </div>
    
<div class="d-flex justify-content-between align-items-center">
    <div class="btn-group">
      <a class="btn btn-info btn-danger" href="details.html?id=${movie._id}&category=${movie.category}">VIEW DETAILS</a>
    </div>

    <button
        type="button"
        class="btn btn-sm btn-outline-secondary btnHide" onclick="hideToggle()"
    >Hide
    </button>
    <button
        type="button"
        class="btn btn-sm btn-outline-danger onclick=""
    >
    <span><i class="far fa-play-circle"></i></i></span>
    </button>
    </div>
    
    </small>

</div>
</div>`
    )
    .join("")}</div>
  `
      )
      .join("");

    document.querySelector(".category-dropdown").innerHTML = categories
      .map(
        (category) => `  <button
   class="dropdown-item"
   type="button"
   style="color: white"
   onclick="getProducts(this)"
 >
   ${category}
 </button>
   `
      )
      .join("");
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (event) => {
  const url =
    "https://striveschool-api.herokuapp.com/api/movies/" + event.innerText;
  try {
    productLibrary = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: header,
      },
    }).then((res) => res.json());
    console.log(productLibrary);

    renderProducts(productLibrary);
  } catch (error) {
    console.log(error);
  }
};

const input = document.querySelector(".form-control");

const handleProductSearch = () => {
  const filteredList = productLibrary.filter((item) =>
    item.name.toLowerCase().includes(input.value.toLowerCase())
  );
  clearContainer();
  renderProducts(filteredList);
};

// const searchButton = document.querySelector(".search-btn");
// searchButton.addEventListener("click", () => handleProductSearch());
// input.addEventListener("keyup", () => handleProductSearch());

const hideToggle = () => {
  let allCards = document.querySelectorAll(".product-card");
  let btnsHide = document.querySelectorAll(".btnHide");
  for (let i = 0; i < btnsHide.length; i++) {
    btnsHide[i].onclick = function () {
      allCards[i].style.display = "none";
    };
  }
};

window.onload = async () => {
  fetchCategories();
};
