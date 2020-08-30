
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey ="UY3prjGLkWKXSHW0-TnH5hZvyGYqB1dp4rQhgBVDMP4";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// 
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were Loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    } 
}

// Helper Function to Set Attributes on DOM elements
function setAttribute(element, Attributes){
    for (const key in Attributes){
        element.setAttribute(key, Attributes[key]);
    }
}

// 

// Create Element For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    //Run function for each object in PhotosArray
    photosArray.forEach((photo) => {
            // create <a> to link to Unsplash
        const item = document.createElement("a");
           setAttribute(item, {
              href:photo.links.html,
              target: "_blank",
        });
        //create <img> for photo
        const img = document.createElement("img");
            setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        }); 
        // Event listener, Check when eeach is finished loading 
        img.addEventListener("load", imageLoaded);
        
        // Put <img> inside <a>, then put both inside imageCoontainer Elemet
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}
// Get photos from Unsplash API

async function getPhotos() { 
    try {
        const response = await fetch (apiUrl);
        photosArray = await response.json();
        displayPhotos ();
        if (isInitialLoad){
            updateAPIURLWithNewCount(30)
            isInitialLoad = false
        }
    }catch(error){
        //catch Error Here
    }
}

// check to see if scrolling near bottom of page, load More Photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scroll >= document.body.offsetHeight - 1000 && ready) {
        ready = true;
        getPhotos();
    }
    //console.log("scrolled");
});
// On load
getPhotos();