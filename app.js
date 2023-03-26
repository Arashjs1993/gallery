const auth = 'Mk3eEDLfdLQmhiGlUCboHLx5HBdxvlRtZGfsPZkuHhprPZGNpnBG9IFr';
const gallery = document.querySelector('.gallery');
let serachInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//Event listeners
serachInput.addEventListener('input', updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhoto(searchValue);
})
more.addEventListener('click', loadMore)

//Functions
function updateInput(e){
    searchValue = e.target.value;
}
async function fetchApi(url){
    const data = await fetch(url, {
        headers: {
            Authorization: auth,
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    return await data.json();    
} 
function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        gallery.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}


async function curatedData() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
    generatePictures(data);
}


async function searchPhoto(query){
    fetchLink = `https://api.pexels.com/v1/search?query=${query}?&per_page=15&page=1`;
    clearPhotos();
    const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}?&per_page=15&page=1`);
    generatePictures(data);
}

function clearPhotos(){
    gallery.innerHTML = "";
    serachInput.value = "";
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}?&per_page=15&page${page}`
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedData();


