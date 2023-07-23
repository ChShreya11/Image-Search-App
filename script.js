const accessKey = "SDdta_UxoMWtDITHJ7XofqDtmTjerTY4bgBTlhM9Oqs";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

searchResults.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName === "IMG") {
        const imageLink = clickedElement.nextElementSibling;
        const unsplashURL = imageLink.getAttribute("href");
        if (unsplashURL) {
          window.open(unsplashURL, "_blank");
        }
    }
});    

showMore.addEventListener("click", () => {
    searchImages();
});

const images = document.querySelectorAll(".search-result img");

images.forEach((image) => {
  image.addEventListener("click", () => {
    const imageLink = image.nextElementSibling;
    const unsplashURL = imageLink.getAttribute("href");
    if (unsplashURL) {
      window.open(unsplashURL, "_blank");
    }
  });
});
    


