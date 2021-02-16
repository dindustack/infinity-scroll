const loader = document.getElementById("loader");
const imageContainer = document.getElementById("image-container");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "L01Te6-el6eQLwaZ0u9gHe8a1fV5ocucwEw7oZ0tTJM";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is completely loaded
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling is near bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && ready
  ) {
    ready = false;
    getPhotos();
    console.log("load more");
  }
});

getPhotos();
