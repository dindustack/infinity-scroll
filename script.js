const loader = document.getElementById("loader");
const imageContainer = document.getElementById("image-container");

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "L01Te6-el6eQLwaZ0u9gHe8a1fV5ocucwEw7oZ0tTJM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
      element.setAttribute(key, attributes[key])
  }
}

// Create elements for links and photos and add to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    // Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
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
    console.log(photosArray)
    displayPhotos();
  } catch (error) {}
}

getPhotos();
