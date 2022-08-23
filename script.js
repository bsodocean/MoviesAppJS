const API_KEY = 'api_key=87c385f8eabd32ca2d8188e09604a822';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;


const moviesContainer = document.getElementById('moviesContainer');
const searchBar = document.getElementById('search-bar');
const searchForm = document.getElementById('searchForm');

fetchMovies(API_URL);

function fetchMovies (url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
       console.log(data.results);
    })
}

function showMovies (data) {

    moviesContainer.innerHTML = '';

   data.forEach( movie => {
    const {title, poster_path, vote_average, overview} = movie;  
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-data-container');
    movieElement.innerHTML += ` 

        <img src="${IMG_URL + poster_path}" class="poster-img">

                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${scoreColors(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview-hover-container">
                    ${overview}</p>
                </div>`
                moviesContainer.appendChild(movieElement);
   }) 
   
}

function scoreColors (scoreColor) {
    if (scoreColor >= 8) {
        return 'green'
    } else if (scoreColor >= 5) {
        return 'orange'
    } if (scoreColor > 4) {
        return 'red'
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchInput = searchBar.value;

    if(searchInput) {
        fetchMovies(SEARCH_URL + '&query=' + searchInput);
    } else {
        fetchMovies(API_URL);
    }
})




